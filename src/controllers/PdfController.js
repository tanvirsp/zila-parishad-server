const mongoose = require('mongoose');
const ObjectID= mongoose.Types.ObjectId;

const puppeteer = require('puppeteer');
const path= require('path');
const GeneratePDF = require('../helper/GeneratePDF');

const ejs = require('ejs');
const fs = require('fs');
const ResultModel = require('../models/ResultModel');



exports.viewCertificate = async(req, res) =>{
    try {
        res.render('certificate', {name: "Mir raisul tanvir"} );
        const pdfURL = await GeneratePDF();

        res.sendFile(pdfURL);
        
    } catch (error) {
        res.status(200).json({data: error.toString()})
    }
}


exports.createPDF = async(req, res) =>{
    try {
    
        
        
        const regNumber =req.params.regNumber;
        
        const MatchingStage = {$match: {regNumber: regNumber } };
        const JoiningStudentStage = { $lookup: {from: "students", localField: "studentId", foreignField: "_id", as: "studentDetails"} };
        const UnwindStudentStage = {$unwind: "$studentDetails" };

        const JoiningCourseStage = { $lookup: {from: "courses", localField: "courseId", foreignField: "_id", as: "courseDetails"} };
        const UnwindCourseStage = {$unwind: "$courseDetails" };





        const data = await ResultModel.aggregate([
            MatchingStage,
            JoiningStudentStage, UnwindStudentStage,
            JoiningCourseStage, UnwindCourseStage

        ])

        


        const filePathName = path.resolve(__dirname, '../views/certificate.ejs');
        const htmlString = fs.readFileSync(filePathName).toString();
        const template = ejs.render(htmlString, data[0]);
     
        
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
       
       
        // await page.goto(`${req.protocol}://${req.get('host')}/api/v1/certificate`, {
        //     waitUntil:"networkidle2",
        // });


        await page.setContent(template)


        await page.setViewport({width: 1024, height: 700});
        
        const todayDate = new Date();
        const pdfn = await page.pdf({
            path: `${path.join(__dirname, '../../pdf', "certificate.pdf")}`,
            format: "A4",
            landscape: true,
            printBackground: true,
            pageRanges: "1",
        });

        await browser.close();
        const pdfURL = path.join(__dirname, '../../pdf', "certificate.pdf");
        
        res.set({
            "Content-Type" : "application/pdf",
            "Content-Length" : pdfn.length
        });

        res.download(pdfURL);
        
        
    } catch (error) {
        console.log(error);
    }
}



//     try {
//         const data = {
//             user: "Mir Raisul Tanvir"
//         };

//         const filePathName = path.resolve(__dirname, '../views/certificate.ejs');
//         const htmlString = fs.readFileSync(filePathName).toString();
//         const template = ejs.render(htmlString, data);

//         const browser = await puppeteer.launch();
//         const page = await browser.newPage();

//         await page.setContent(template);
//         await page.setViewport({ width: 1680, height: 1050 });

//         const pdfPath = path.join(__dirname, '../../pdf', "certificate.pdf");
        
//         // Ensure the directory exists
//         fs.mkdirSync(path.dirname(pdfPath), { recursive: true });

//         await page.pdf({
//             path: pdfPath,
//             format: "A4",
//             printBackground: true,
//         });

//         await browser.close();

//         const pdfBuffer = fs.readFileSync(pdfPath);
        
//         res.set({
//             "Content-Type": "application/pdf",
//             "Content-Length": pdfBuffer.length
//         });

//         res.sendFile(pdfPath);
        
//     } catch (error) {
//         console.error('Error generating PDF:', error);
//         res.status(500).send('Error generating PDF');
//     }
// };
const puppeteer = require('puppeteer');
const path= require('path');



module.exports = async() =>{
    try {
       
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
       
        await page.goto(`${req.protocol}://${req.get('host')}/api/v1/certificate`, {
            waitUntil:"networkidle2",
        });


        await page.setViewport({width: 1680, height: 1050});
        
        const todayDate = new Date();
        const pdfn = await page.pdf({
            path: `${path.join(__dirname, '../../pdf', "certificate.pdf")}`,
            format: "Legal",
            printBackground: true,
        });

        await browser.close();
        const pdfURL = path.join(__dirname, '../../pdf', "certificate.pdf");
        
        res.set({
            "Content-Type" : "application/pdf",
            "Content-Length" : pdfn.length
        });

        return pdfURL;
        // res.sendFile(pdfURL);
        
        
    } catch (error) {
        
    }

}
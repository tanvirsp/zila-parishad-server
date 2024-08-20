const mongoose = require('mongoose');
const ObjectID= mongoose.Types.ObjectId;
const ReceivedScholarshipModel = require("../models/ReceivedScholarshipModel");

exports.AddScholarshipService = async(req) =>{

    try {
        const reqBody = req.body;
        const data = await ReceivedScholarshipModel.create(reqBody);

        return {status:"success", data:data};

    } catch (error) {

        return {status:"fail",data:error.toString()}

    }


};




exports.ScholarshipListService = async(req) =>{

    try {

        const pageNo = Number(req.query.pageNo);
        const perPage = Number(req.query.perPage);
        const skipRow = (pageNo - 1) * perPage;


        const reqBody = req.body;
        const matchCondition = {};

       
        if(reqBody["sessionId"]){
            matchCondition.sessionId = new ObjectID(reqBody["sessionId"]);
        }

        const MatchingStage = {$match: matchCondition };
        
        const JoiningStudentStage = { $lookup: {from: "scholarships", localField: "studentId", foreignField: "_id", as: "studentDetails"} };
        const UnwindStudentStage = {$unwind: "$studentDetails" };

        
        

      
        const result = await ReceivedScholarshipModel.aggregate([
            {
                $facet: {
                   "data":  [
                                MatchingStage,
                                JoiningStudentStage, UnwindStudentStage,
                                {$skip: skipRow},
                                {$limit: perPage}
                             ],
                   "total": [MatchingStage, {$count:"total"}],

                }
            }
        ]);

        const total = result[0].total[0] ? result[0].total[0].total : 0;
        const data = result[0].data;
    
       
        return {status:"success", data: data, total: total }




        // return {status:"success", data:data};
    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
};





exports.FindScholarshipDetailsService = async(req) =>{

    try {
        const regNumber = req.params.regNumber;

        const MatchingStage = {
            $match: {regNumber: regNumber} 
        };

        const JoiningStudentStage = { $lookup: {from: "scholarships", localField: "studentId", foreignField: "_id", as: "studentDetails"} };
        const UnwindStudentStage = {$unwind: "$studentDetails" };

        const JoiningSessionStage = { $lookup: {from: "scholarship-sessions", localField: "sessionId", foreignField: "_id", as: "sessionsDetails"} };
        const UnwindSessionStage = {$unwind: "$sessionsDetails" };

        const ProjectionStage={$project:{'createdAt': 0,'updatedAt':0,'sessionId':0,'courseId':0, 
            'studentDetails.regNumber': 0, 'studentDetails.sessionId': 0, 'studentDetails.courseId': 0, 'studentDetails.createdAt': 0,
            'studentDetails.updatedAt': 0,
            'sessionsDetails.createdAt': 0, 'sessionsDetails.updatedAt': 0, 'sessionsDetails.des': 0, 'sessionsDetails.status': 0, 'sessionsDetails._id': 0,
            
           }}



        const data = await ReceivedScholarshipModel.aggregate([
            MatchingStage,
            JoiningStudentStage, UnwindStudentStage,  
            JoiningSessionStage, UnwindSessionStage,
            ProjectionStage
        ]);


        return {status:"success", data:data};
    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}


exports.UpdateScholarshipDataService = async(req) =>{
    try {
        const regNumber = req.params.regNumber;
        const reqBody = req.body;
        const data = await ReceivedScholarshipModel.updateOne({regNumber: regNumber },{$set:reqBody })
        return {status:"success", data: data};

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
};



exports.CheckByBirthCertificateService = async(req) =>{
    try {  
        const birthNumber = req.params.birthNumber
        console.log(birthNumber);

        const isExists = await ReceivedScholarshipModel.find({birthCertificateNumber: birthNumber }).count();
        if(isExists === 0){
            return {status:"success"};
        }
    
        return {status:"fail", message:"This Birth Certificate Number Already Used"};

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }

}


const mongoose = require('mongoose');
const ObjectID= mongoose.Types.ObjectId;
const ResultModel = require("../models/ResultModel");

exports.AddResultService = async(req) =>{

    try {
        const reqBody = req.body;
        const data = await ResultModel.create(reqBody);

        return {status:"success", data:data};

    } catch (error) {

        return {status:"fail",data:error.toString()}

    }


}


exports.FindResultService = async(req) =>{

    try {
        const regNumber = req.params.regNumber;

        const MatchingStage = {
            $match: {regNumber: regNumber} 
        };

        const JoiningStudentStage = { $lookup: {from: "students", localField: "studentId", foreignField: "_id", as: "studentDetails"} };
        const UnwindStudentStage = {$unwind: "$studentDetails" };

        const JoiningCourseStage = { $lookup: {from: "courses", localField: "courseId", foreignField: "_id", as: "courseDetails"} };
        const UnwindCourseStage = {$unwind: "$courseDetails" };

        const JoiningSessionStage = { $lookup: {from: "sessions", localField: "sessionId", foreignField: "_id", as: "sessionsDetails"} };
        const UnwindSessionStage = {$unwind: "$sessionsDetails" };

        const ProjectionStage={$project:{'createdAt': 0,'updatedAt':0,'sessionId':0,'courseId':0, 
            'studentDetails.regNumber': 0, 'studentDetails.sessionId': 0, 'studentDetails.courseId': 0, 'studentDetails.createdAt': 0,
            'studentDetails.updatedAt': 0,
            'sessionsDetails.createdAt': 0, 'sessionsDetails.updatedAt': 0, 'sessionsDetails.des': 0, 'sessionsDetails.status': 0, 'sessionsDetails._id': 0,
            'courseDetails._id' : 0, 'courseDetails.createdAt' : 0, 'courseDetails.updatedAt' : 0,
           }}



        const data = await ResultModel.aggregate([
            MatchingStage,
            JoiningStudentStage, UnwindStudentStage,
            JoiningCourseStage, UnwindCourseStage,
            JoiningSessionStage, UnwindSessionStage,
            ProjectionStage
        ]);


        return {status:"success", data:data};
    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}


exports.ResultListService = async(req) =>{

    try {

        const pageNo = Number(req.query.pageNo);
        const perPage = Number(req.query.perPage);
        const skipRow = (pageNo - 1) * perPage;

     


        const reqBody = req.body;
        const matchCondition = {};

        if(reqBody["courseId"]){
            matchCondition.courseId = new ObjectID(reqBody["courseId"]);
        }

        if(reqBody["sessionId"]){
            matchCondition.sessionId = new ObjectID(reqBody["sessionId"]);
        }

        const MatchingStage = {$match: matchCondition };


        
        const JoiningStudentStage = { $lookup: {from: "students", localField: "studentId", foreignField: "_id", as: "studentDetails"} };
        const UnwindStudentStage = {$unwind: "$studentDetails" };

        const JoiningCourseStage = { $lookup: {from: "courses", localField: "courseId", foreignField: "_id", as: "courseDetails"} };
        const UnwindCourseStage = {$unwind: "$courseDetails" };

      
        const result = await ResultModel.aggregate([
            {
                $facet: {
                   "data":  [
                                MatchingStage,
                                JoiningStudentStage, UnwindStudentStage,
                                JoiningCourseStage, UnwindCourseStage,
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
}


exports.UpdateResultService = async(req) =>{
    try {
        const regNumber = req.params.regNumber;
        const reqBody = req.body;
        const data = await ResultModel.updateOne({regNumber: regNumber },{$set:reqBody })
        return {status:"success", data: data};

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}



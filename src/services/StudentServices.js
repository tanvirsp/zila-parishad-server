const mongoose = require("mongoose");
const ObjectId= mongoose.Types.ObjectId;
const StudentModel = require("../models/StudentModel");
const SessionModel = require("../models/SessionModel");
const ResultModel = require("../models/ResultModel");

exports.AddStudentDataService = async(req) =>{

    try {
        
        const session = await SessionModel.findOne({status: "1"});
        const sessionId = session._id;
        const digit = session.sessionDigit;

        const totaldata = await StudentModel.find({}).count();
        const regNumber = Number(digit + "001") + totaldata       

        const reqBody = req.body;
        reqBody.sessionId = sessionId;

        const allData = {...reqBody, regNumber }
        const data = await StudentModel.create(allData);

        return {status:"success", data:data};

    } catch (error) {

        return {status:"fail",data:error.toString()}

    }

}

exports.ViewStudentDataService =async(req) => {
    try {
        const id = new ObjectId(req.params.id);
        const MatchingStage = { $match: {_id: id}}
        const JoiningSessionStage = { $lookup: {from: "sessions", localField: "sessionId", foreignField: "_id", as: "sessionDetails"} };
        const UnwindSessionStage = {$unwind: "$sessionDetails" };
        const JoiningCourseStage = { $lookup: {from: "courses", localField: "courseId", foreignField: "_id", as: "courseDetails"} };
        const UnwindCourseStage = {$unwind: "$courseDetails" };

        const ProjectionStage = {$project: {createdAt: 0, updatedAt: 0 , 
            "sessionDetails.createdAt" :0, "sessionDetails.updatedAt" :0, "courseDetails.createdAt" :0, "courseDetails.updatedAt" :0  }}


        const data= await StudentModel.aggregate([
            MatchingStage,
            JoiningSessionStage, UnwindSessionStage,
            JoiningCourseStage, UnwindCourseStage,
            ProjectionStage
        ])



        return {status:"success", data:data[0]};
    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}


exports.UpdateStatusService =async(req) =>{
    try {
        
        const id = new ObjectId(req.params.id);
        const statusNumber = req.params.statusNumber;
        

        const data= await StudentModel.updateOne({_id: id}, {$set: {status: statusNumber}});

        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}


exports.TotalStudentGroupBySessionService = async(req) =>{
    try {

        const JoiningSessionStage = {
            $lookup: {from: "sessions", localField: "sessionId", foreignField: "_id", as: "sessionDetails"}
        }

        const GroupStage = {
            $group: {
                _id: "$sessionId",
                // students: { $push: "$$ROOT" },
                sessionDetails: { $first: "$sessionDetails" },
                totalStudents: { $sum: 1 }
            }
        }

        const ProjectionStage = {$project: { _id: 0, sessionId: "$_id","sessionDetails": 1,totalStudents: 1 }}

        const data = await StudentModel.aggregate([
            JoiningSessionStage,
            {$unwind: "$sessionDetails" },
            GroupStage,
            ProjectionStage
        ]);

        return {status:"success", data:data};


    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}




exports.ListByFilterService = async(req) =>{
    try {
       
        let pageNo = Number(req.query.pageNo);
        let perPage = Number(req.query.perPage);
        const skipRow = (pageNo - 1) * perPage;

        
  
        const currentSession = await SessionModel.findOne({status: 1});
        const matchCondition = {
            sessionId: new ObjectId(currentSession["_id"])
        };

        const reqBody = req.body;

        if(reqBody["courseId"]){
            matchCondition.courseId = new ObjectId(reqBody["courseId"]);
        }

        if(reqBody["status"]){
            matchCondition.status = reqBody["status"];
        }

      
    


        const MatchStage = {$match: matchCondition};

        const JoinWithSessionStage ={$lookup: {from: "sessions", localField:"sessionId", foreignField: "_id", as: "session" }  };
        const UnwindSessionStage={ $unwind: "$session"};
        const JoinWithCourseStage ={$lookup: {from: "courses", localField:"courseId", foreignField: "_id", as: "course" }  };
        const UnwindCourseStage = {$unwind: "$course"};
        const ProjectionStage={$project:{'createdAt': 0,'updatedAt':0,'sessionId':0,'courseId':0, 
             'session.createdAt': 0, 'session.updatedAt': 0, 'session.des': 0, 'session.status': 0, 'session.lastDate': 0,
             'course.value' : 0, 'course.createdAt' : 0, 'course.updatedAt' : 0,
            }}


       
        const result = await StudentModel.aggregate([
            {
                $facet: {
                   "data":  [
                                MatchStage, JoinWithSessionStage, 
                                UnwindSessionStage, JoinWithCourseStage, 
                                UnwindCourseStage, ProjectionStage,
                                {$skip: skipRow},
                                {$limit: perPage}
                             ],
                   "total": [MatchStage, {$count:"total"}],

                }
            }
        ]);

        const total = result[0].total[0] ? result[0].total[0].total : 0;
        const data = result[0].data;
    
       
        return {status:"success", data: data, total: total }
   
    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}




exports.StudentSearchService =async(req) => {
    try {

        const search = req.params.search;
        const MatchingStage = {
            $match: {$or: [{regNumber:search}, {mobile: search } ]}
        }
  
        const JoinWithSessionStage ={$lookup: {from: "sessions", localField:"sessionId", foreignField: "_id", as: "session" }  };
        const UnwindSessionStage={ $unwind: "$session"};
        const JoinWithCourseStage ={$lookup: {from: "courses", localField:"courseId", foreignField: "_id", as: "course" }  };
        const UnwindCourseStage = {$unwind: "$course"};
        const ProjectionStage={$project:{'createdAt': 0,'updatedAt':0,'sessionId':0,'courseId':0, 
             'session.createdAt': 0, 'session.updatedAt': 0, 'session.des': 0, 'session.status': 0, 'session.lastDate': 0,
             'course.value' : 0, 'course.createdAt' : 0, 'course.updatedAt' : 0,
            }}

        const data= await StudentModel.aggregate([
            MatchingStage,
            JoinWithSessionStage, UnwindSessionStage,
            JoinWithCourseStage, UnwindCourseStage,
            ProjectionStage,
            
        ])

        return {status:"success", data:data};



    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}




exports.SelectedStudentsService = async(req) =>{
    try {
        
        const MatchingStage = {$match: {status: "1"}}
        const data = await StudentModel.aggregate([
            MatchingStage
        ])


        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }

}


exports.CheckBirthCertificateService = async(req) =>{
    try {  
        const birthNumber = req.params.birthNumber
        console.log(birthNumber);

        const isExists = await ResultModel.find({birthCertificateNumber: birthNumber }).count();
        if(isExists === 0){
            return {status:"success"};
        }
    
        return {status:"fail", message:"This Birth Certificate Number Already Used"};

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }

}
const mongoose = require("mongoose");
const ObjectId= mongoose.Types.ObjectId;
const StudentModel = require("../models/StudentModel");

exports.AddStudentDataService = async(req) =>{

    try {
        
        const totaldata = await StudentModel.find({}).count();
        const regNumber = 240001 + totaldata;

        // const options = await OptionModel.findOne({})
        const reqBody = req.body;
        reqBody.sessionId = "66a907ebd0207235dcd141de";

        const allData = {...reqBody, regNumber }
        const data = await StudentModel.create(allData);

        return {status:"success", data:data};

    } catch (error) {

        return {status:"fail",data:error.toString()}

    }

}

exports.ViewStudentDataService =async(req) => {
    try {
        const id = req.params.id;
        const data= await StudentModel.findOne({_id: id})
        return {status:"success", data:data};
    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}


exports.UpdateStatusService =async(req) =>{
    try {
        
        const id = new ObjectId(req.params.id);
        const statusNumber = req.params.statusNumber;
        
        console.log(id, statusNumber );

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
       
        const reqBody = req.body;
        let matchCondition = {};
        let selectedCondition= {status: "1"};

    
        
        if(reqBody.courseId === "0"){
                matchCondition.sessionId = new ObjectId (reqBody.sessionId);

                selectedCondition.sessionId = new ObjectId (reqBody.sessionId);

        }else {
            matchCondition.sessionId = new ObjectId (reqBody.sessionId);
            matchCondition.courseId = new ObjectId (reqBody.courseId);
          
            selectedCondition.sessionId = new ObjectId (reqBody.sessionId);
            selectedCondition.courseId = new ObjectId (reqBody.courseId);
            
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
                                UnwindCourseStage, ProjectionStage ],
                   "total": [MatchStage, {$count:"total"}],
                   "selected": [{$match: selectedCondition },  {$count:"total"} ]
                }
            }
        ]);

        const total = result[0].total[0] ? result[0].total[0].total : 0;
        const data = result[0].data;
        const selected = result[0].selected[0]? result[0].selected[0].total : 0;




       
        return {status:"success", data: data, total: total, selected: selected }
        //    return {status:"success", data: data, total: total, selected: selected}

      
        
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
  

        const data= await StudentModel.aggregate([
            MatchingStage

        ])

        return {status:"success", data:data};



    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}

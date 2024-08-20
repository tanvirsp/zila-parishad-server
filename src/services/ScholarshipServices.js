const mongoose = require("mongoose");
const ObjectId= mongoose.Types.ObjectId;
const ScholarshipModel = require("../models/ScholarshipModel");
const ScholarshipSessionModel = require("../models/ScholarshipSessionModel");

exports.AddScholarshipDataService = async(req) =>{

    try {
        
        const session = await ScholarshipSessionModel.findOne({status: "1"});
        const sessionId = session._id;
        const digit = session.sessionDigit;

        const totaldata = await ScholarshipModel.find({}).count();
        const regNumber = Number(digit + "001") + totaldata       

        const reqBody = req.body;
        reqBody.sessionId = sessionId;

        const allData = {...reqBody, regNumber }
        const data = await ScholarshipModel.create(allData);

        return {status:"success", data:data};

    } catch (error) {

        return {status:"fail",data:error.toString()}

    }

};





exports.ApplicantListService = async(req) =>{
    try {
       
        const pageNo = Number(req.query.pageNo);
        const perPage = Number(req.query.perPage);
        const skipRow = (pageNo - 1) * perPage;

        const matchCondition = {}
        
  
      
        const reqBody = req.body;

       

        if(reqBody["status"]){
            matchCondition.status = reqBody["status"];
        }

      
        const MatchStage = {$match: matchCondition};
        const result = await ScholarshipModel.aggregate([
            {
                $facet: {
                   "data":  [
                                MatchStage, 
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


exports.UpdateStatusService =async(req) =>{
    try {
        
        
        const id = new ObjectId(req.params.id);
        console.log(id);
        const statusNumber = req.params.statusNumber;

        const data= await ScholarshipModel.updateOne({_id: id}, {$set: {status: statusNumber}});
        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
};



exports.ViewDetailsService =async(req) => {
    try {
        const id = new ObjectId(req.params.id);
        const MatchingStage = { $match: {_id: id}}
        // const JoiningSessionStage = { $lookup: {from: "sessions", localField: "sessionId", foreignField: "_id", as: "sessionDetails"} };
        // const UnwindSessionStage = {$unwind: "$sessionDetails" };


        // const ProjectionStage = {$project: {createdAt: 0, updatedAt: 0 , 
        //     "sessionDetails.createdAt" :0, "sessionDetails.updatedAt" :0, "courseDetails.createdAt" :0, "courseDetails.updatedAt" :0  }}


        const data= await ScholarshipModel.aggregate([
            MatchingStage,
            // ProjectionStage
        ])



        return {status:"success", data:data[0]};
    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}





exports.SearchResultService =async(req) => {
    try {

        const search = req.params.search;
        const MatchingStage = {
            $match: {$or: [{regNumber:search}, {mobile: search } ]}
        }
  
        const JoinWithSessionStage ={$lookup: {from: "scholarship-sessions", localField:"sessionId", foreignField: "_id", as: "session" }  };
        const UnwindSessionStage={ $unwind: "$session"};
       
        const ProjectionStage={$project:{'createdAt': 0,'updatedAt':0,'sessionId':0,'courseId':0, 
             'session.createdAt': 0, 'session.updatedAt': 0, 'session.des': 0, 'session.status': 0, 'session.lastDate': 0,

            }}

        const data= await ScholarshipModel.aggregate([
            MatchingStage,
            JoinWithSessionStage, UnwindSessionStage,

            ProjectionStage,
            
        ])

        return {status:"success", data:data};



    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}

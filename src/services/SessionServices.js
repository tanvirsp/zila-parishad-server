const mongoose = require('mongoose');
const ObjectID= mongoose.Types.ObjectId;

const SessionModel = require("../models/SessionModel");


exports.AddSessionService = async(req) =>{

    try {
        const reqBody = req.body;
        const data = await SessionModel.create(reqBody);
        return {status:"success", data:data};
    } catch (error) {
        return {status:"fail",data:error.toString()}

    }

}



exports.ViewSessionService = async(req) =>{

    try {
        const id = new ObjectID(req.params.id); 
        const data = await SessionModel.findOne({_id: id});
        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }


}


exports.SessionListService = async(req) =>{

    try {
        const data = await SessionModel.find({}).sort({createdAt: -1})
        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }


}


exports.ActiveSessionService = async(req) =>{
    try {
        const data = await SessionModel.findOne({status: "1"})
        return {status:"success", data:data};
    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}






exports.UpdateSessionService = async(req) =>{

    try {
        const id = new ObjectID(req.params.id);
        
        const reqBody = req.body
        const data = await SessionModel.updateOne({_id: id}, {$set: reqBody});

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

        const data = await SessionModel.aggregate([
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
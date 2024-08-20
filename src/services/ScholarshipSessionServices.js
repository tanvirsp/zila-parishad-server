const mongoose = require('mongoose');
const ScholarshipSessionModel = require('../models/ScholarshipSessionModel');
const ObjectID= mongoose.Types.ObjectId;





exports.AddSessionService = async(req) =>{

    try {
        const reqBody = req.body;
        const data = await ScholarshipSessionModel.create(reqBody);
        return {status:"success", data:data};
    } catch (error) {
        return {status:"fail",data:error.toString()}

    }

};



exports.SessionListService = async(req) =>{

    try {
        const data = await ScholarshipSessionModel.find({}).sort({createdAt: -1})
        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }


}




exports.DetailsSessionService = async(req) =>{

    try {
        const id = new ObjectID(req.params.id); 
        const data = await ScholarshipSessionModel.findOne({_id: id});
        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }


};


exports.UpdateSessionService = async(req) =>{

    try {
        const id = new ObjectID(req.params.id);
        
        const reqBody = req.body
        const data = await ScholarshipSessionModel.updateOne({_id: id}, {$set: reqBody});

        return {status:"success", data:data};

    } catch (error) {

        return {status:"fail",data:error.toString()}

    }

}

exports.ActiveSessionService = async(req) =>{
    try {
        const data = await ScholarshipSessionModel.findOne({status: "1"})
        return {status:"success", data:data};
    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}


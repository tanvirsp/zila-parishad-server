const mongoose = require('mongoose');
const ScholarshipSessionModel = require('../models/ScholarshipSessionModel');
const InstituteModel = require('../models/InstituteModel');
const ObjectID= mongoose.Types.ObjectId;



exports.AddInstituteService = async(req) =>{

    try {
        const reqBody = req.body;
        const data = await InstituteModel.create(reqBody);
        return {status:"success", data:data};
    } catch (error) {
        return {status:"fail",data:error.toString()}

    }
};



exports.InstituteListService = async(req) =>{

    try {
        const data = await InstituteModel.find({}).sort({createdAt: -1})
        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }


}






exports.DetailsInstituteService = async(req) =>{

    try {
        const id = new ObjectID(req.params.id); 
        const data = await InstituteModel.findOne({_id: id});
        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
};


exports.UpdateInstituteService = async(req) =>{

    try {
        const id = new ObjectID(req.params.id);  
        const reqBody = req.body
        const data = await InstituteModel.updateOne({_id: id}, {$set: reqBody});
        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}



exports.DeleteInstituteService = async(req) =>{

    try {
        const id = new ObjectID(req.params.id);
        const data = await InstituteModel.deleteOne({_id: id});
        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail",data:error.toString()}

    }
}


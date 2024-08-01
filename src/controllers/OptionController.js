const mongoose = require('mongoose');

const OptionModel = require("../models/OptionModel");
const ObjectID= mongoose.Types.ObjectId;


exports.UpdateOption = async( req, res) =>{
    try {
        const reqBody = req.body;
        const id = new ObjectID(reqBody._id);
        
        const data = await OptionModel.updateOne({_id: id}, {$set:reqBody },{upsert: true} )
        

        res.status(200).json({status:"success", data:data})
        
    } catch (error) {
        res.status(200).json({status:"fail", data:error.toString()})
    }

   
}


exports.GetOption = async( req, res) =>{
    try {
      
        const data = await OptionModel.find({})
        

        res.status(200).json({status:"success", data:data[0]})
        
    } catch (error) {
        res.status(200).json({status:"fail", data:error.toString()})
    }

   
}


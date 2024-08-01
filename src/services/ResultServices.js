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
        const certificateNumber = req.params.certificateNumber;
        const data = await ResultModel.findOne({certificateNumber: certificateNumber});

        return {status:"success", data:data};

    } catch (error) {

        return {status:"fail",data:error.toString()}

    }


}

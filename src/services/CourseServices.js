const CourseModel = require("../models/CourseModel");

exports.AddCourseService = async(req) =>{

    try {
        const reqBody = req.body;
        const data = await CourseModel.create(reqBody);

        return {status:"success", data:data};

    } catch (error) {

        return {status:"fail",data:error.toString()}

    }

}


exports.CourseListService = async(req) =>{
    try {
        const data = await CourseModel.find({});
        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }

}


exports.ViewCourseService = async(req) =>{
    try {
        const id = req.params.id;

        const data = await CourseModel.findOne({_id: id});
        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }

}


exports.UpdateCourseService = async(req) =>{
    try {
        const id = req.params.id;
        const reqBody = req.body;

        const data = await CourseModel.updateOne({_id: id}, {$set: reqBody});
        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }

}



const { CourseListService, AddCourseService, ViewCourseService, UpdateCourseService } = require("../services/CourseServices");

exports.AddCourse = async( req, res) =>{
    const result = await AddCourseService(req);

    res.status(200).json(result)
}




exports.CourseList = async( req, res) =>{
    const result = await CourseListService(req);
    
    res.status(200).json(result)
}


exports.ViewCourse = async( req, res) =>{
    const result = await ViewCourseService(req);
    
    res.status(200).json(result)
}


exports.UpdateCourse = async( req, res) =>{
    const result = await UpdateCourseService(req);
    
    res.status(200).json(result)
}




const { AddStudentDataService, ViewStudentDataService, TotalStudentGroupBySessionService, ListByFilterService, StudentSearchService, UpdateStatusService,  } = require("../services/StudentServices")


exports.AddStudentData = async( req, res) =>{
    const result = await AddStudentDataService(req);

    res.status(200).json(result)
}

exports.ViewStudentData = async( req, res) =>{
    const result = await ViewStudentDataService(req);

    res.status(200).json(result)
}


exports.UpdateStatus = async( req, res) =>{
    const result = await UpdateStatusService(req);
    res.status(200).json(result)
}



exports.TotalStudentGroupBySession = async( req, res) =>{
    const result = await TotalStudentGroupBySessionService(req);
    res.status(200).json(result)
}



exports.ListByFilter = async( req, res) =>{
    const result = await ListByFilterService(req);
    res.status(200).json(result)
}

exports.StudentSearch = async( req, res) =>{
    const result = await StudentSearchService(req);
    res.status(200).json(result)
}
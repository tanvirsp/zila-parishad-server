const { AddScholarshipService, ScholarshipListService, FindScholarshipDetailsService, UpdateScholarshipDataService, CheckByBirthCertificateService } = require("../services/ReceivedScholarshipServices");

exports.AddScholarship = async( req, res) =>{
    const result = await AddScholarshipService(req);
    res.status(200).json(result)
}



exports.ScholarshiptList = async( req, res) =>{
    const result = await ScholarshipListService(req);
    res.status(200).json(result)
}






exports.FindScholarshipDetails = async( req, res) =>{
    const result = await FindScholarshipDetailsService(req);
    res.status(200).json(result)
}




exports.UpdateScholarshipData = async( req, res) =>{
    const result = await UpdateScholarshipDataService(req);
    res.status(200).json(result)
}


exports.CheckByBirthCertificate = async( req, res) =>{
    const result = await CheckByBirthCertificateService(req);
    res.status(200).json(result)
}
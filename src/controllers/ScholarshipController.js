const EmailSend = require("../helper/EmailHelper");

const { AddScholarshipDataService, ApplicantListService, UpdateStatusService, ViewDetailsService, SearchResultService } = require("../services/ScholarshipServices");



exports.AddScholarshipData = async( req, res) =>{
    const result = await AddScholarshipDataService(req);

    // if(result.status === "success"){
    //     const {name,  regNumber, email} =result.data;
  
    //     //sending email with EJS template 'successMessage' is EJS template
    //     await EmailSend(email, "successMessage", {name, regNumber}, "Test Email Another") 
    // }

    res.status(200).json(result)
}

exports.ApplicantList = async(req, res) =>{
    const result = await ApplicantListService(req);

    res.status(200).json(result)
}


exports.UpdateStatus = async( req, res) =>{
    const result = await UpdateStatusService(req);
    res.status(200).json(result)
}

exports.ViewDetails = async( req, res) =>{
    const result = await ViewDetailsService(req);

    res.status(200).json(result)
}


exports.SearchResult = async( req, res) =>{
    const result = await SearchResultService(req);

    res.status(200).json(result)
}
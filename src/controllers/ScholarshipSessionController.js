const { AddSessionService, SessionListService, DetailsSessionService, UpdateSessionService, ActiveSessionService } = require("../services/ScholarshipSessionServices");



exports.AddSession = async( req, res) =>{
    const result = await AddSessionService(req);

    res.status(200).json(result)
}


exports.DetailsSession = async( req, res) =>{
    const result = await DetailsSessionService(req);

    res.status(200).json(result)
}




exports.ListSession = async( req, res) =>{
    
    const result = await SessionListService(req);
    res.status(200).json(result)
}



exports.UpdateSession = async( req, res) =>{
    const result = await UpdateSessionService(req);

    res.status(200).json(result)
}



exports.ActiveSession = async( req, res) =>{
    
    const result = await ActiveSessionService(req);
    res.status(200).json(result)
}




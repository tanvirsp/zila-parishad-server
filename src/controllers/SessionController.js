const { AddSessionService, ViewSessionService, UpdateSessionService, SessionListService, ActiveSessionService } = require("../services/SessionServices");



exports.AddSession = async( req, res) =>{
    const result = await AddSessionService(req);

    res.status(200).json(result)
}



exports.ViewSession = async( req, res) =>{
    
    const result = await ViewSessionService(req);

    res.status(200).json(result)
}


exports.UpdateSession = async( req, res) =>{
    const result = await UpdateSessionService(req);

    res.status(200).json(result)
}




exports.SessionList = async( req, res) =>{
    const result = await SessionListService(req);

    res.status(200).json(result)
}


exports.ActiveSession = async( req, res) =>{

    const result = await ActiveSessionService(req);
    res.status(200).json(result)
}


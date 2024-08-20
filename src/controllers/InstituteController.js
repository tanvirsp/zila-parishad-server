const {DeleteInstituteService, AddInstituteService, InstituteListService,UpdateInstituteService, DetailsInstituteService } = require("../services/InstituteService");




exports.AddInstitute = async( req, res) =>{
    const result = await AddInstituteService(req);

    res.status(200).json(result)
}



exports.InstituteDetails = async( req, res) =>{
    
    const result = await DetailsInstituteService(req);

    res.status(200).json(result)
}


exports.UpdateInstitute = async( req, res) =>{
    const result = await UpdateInstituteService(req);

    res.status(200).json(result)
}



exports.InstituteList = async( req, res) =>{
    const result = await InstituteListService(req);

    res.status(200).json(result)
}



exports.DeleteInstitutet = async( req, res) =>{
    const result = await DeleteInstituteService(req);

    res.status(200).json(result)
}

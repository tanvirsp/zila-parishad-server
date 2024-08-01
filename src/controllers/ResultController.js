const { AddResultService, FindResultService } = require("../services/ResultServices");

exports.AddResult = async( req, res) =>{
    const result = await AddResultService(req);

    res.status(200).json(result)
}


exports.FindResult = async( req, res) =>{
    const result = await FindResultService(req);

    res.status(200).json(result)
}

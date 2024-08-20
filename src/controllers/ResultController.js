const { AddResultService, FindResultService, ResultListService, UpdateResultService, SearchResultService } = require("../services/ResultServices");

exports.AddResult = async( req, res) =>{
    const result = await AddResultService(req);
    res.status(200).json(result)
}

exports.FindResult = async( req, res) =>{
    const result = await FindResultService(req);
    res.status(200).json(result)
}


exports.ResultList = async( req, res) =>{
    const result = await ResultListService(req);
    res.status(200).json(result)
}

exports.UpdateResult = async( req, res) =>{
    const result = await UpdateResultService(req);
    res.status(200).json(result)
}


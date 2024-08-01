const jwt = require("jsonwebtoken");

module.exports = (req, res, next) =>{

    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json("Access denied");
    } else {
        const token = authHeader;
        jwt.verify(token, process.env.ACCESS_TOKEN, function(err, decoded){
            if (err) {
                return res.status(403).send(err);
            }
            req.decoded = decoded;
            next()
        } )
    }


}
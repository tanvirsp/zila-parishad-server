const UserModel = require("../models/UserModel");

module.exports= async (req, res, next) =>{
    const email = req.headers.email;
    const filter = { email: email };

    const user = await UserModel.findOne(filter);
    
   
    if ( !(["admin", "super-admin"].includes(user.role) ) ) {
      return res.status(403).json({ message: "Access Denied" });
    }
    
    next();
  };


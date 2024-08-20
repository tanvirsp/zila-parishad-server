const { DecodeToken } = require("../helper/TokenHelper")

module.exports=(req,res,next)=>{

    // Receive Token
    let token=req.headers['token']
    if(!token){
        token=req.cookies['token']
    }

  // Token Decode
  const decoded=DecodeToken(token);
 
  // Request Header Email+UserID Add
  if(decoded===null){
      return res.status(401).json({status:"fail", message:"Unauthorized User"})
  }
  else {
    const email=decoded['email'];
    const user_id=decoded['user_id'];
    const role=decoded['role'];
    req.headers.email=email;
    req.headers.user_id=user_id;
    req.headers.role=role;

    next();
  }
}
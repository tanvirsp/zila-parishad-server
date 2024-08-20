const jwt=require('jsonwebtoken');

exports.EncodeToken=(email, role, user_id)=>{
    
    let EXPIRE={expiresIn: '24h'}
    let PAYLOAD={email:email, role: role, user_id:user_id}
    return jwt.sign(PAYLOAD, process.env.ACCESS_TOKEN, EXPIRE)
}

exports.DecodeToken=(token)=>{
    try {
        return jwt.verify(token, process.env.ACCESS_TOKEN)
    }
    catch (e) {
        return null
    }
}
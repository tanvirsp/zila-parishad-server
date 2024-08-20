const { RegisterUserService, ViewUserService, LoginUserService, ResetPasswordService, SendOtpService, VerifyOTPService, ChangePasswordService, ProfileService, ProfileUpdateService, AllUsersServices, UserListService } = require("../services/UserServices")



exports.RegisterUser = async(req, res) =>{
    const result = await RegisterUserService(req)
    return res.status(200).json(result)

}


exports.LoginUser = async(req, res) =>{
    const result = await LoginUserService(req)
    if(result['status']==="success"){
        
        // Cookies Option
        const cookieOption={expires:new Date(Date.now()+24*60*60*1000), httpOnly:false}
        // Set Cookies With Response
        res.cookie('token', result['token'], cookieOption);
        
        return res.status(200).json(result)

    }else {
        
        return res.status(200).json(result)
    }

};



exports.LogoutUser = async(req, res) =>{

    const cookieOption={expires:new Date(Date.now()-24*60*60*1000), httpOnly:false}

    // Set Cookies With Response
    res.cookie('token',"", cookieOption)
    return res.status(200).json({status:"success"})

}



exports.SendOtp = async(req, res) =>{
    const result = await SendOtpService(req)
    return res.status(200).json(result)
}



exports.VerifyOTP = async(req, res) =>{
    const result = await VerifyOTPService(req);
    if(result['status']==="success"){
        // Cookies Option
        const cookieOption={expires:new Date(Date.now()+24*60*60*1000), httpOnly:false}
        // Set Cookies With Response
        res.cookie('token', result['token'], cookieOption)
        return res.status(200).json(result)

    }else {
        return res.status(200).json(result)
    }   
    
}



exports.ResetPassword = async(req, res) =>{
    const result = await ResetPasswordService(req)
    return res.status(200).json(result)
}


exports.ChangePassword = async(req, res) =>{
    const result = await ChangePasswordService(req)
    return res.status(200).json(result)
}




exports.Profile = async(req, res) =>{
    const result = await ProfileService(req)
    return res.status(200).json(result)
}

exports.ProfileUpdate = async(req, res) =>{
    const result = await ProfileUpdateService(req)
    return res.status(200).json(result)
}


exports.UserList = async(req, res) =>{
    const result = await UserListService(req)
    return res.status(200).json(result)
}



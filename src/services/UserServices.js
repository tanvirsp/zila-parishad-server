const UserModel = require("../models/UserModel");
const bcrypt = require('bcrypt');
const { EncodeToken } = require("../helper/TokenHelper");
const EmailSend = require("../helper/EmailHelper");
const OTPModel = require("../models/OTPModel");


exports.RegisterUserService =async(req) =>{
    try {
        const reqBody = req.body;
        const userExit = await UserModel.find({email: reqBody.email});
        
        
        if(userExit.length > 0){
            return {status:"fail", data: `This ${reqBody.email} email is already used`}
        }

        await UserModel.create(reqBody);
        return {status:"success", message:"User Created Successfully"}


    } catch (error) {
        return {status:"fail",  data:error.toString()}
        
    }
};




exports.LoginUserService = async(req) =>{

    try {
        const {email, password} = req.body;

         //Validate Request
       if(!email || !password){
        return {status:"fail", message: "Please Enter email and password"}
       };

       // Check if user exists
       const user = await UserModel.findOne({ email });
       if(!user){
           return {status:"fail", message: "User not found, please Signup"}
       };


       // User exists, check if password is correct
       const passwordIsCorrect = await bcrypt.compare(password, user.password);


       if( user && passwordIsCorrect){
        
        
            // User Token Create
            const token=EncodeToken(email, user.role, user._id.toString());
            return {status:"success", token: token}

        } else {
            return {status:"fail", message: "Invalid email or password"}
        }



    } catch (error) {
        return {status:"fail",data:error.toString()}
    }

};




exports.SendOtpService = async(req) =>{
    try {
        const email= req.params.email;
        const user = await UserModel.findOne({ email });
        if(!user){
            return {status:"fail", message: "User not found, please Signup"}
        };

        //sendign verify code to email
        const OTPcode = Math.floor(100000+Math.random()*900000);
        
        const emailSubject='Email Verification'
        await EmailSend(email, "OTPMessage", {code: OTPcode}, emailSubject );

        //set OTP into user database
        await OTPModel.create({email: email, otp: code } );
        return {status:"success", message:"6 Digit OTP has been send check mail"}  

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}




exports.VerifyOTPService  = async(req) =>{
    try {
        const email= req.params.email;
        const otp= req.params.otp;
        
        const total = await OTPModel.find({email: email, otp: otp}).count();

        if(total > 0) {

            const user = await UserModel.findOne({ email });
            
            // User Token Create
            const token=EncodeToken(email, user.role, user._id.toString() );
            
            // OTP Code Update To 0
            await OTPModel.updateOne({email:email, otp: otp}, {$set: {status: 1 }});
            return {status:"success", message:"Your OTP Verify Successfully", token: token }

        }else{
            return {status:"fail", message:"Invalid OTP"}
        }

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }

};




exports.ResetPasswordService = async(req) =>{
    try {
    
        const {newPassword, email} = req.body;

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        const otp = await OTPModel.findOne({email: email});
    
        if(otp.status === 1){
            await UserModel.updateOne({email: email}, {$set: {password: hashedPassword}});
            return {status:"success", message: "Your password have been changed"}

        } else {
            return {status:"fail", message: "Please verify your OTP"}
        }
  

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
};



exports.ChangePasswordService = async(req) =>{
    try {
    
        const {oldPassword, newPassword} = req.body;
        const email =  req.headers.email

 
       // Check if user exists
       const user = await UserModel.findOne({ email });
       if(!user){
           return {status:"fail", message: "User not found, please Signup"}
       };
       
        //check if Old password is correct
        const oldPasswordIsCorrect = await bcrypt.compare(oldPassword, user.password);
        

        if(!oldPasswordIsCorrect){
            return {status:"fail", message: "Old password is not matching"}
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedNewassword = await bcrypt.hash(newPassword, salt);

        await UserModel.updateOne({email: email}, {$set: {password: hashedNewassword}});
        return {status:"success", message: "Your password have been changed"}


    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
};









exports.ViewUserService = async(req) =>{
    try {
       const userId = new Object(req.params.id);
       const data = await UserModel.findOne({_id: userId});

       return {status:"success", data: data}

    } catch (error) {
        return {status:"fail",  data:error.toString()}
    }
}



exports.ProfileService = async(req) =>{
    try {
        const email = req.headers.email;
        const data = await UserModel.find({email: email}, {password: 0, updatedAt: 0, otp: 0}  )      ;

        return {status:"success", data: data}

    } catch (error) {
        return {status:"fail", data:error.toString()}
    }
}


exports.ProfileUpdateService =  async(req) =>{
    

    try {
        const reqBody = req.body; 
        const email = req.headers.email;
        await UserModel.updateOne({email: email}, {$set: reqBody}, {upsert: true});
        return {status:"success", message:"Profile Save Successfully"}

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}



exports.UserListService =  async(req) =>{
    
    try {
       
        const data =  await UserModel.find({});
        return {status:"success", data: data}

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}
const mongoose = require('mongoose');

const dataSchema = mongoose.Schema( {
    studentId: {type:mongoose.Schema.Types.ObjectId, required: true, unique: true},
    sessionId: {type:mongoose.Schema.Types.ObjectId, required: true},
    courseId: {type:mongoose.Schema.Types.ObjectId, required: true},
    birthCertificateNumber: {type: String, required: true },
    regNumber: {type: String, required: true, unique: true},
    mark: {type: String, required: true},
    
}, {timestamps: true, versionKey:false});



const ResultModel = mongoose.model("results", dataSchema );

module.exports = ResultModel


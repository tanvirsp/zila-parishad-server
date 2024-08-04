const mongoose = require('mongoose');

const dataSchema = mongoose.Schema( {
    studentId: {type: String, required: true},
    sessionId: {type: String, required: true},
    courseId: {type: String, required: true},
    regNumber: {type: String, required: true},
    mark: {type: String, required: true},
    
}, {timestamps: true, versionKey:false});



const ResultModel = mongoose.model("results", dataSchema );

module.exports = ResultModel
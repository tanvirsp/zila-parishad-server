const mongoose = require('mongoose');

const dataSchema = mongoose.Schema( {
    certificateNumber: {type: String, required: true},
    sutdentName: {type: String, required: true},
    fatherName: {type: String, required: true},
    course: {type: String, required: true},
    duration: {type: String, required: true},
    session: {type: String, required: true},
    certificate: {type: String, required: true},
    result: {type: String, required: true},


   

}, {timestamps: true, versionKey:false});



const ResultModel = mongoose.model("results", dataSchema );

module.exports = ResultModel
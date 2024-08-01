const mongoose = require('mongoose');

const dataSchema = mongoose.Schema( {
    name: {type: String, required: true},
    nameInEnglish: {type: String, required: true},
    des: {type: String},
    duration: {type: String, required: true},
    value: {type: String, required: true},
    thumbnail: {type: String, required: true},
   
}, {timestamps: true, versionKey:false});



const CourseModel = mongoose.model("courses", dataSchema );

module.exports = CourseModel;
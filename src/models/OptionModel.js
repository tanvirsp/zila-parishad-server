const mongoose = require('mongoose');

const dataSchema = mongoose.Schema( {
    session: {type:mongoose.Schema.Types.ObjectId},
    showTrainingForm: {type: Boolean, default: false},
    showAd: {type: Boolean, default: false},
   


}, {timestamps: true, versionKey:false});



const OptionModel = mongoose.model("options", dataSchema );

module.exports = OptionModel;
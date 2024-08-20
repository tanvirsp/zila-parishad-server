const mongoose = require('mongoose');

const dataSchema = mongoose.Schema( {
    session: { type: String,  required: true },
    des : {type: String},
    status : {type: String, required: true  },
    sessionDigit : {type: String, required: true  },
    lastDate : {type: Date, required: true  },
    


}, {timestamps: true, versionKey:false});



const ScholarshipSessionModel = mongoose.model("scholarship-sessions", dataSchema );

module.exports = ScholarshipSessionModel
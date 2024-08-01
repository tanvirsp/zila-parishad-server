const mongoose = require('mongoose');

const dataSchema = mongoose.Schema( {
    session: { type: String,  required: true },
    des : {type: String},
    lastDate : {type: Date, required: true  },
    status : {type: String, required: true  },


}, {timestamps: true, versionKey:false});



const SessionModel = mongoose.model("sessions", dataSchema );

module.exports = SessionModel
const mongoose = require('mongoose');

const dataSchema = mongoose.Schema( {
    name: { type: String,  required: true },
    des : {type: String},
    contactPerson : {type: String, required: true  },
    contactNumber : {type: String, required: true  },
    email : {type: String, required: true  },
    status : {type: String, default: "1" },

}, {timestamps: true, versionKey:false});



const InstituteModel = mongoose.model("institutes", dataSchema );

module.exports = InstituteModel
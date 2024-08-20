const mongoose = require('mongoose');

const dataSchema = mongoose.Schema( {
    name: {type: String, required: true},
    nameInEnglish: {type: String, required: true},
    birthDate: {type: String, required: true},
    birthCertificateNumber: {type: String, required: true },
    nidNumber: {type: String, unique: true },
    
    fatherName: {type: String, required: true},
    fatherNameinEnglish: {type: String, required: true},
    motherName: {type: String, required: true},
    motherNameInEnglish: {type: String, required: true},

    parmanentVillage: {type: String, required: true},
    parmanentArea: {type: String, required: true},
    parmanentPostOffice: {type: String, required: true},
    parmanentUpazilla: {type: String, required: true},
    parmanentDistrict: {type: String, required: true},

    presentVillage: {type: String, required: true},
    presentArea: {type: String, required: true},
    presentPostOffice: {type: String, required: true},
    presentUpazilla: {type: String, required: true},
    presentDistrict: {type: String, required: true},

    examOne: {type: String, required: true},
    examOneBoard: {type: String, required: true},
    examOneGroup: {type: String, required: true},
    examOneYear: {type: String, required: true},
    examOneRoll: {type: String, required: true},
    examOneReg: {type: String, required: true},
    examOneResult: {type: String, required: true},

    examTwo: {type: String, required: true},
    examTwoBoard: {type: String, required: true},
    examTwoGroup: {type: String, required: true},
    examTwoYear: {type: String, required: true},
    examTwoRoll: {type: String, required: true},
    examTwoReg: {type: String, required: true},
    examTwoResult: {type: String, required: true},

    fatherNID: {type: String, required: true},
    fatherYearlyIncome: {type: String, required: true},
    cota: {type: String, required: true},
    instuteNameAndAddress: {type: String, required: true},
    mobile: {type: String, required: true},
    email: {type: String},
    disabled: {type: String, required: true},
    upazati: {type: String, required: true},

    attachment: {
        profileImg: {type: String, required: true},
        birthCertificateImg: {type: String, required: true},
        citizenshipCertificateImg: {type: String, required: true},
        nidImg: {type: String},
        studyingImg: {type: String, required: true},
        poorCertificateImg: {type: String, required: true},
    },
    
    regNumber: {type:String, required: true,  unique: true  },
    status: {type: String, default: "0"},
    sessionId: {type:mongoose.Schema.Types.ObjectId, required: true},

}, {timestamps: true, versionKey:false});



const ScholarshipModel = mongoose.model("scholarships", dataSchema );

module.exports = ScholarshipModel
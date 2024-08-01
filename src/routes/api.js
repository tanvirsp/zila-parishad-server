const express = require('express');
const router = express.Router();

const verifyJWT = require('../middleware/verifyJWT');

const upload = require('../middleware/uploader');


const StudentController = require("../controllers/StudentController");
const ResultController = require("../controllers/ResultController");
const OptionController = require("../controllers/OptionController");
const PdfController = require("../controllers/PdfController");
const SessionController = require("../controllers/SessionController");
const CourseController = require("../controllers/CourseController");




router.post("/file-upload", upload.single('image'),  async(req, res) =>{
    try {
        
      res.status(200).send({status: true, data: req.file});
    } catch (error) {
        res.status(400).send({status: false,  message: error.message})
        
    }
  
  });


  
router.get("/certificate", PdfController.viewCertificate )
router.get("/createPdf", PdfController.createPDF )


  

//Student Api

router.post("/student-register", StudentController.AddStudentData);
router.get("/student/:id", StudentController.ViewStudentData);
router.get("/students-by-session", StudentController.TotalStudentGroupBySession);
router.post("/student/:id/:statusNumber", StudentController.UpdateStatus);

router.post("/students", StudentController.ListByFilter);
router.get("/students/:search", StudentController.StudentSearch);






 //Result Api
 router.post("/result", ResultController.AddResult);
 router.get("/result/:certificateNumber", ResultController.FindResult);


 //Options Api
 router.post("/options", OptionController.UpdateOption);
 router.get("/options", OptionController.GetOption);

 
 //Session Api
 router.post("/session", SessionController.AddSession);
 router.get("/session/:id", SessionController.ViewSession);
 router.get("/sessions", SessionController.SessionList);
 router.post("/update-session/:id", SessionController.UpdateSession);

 
 
 
 

 //Course API
 router.post("/course", CourseController.AddCourse);
 router.get("/courses", CourseController.CourseList);
 router.get("/course/:id", CourseController.ViewCourse);
 router.post("/course/:id", CourseController.UpdateCourse);




module.exports = router;
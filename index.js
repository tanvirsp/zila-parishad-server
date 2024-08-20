const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

const app = require("./app");


const port= process.env.RUNNING_PORT || 5000




mongoose.connect(`${process.env.DATABASE_ATLAST}`)
.then(()=>{
    console.log(`Database connection is successful ` );
    
    app.listen(port, () => {
        console.log(`Server Running on Port ${port}`)
    })
});
  



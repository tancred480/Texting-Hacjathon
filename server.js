const express = require("express");
const app = express();
const  path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
app.options('*',cors()); // start everything using cors for cross orgin data passing
require("dotenv").config({path:__dirname + '/.env'});


const api = process.env.API_URL;
const authJwt = require(`./helpers/jwt`);
const errorHandler = require(`./helpers/error-handler`);

//middlewares
app.use(express.json());
app.use(morgan('tiny'));//for some clear logs more effiecient
// app.use(authJwt());//before giving any data access to the user check if its token is valid or not.
// // app.use((err,req,res,next)=>{
// //     if(err){
// //         res.status(500).json({message:err})
// //     }
// // })
 app.use(errorHandler);
//Routers
app.use(`${api}/users/`,userRoutes);
//Database Connection
const mongodbURL = process.env['MONGO_DB_URL'];
mongoose.connect(`${mongodbURL}`,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    dbName:'Hackathon'
})
.then(()=>{
    console.log(`Database Connected`);
}).catch((err)=>{
    console.log(`Database not connected Error Occured`);
    console.log(`Error :> ${err}`);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT,console.log(`Server running on port ${PORT}`));

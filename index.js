import express  from 'express';
import morgan from 'morgan';

import dotenv from "dotenv";
dotenv.config();

const app = express()
const PORT = process.env.PORT

//logging middleware
if(process.env.NODE_ENV ==="development"){
    app.use(morgan('dev'))
}


//Body Parser Middleware
app.use(express.json({limit: '10kb'}));
app.use(express.urlencoded({extended:true,limit:"10kb"}));

//Global Error Handler
app.use((err,req,res,next) =>{
    console.log(err.stack)
    res.status(err.status || 500).json({
        status:"error",
        message:err.message || "Internal Server error",
        ...err(process.env.NODE_ENV === "development" &&  { stack: err.stack}),
    });
});


//Api Routes



//404 handler
app.use((req,res) =>{
    res.status(404).json({
        status:"error",
        message: "Route not found!!",
    });
});

app.listen(PORT, () =>{
    console.log(`server is running at ${PORT} in ${process.env.NODE_ENV} mode`)
})
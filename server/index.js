import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import path from 'path'
//
import userRoute from './routes/userRoute.js'
import authRoute from './routes/authRoute.js'
import listRoute from './routes/listRoute.js'
dotenv.config()
mongoose.connect('mongodb+srv://midhun:5ALyNbGTrvwsZW8p@cluster0.if0jydt.mongodb.net/chatapp?retryWrites=true&w=majority')
.then(()=>{
    console.log('server is connected to database')
})
.catch((err)=>{
    console.log(err,'error in db connection')
})
const app = express();
app.use(cookieParser());
app.use(express.json());

app.listen(3000,()=>{
    console.log('server is running on the port 3000')  
}) 
app.get('/test',(req,res)=>{
    res.json({message:'Hello World!'})
})

app.use('/api/user',userRoute); 
app.use('/api/auth',authRoute);
app.use('/api/listing',listRoute);
app.use((err,req,res,next)=>{
  const statusCode = err.statusCode ||500;
  const message = err.message || 'Internal server error';
  return res.status(statusCode).json({
    success:false,
    message,
    statusCode:statusCode
  })
})
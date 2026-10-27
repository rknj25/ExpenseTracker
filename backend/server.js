import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnect from './Config/db.js'
import expenseRouter from './Routes/expenseRoute.js';
import userRouter from './Routes/userRouter.js';
dotenv.config();

const port=process.env.PORT;
const app=express()
dbConnect();

app.use(express.json());
app.use(cors());

app.use('/api/expense',expenseRouter)
app.use('/api/user',userRouter);

app.listen(port,()=>{
    console.log(`server started at:- ${port}`);
})
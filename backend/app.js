import { config } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from './router/messageRouter.js';
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRouter from './router/userRouter.js';
import appointementRouter from './router/appointementRouter.js'

const app=express();
config({path:"./config/config.env"})



app.use(cors({
    origin:[process.env.FRONTEND_URL,process.env.DASHBOARD_URL,'https://online-doctor-appintement-system-2-hplu.onrender.com'],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}))


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(
    fileUpload({
            useTempFiles:true,
            tempFileDir:'/temp/'
        }
    )
)

app.use("/api/v1/message",messageRouter);
app.use("/api/v1/user",userRouter);
app.use('/api/v1/appointement',appointementRouter)

dbConnection();
app.use(errorMiddleware);
export default app;

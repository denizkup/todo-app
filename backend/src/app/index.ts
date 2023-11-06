import express,{Express,Request,Response,NextFunction} from "express";
import { errorHandler } from '../middlewares/errorHandle';
import notFoundMiddleware from "../middlewares/notFoundMiddleware";
import { DatabaseAdaptor } from "../db";
import {Mongoose} from "mongoose";
import api from '../api';
import cookieParser from "cookie-parser"
import authRoutes from "../routes/authentication.route";
import Sesssions from "../utils/sessions";
import cors from "cors";

const dba:Promise<Mongoose|null> = new DatabaseAdaptor(process.env.DATABASE_URL).connect();

const corsOptions  = {
    credentials:true,
    origin: ["http://localhost",
             "http://localhost:5173",
             ]
};

const app:Express = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

export const sessionManager = new Sesssions();

app.get("/", (req:Request,res:Response,next:NextFunction) => {
    res.json({message: "Hello from todo-app"});
})


app.use("/auth/",authRoutes);
app.use("/api/v1",api);

app.use(notFoundMiddleware);
app.use(errorHandler);

export default app;

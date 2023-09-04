import express,{Express,Request,Response,NextFunction} from "express";
import { errorHandler } from '../middlewares/errorHandle';
import notFoundMiddleware from "../middlewares/notFoundMiddleware";
import { DatabaseAdaptor } from "../db";
import {Mongoose} from "mongoose";
// import Todo from "../models/todo.model"
import todoRoutes from "../routes/todo.routes";
import userRoutes from "../routes/user.routes";

const dba:Promise<Mongoose|null> = new DatabaseAdaptor(process.env.DATABASE_URL).connect()
const app:Express = express()
app.use(express.json())

app.get("/", (req:Request,res:Response,next:NextFunction) => {
    res.json({message: "Hello from todo-app"});
})

app.use("/todos",todoRoutes);
app.use("/users",userRoutes);

app.use(notFoundMiddleware);
app.use(errorHandler);

export default app;

import { Response, Request, NextFunction } from 'express';
import todoService from './todos.service';
import { sessionManager } from '../../app';

export async function addTodo(req: Request, res: Response ,next: NextFunction){
    let response_code = 422;
    const new_todo = req.body.context;
    const user_data = await sessionManager.getSession(req.cookies?.session_id);
    const result = await todoService.addTodo(user_data.id,new_todo);
    if(result.status){
        response_code = 200;
    } 
    // setTimeout(()=> {return res.status(response_code).send(result);},4000)
    return res.status(response_code).send(result);
}  

export async function updateTodo(req: Request, res: Response ,next: NextFunction){
    let response_code = 422;
    const updated_todo = req.body;
    const user_data = await sessionManager.getSession(req.cookies?.session_id);
    const result = await todoService.updateTodo(user_data.id,updated_todo);
    if(result.status){
        response_code = 200;
    } 
    return res.status(response_code).send(result);
}   

export async function listTodo(req: Request, res: Response ,next: NextFunction){
    let response_code = 422;
    const user_data = await sessionManager.getSession(req.cookies?.session_id);
    console.log("TODO LİST USER DATA ",user_data)
    const result = await todoService.listTodo(user_data.id);
    if(result.status){
        response_code = 200;
    } 
    return res.status(response_code).send(result);
}   

export async function deleteTodo(req: Request, res: Response ,next: NextFunction){
    let response_code = 422;
    const todo_id = req.params._id;
    const user_data = await sessionManager.getSession(req.cookies?.session_id);
    const result = await todoService.deleteTodo(user_data.id,todo_id);
    if(result.status){
        response_code = 200;
    } 
    return res.status(response_code).send(result);
} 
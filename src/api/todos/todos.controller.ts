import { Response, Request, NextFunction } from 'express';
import todoService from './todos.service';

export async function addTodo(req: Request, res: Response ,next: NextFunction){
    let response_code = 422;
    const new_todo = req.body.todo;
    const result = await todoService.addTodo(new_todo);
    if(result.status){
        response_code = 200;
    } 
    return res.status(response_code).send(result);
}   

export async function listTodo(req: Request, res: Response ,next: NextFunction){
    let response_code = 422;
    const result = await todoService.listTodo();
    if(result.status){
        response_code = 200;
    } 
    return res.status(response_code).send(result);
}   

export async function deleteTodo(req: Request, res: Response ,next: NextFunction){
    let response_code = 422;
    const deleted_id = req.params?.id;
    const result = await todoService.deleteTodo(deleted_id);
    if(result.status){
        response_code = 200;
    } 
    return res.status(response_code).send(result);
} 
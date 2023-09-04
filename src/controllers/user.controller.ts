import { Response, Request, NextFunction } from 'express';
import userService from '../services/user.service';

export async function addUser(req: Request, res: Response, next: NextFunction) {
    let response_code = 422;
    const new_user = req.body.user;
    const result = await userService.addUser(new_user);
    if(result.status){
        response_code = 200;
    }
    return res.status(response_code).send(result)
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
    let response_code = 422;
    const username = req.params?.username;

    const result = await userService.getUser(username);
    if(result.status){
        response_code = 200;
    }
    return res.status(response_code).send(result)
}

export async function listUser(req: Request, res: Response, next: NextFunction) {
    let response_code = 422;
    const result = await userService.listUser();
    if(result.status){
        response_code = 200;
    }
    return res.status(response_code).send(result)
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    let response_code = 422;
    const deleted_id = req.params?.id;
    const result = await userService.deleteUser(deleted_id);
    if(result.status){
        response_code = 200;
    }
    return res.status(response_code).send(result)
}
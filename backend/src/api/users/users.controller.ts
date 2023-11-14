import { Response, Request, NextFunction } from 'express';
import userService from './users.service';
import { UserData } from '../../types/user/userData';

export async function addUser(req: Request<{},{},UserData>, res: Response, next: NextFunction) {
    let response_code = 422;
    const new_user = req.body;
    console.log("new user > ",new_user)
    const result = await userService.addUser(new_user);
    if(result.status){
        response_code = 200;
    }
    return res.status(response_code).send(result);
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
    let response_code = 404;
    const user_id = req.query?.user_id;

    const result = await userService.getUser(user_id);
    if(result.status){
        response_code = 200;
    }
    return res.status(response_code).send(result);
}

export async function listUser(req: Request, res: Response, next: NextFunction) {
    let response_code = 422;
    const result = await userService.listUser();
    if(result.status){
        response_code = 200;
    }
    return res.status(response_code).send(result);
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    let response_code = 422;
    const deleted_id = req.params?.id;
    const result = await userService.deleteUser(deleted_id);
    if(result.status){
        response_code = 200;
    }
    return res.status(response_code).send(result);
}
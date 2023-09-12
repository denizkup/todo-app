import * as crypto from "crypto";
import { sessionManager } from "../app";
import { SessionType } from "../types/session.type";
import { UserData } from "../types/user/userData";
import userService from "../api/users/users.service";
import {Request,Response,NextFunction} from "express";
import { UserCredentials } from "../types/user/userCredentials";
import authenticationService from "../services/authentication.service";


async function signup(req:Request<{},{},UserData>,res:Response,next:NextFunction) {
    let response_code = 422;
    const userdata = req.body;
    const signup_result = await userService.addUser(userdata);
    if(signup_result.status){
        response_code = 200;
    }
    return res.status(response_code).send(signup_result);
}

async function signin(req:Request<{},{},UserCredentials>,res:Response,next:NextFunction){
    let response_code = 401;
    const credentials = req.body;
    const signin_result = await authenticationService.signin(credentials);

    if(signin_result.status){
        response_code = 200;
        const user_is_alredy_signed_in = await sessionManager.getSession(req.cookies?.session_id);
        if(user_is_alredy_signed_in === null){
            const session:SessionType = {session_id:crypto.randomUUID(),
                                         session_data: { id         : signin_result.payload.id, 
                                                         username   : signin_result.payload.username,
                                                         auth_level : signin_result.payload.auth_level
                                                       }
                                        };
            await sessionManager.createSession(session);

            res.cookie("session_id",session.session_id,{
                maxAge:24*60*60*1000,
                secure:false,
                httpOnly:true,
                sameSite:"Lax"
            });
        }
        delete signin_result.payload.id;
        delete signin_result.payload.auth_level;
    }

    return res.status(response_code).send(signin_result);

}

async function signout(req:Request,res:Response,next:NextFunction) {
    let response_code = 422;

    try{
        await sessionManager.deleteSession(req.cookies?.session_id);

        if(req.cookies.session_id){
            res.clearCookie("session_id");
            response_code = 200;
        }
    }
    catch(error){

    }
    res.status(response_code).send();
}


export default {signup,signin,signout}
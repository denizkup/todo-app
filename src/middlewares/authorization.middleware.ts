import {Request,Response,NextFunction} from "express";
// import jwt from "jsonwebtoken";
import { serviceReturn } from "../types/serviceReturn.type";
import { sessionManager } from "../app";

export default function authorize(allowed_auth_levels?:string[]){
    
    let result: serviceReturn = {};
    result.status = false;
    result.message = "Not authorized user!"
    return async (req:Request,res:Response,next:NextFunction) => {
        try{
            const user_data = await sessionManager.getSession(req.cookies?.session_id);
            if(allowed_auth_levels?.length > 0){
                const auth_levels = [...allowed_auth_levels];
                const has_authorization = auth_levels.includes(user_data?.auth_level);
                if(has_authorization){
                    next();
                }
                else{
                    return res.status(401).send(result);
                }
            }
            else{
                if(user_data !== null){
                    next();
                }
                else{
                    return res.status(401).send(result);
                }
            }
        }
        catch(error) {
            return res.status(401).send(result);
        }

    }
}
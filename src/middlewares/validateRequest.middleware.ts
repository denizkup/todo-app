import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import requestValidator from '../types/requestValidator';

export default function validateRequest(validators:requestValidator){
    return async(req:Request,res:Response,next:NextFunction) => {
        try{
            if(validators.params){
                req.params = await validators.params.parseAsync(req.params)
            }

            if(validators.body){
                req.body = await validators.body.parseAsync(req.body)
            }
            
            if(validators.query){
                req.body = await validators.query.parseAsync(req.query)
            }

            next();
        }
        catch(error){
            if(error instanceof ZodError){
                res.status(422).send("Data in wrong format");
            }
            next(error);
        }
    };
}
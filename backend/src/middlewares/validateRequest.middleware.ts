import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import requestValidaton from '../types/requestValidation.type';

export default function validateRequest(validators:requestValidaton){
    return async(req:Request,res:Response,next:NextFunction) => {
        console.log("req.=> ",req.body)
        try{
            if(validators.params){
                req.params = await validators.params.parseAsync(req.params);
            }

            if(validators.body){
                req.body = await validators.body.parseAsync(req.body);
            }
            
            if(validators.query){
                req.body = await validators.query.parseAsync(req.query);
            }

            next();
        }
        catch(error){
            console.log("lkerjlkejr ",error)
            if(error instanceof ZodError){
                let error_message = "undefined_error";
                let zod_error = JSON.parse(error.message)[0];
                try{
                    error_message = zod_error.message;
                }
                catch(error){

                }
                if(zod_error.code === "invalid_type"){
                    error_message = "Wrong paramater";
                }
                error_message = process.env.NODE_ENV === 'production' ? 'Wrong data format!' : error_message;
                res.status(422).send({status:false,message:error_message});
            }
            else{
                next(error);
            }
        }
    };
}
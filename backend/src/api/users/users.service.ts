import User from "./users.model";
import Todo from "../todos/todos.model";
import { serviceReturn } from "../../types/serviceReturn.type";
import hashData from "../../utils/hashData";
import {getCurrentTime} from "../../utils/getTime";

async function addUser(user):Promise<serviceReturn>{
    let result: serviceReturn = {};

    try{
        const email_exist = await User.findOne({email:user.email});

        if(email_exist === null){
            user.password = await hashData.hash(user.password);
            user.create_date = getCurrentTime();
            const new_user = new User(user);
            await new_user.save();
            result.status = true;
            result.message = "User added successfuly!";
        }
        else{
            result.status = false;
    
            result.message = "Email is already exist!";
            
        }
    }
    catch(error){
        console.log(error)
        result.status = false;
        result.message = "Failed to add new user!"
    }

    return result;
}

async function getUser(user_id:string):Promise<serviceReturn>{
    let result: serviceReturn = {};
    result.status = false;

    try{
        const user = await User.find({_id:user_id});
        if(user.length > 0){
            result.status = true;
            result.message = "User getted successfuly!"
            result.payload = user;
        }
        else{
            result.message = "User not found!"
        }
    }
    catch(error){
        result.message = "Failed to get user!"
    }

    return result;
}


async function listUser():Promise<serviceReturn>{
    let result: serviceReturn = {};

    try{
        const user_list = await User.find().select(['-password']);
        result.status = true;
        result.message = "User list getted successfuly!"
        result.payload = user_list;
    }
    catch(error){
        result.status = false;
        result.message = "Failed to get user list!"
    }

    return result;
}


async function deleteUser(_id:string):Promise<serviceReturn>{
    let result: serviceReturn = {};

    try{
        await User.deleteOne({_id});
        await Todo.deleteOne({user_id:_id});
        result.status = true;
        result.message = "User deleted successfuly!";
    }
    catch(error){
        result.status = false;
        result.message = "Failed to delete user!";
    }

    return result;
    
}
export default {addUser,getUser,listUser,deleteUser};
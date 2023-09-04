import User from "../models/user.model";
import { serviceReturn } from "../types/serviceReturn.type";

async function addUser(user):Promise<serviceReturn>{
    let result: serviceReturn = {};

    try{
        const username_exist = await User.find({username:user.username});
        const email_exist = await User.find({email:user.email});

        if(username_exist.length  === 0 && email_exist.length === 0){
            const new_user = new User(user)
            await new_user.save()
            result.status = true;
            result.message = "User added successfuly!"
        }
        else{
            result.status = false;
            if(username_exist.length > 0){
                result.message = "User is already exist!"
            }
            else{
                result.message = "Email is alreay exist!"
            }
        }
    }
    catch(error){
        result.status = false;
        result.message = "Failed to add new user!"
    }

    return result;
}

async function getUser(username:string):Promise<serviceReturn>{
    let result: serviceReturn = {};

    try{
        const user = await User.find({username:username});
        result.status = true;
        result.message = "User getted successfuly!"
        result.payload = user;
    }
    catch(error){
        console.log(error)
        result.status = false;
        result.message = "Failed to get user!"
    }

    return result;
}


async function listUser():Promise<serviceReturn>{
    let result: serviceReturn = {};

    try{
        const user_list = await User.find();
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
        result.status = true;
        result.message = "User deleted successfuly!"
    }
    catch(error){
        result.status = false;
        result.message = "Failed to delete user!";
    }

    return result;
    
}
export default {addUser,getUser,listUser,deleteUser};
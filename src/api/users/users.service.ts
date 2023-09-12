import User from "./users.model";
import { serviceReturn } from "../../types/serviceReturn.type";
import hashData from "../../utils/hashData";
import getCurrentTime from "../../utils/getTime";

async function addUser(user):Promise<serviceReturn>{
    let result: serviceReturn = {};

    try{
        const username_exist = await User.findOne({username:user.username});
        const email_exist = await User.findOne({email:user.email});

        if(username_exist === null && email_exist === null){
            user.password = await hashData.hash(user.password);
            user.create_date = getCurrentTime();
            const new_user = new User(user)
            await new_user.save()
            result.status = true;
            result.message = "User added successfuly!"
        }
        else{
            result.status = false;
            if(username_exist === null){
                result.message = "User is already exist!"
            }
            else{
                result.message = "Email is alreay exist!"
            }
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
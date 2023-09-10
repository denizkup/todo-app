
import hashData from "../utils/hashData";
// import getCurrentTime from "../utils/getTime";
import { serviceReturn } from "../types/serviceReturn.type";
import User from "../api/users/users.model";
import { UserCredentials } from "../types/user/userCredentials";

async function signin(credentials:UserCredentials):Promise<serviceReturn>{
    let result:serviceReturn = {}
    result.status = false;

    try{
        const user = await User.findOne({username:credentials.username});//TODO FIND OR FINDONE
        if(user){
            const password_is_true = await hashData.compare(credentials.password,user.password)
            if(password_is_true){
                const user_data = {id:user._id.valueOf(),username:user.username,auth_level:user.auth_level } // Looks ugly :/
                result.status = true;
                result.payload = user_data;
            }
            else{
                result.message = "Wrong password!"
            }
        }
        else{
            result.message = "User not found!"
        }
    }
    catch(error){
        result.message = "Failed at signing!"
    }

    return result;
}

export default {signin};
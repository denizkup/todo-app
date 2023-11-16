import { userDataType } from "../types/userData.type";
import apiClient from "../utils/apiClient.util";


export type UserCredentials = {
    email:string,
    password:string
}

export async function loginUser(user:UserCredentials) {
    return await apiClient().post("auth/signin",user)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            if(error.code === "ERR_NETWORK"){
                return {status:false,message:"Network error!"}
            }
            else{
                return error.response.data
            }
        })
}

export async function verifyUser(){
    return await apiClient().post("auth/verify")
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            return false
        })
    
}


export async function logoutUser(){
    return await apiClient().post("auth/signout")
        .then((response) => {
            return true
        })
        .catch((error) => {
            return false;
        })
}

export async function signupUser(userdata:userDataType) {
    return await apiClient().post("auth/signup",userdata)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            return error.response.data
        })
    
}
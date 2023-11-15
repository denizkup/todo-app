import apiClient from "../utils/apiClient.util";


export type UserCredentials = {
    username:string,
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
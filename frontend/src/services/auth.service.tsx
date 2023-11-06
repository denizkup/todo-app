import apiClient from "../utils/apiClient.util";

export type UserCredentials = {
    username:string,
    password:string
}

export async function loginRequest(user:UserCredentials) {
    console.log("credentialscredentials ",user)
    return await apiClient().post("auth/signin",user)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            return error.response.data
        })
}
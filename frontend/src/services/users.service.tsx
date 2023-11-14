import apiClient from "../utils/apiClient.util";
import { serviceReturn } from "../types/serviceReturn.type";

export async function getUserListService():Promise<serviceReturn> {

    return await apiClient().get("api/v1/users/list")
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        })
}

export async function deleteUserService(user_id:string):Promise<serviceReturn> {

    return await apiClient().delete(`api/v1/users/delete/${user_id}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        })

}


export async function addUserService(user:any):Promise<serviceReturn> {
    return await apiClient().post("api/v1/users/add",user)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        })
    
}
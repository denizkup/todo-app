import apiClient from "../utils/apiClient.util";
import { serviceReturn } from "../types/serviceReturn.type";
import { TodoType } from "../types/todo.type";

export async function getTodoListService():Promise<serviceReturn> {

    return await apiClient().get("api/v1/todos/list")
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        })
    
}


export async function deleteTodoService(todo_id:string){
    return await apiClient().delete(`api/v1/todos/delete/${todo_id}`)
        .then((response)=> {
            return response.data;
        })
        .catch((error) => {
            throw error;
        })
}


export async function addTodoService(todo_context:string) {
    return await apiClient().post("api/v1/todos/add",{context:todo_context})
        .then((response) => {
            return response.data;
        })
        .catch((error)=> {
            throw error;
        })    
}

export async function updateTodoService(todo:TodoType) {
    return await apiClient().put("api/v1/todos/update",todo)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        })
}

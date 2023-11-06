import apiClient from "../utils/apiClient.util";
import { serviceReturn } from "../types/serviceReturn.type";
import { TodoType } from "../types/todo.type";

export async function getTodoListService():Promise<serviceReturn> {

    return await apiClient().get("api/v1/todos/list")
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.log("getTodoList error => ",error)
        })
    
}


export async function deleteTodoService(todo_id:string){
    console.log(`api/v1/todos/delete/${todo_id}`)
    return await apiClient().delete(`api/v1/todos/delete/${todo_id}`)
        .then((response)=> {
            console.log("delete todo res => ",response)
            return response.data
        })
        .catch((error) => {
            console.log("delete todo error => ",error)
        })
}


export async function addTodoService(todo_context:string) {
    return await apiClient().post("api/v1/todos/add",{context:todo_context})
        .then((response) => {
            console.log("add todo response => ",response)
            return response.data
        })
        .catch((error)=> {
            console.log("add todo error => ",error)
        })    
}

export async function updateTodoService(todo:TodoType) {
    return await apiClient().put("api/v1/todos/update",todo)
        .then((response) => {
            console.log("update tood response =>  ",response)
            return response.data
        })
        .catch((error) => {
            console.log("update todo error => ",error)
        })
}

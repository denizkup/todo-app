import Todo from "../models/todo.model"
import { serviceReturn } from "../types/serviceReturn.type";

async function addTodo(todo):Promise<serviceReturn>{

    let result: serviceReturn = {}
    try{
        const new_todo = new Todo({todo:todo})
        const new_todo_result = await new_todo.save()
        console.log(new_todo_result)
        result.status = true;
        result.message = "Todo added successfuly!";
        result.payload = new_todo_result;
    }
    catch(error){
        result.status = false;
        result.message = "Failed to add new todo!";
    }

    return result;
}

async function listTodo():Promise<serviceReturn>{

    let result: serviceReturn = {}
    try{
        const todo_list = await Todo.find();
        result.status  = true;
        result.message = "Todo list getted successfuly!";
        result.payload = todo_list;
    }
    catch(error){
        result.status  = false;
        result.message = "Failed to get todo list!";
    }

    return result;
}

async function deleteTodo(id):Promise<serviceReturn>{

    let result: serviceReturn = {}
    try{
        const delete_todo_result = await Todo.deleteOne({_id:id});
        result.status  = true;
        result.message = "Todo deleted successfuly!";
    }
    catch(error){
        result.status  = false;
        result.message = "Failed to delete todo!";
    }

    return result;
}

export default {addTodo,listTodo,deleteTodo};
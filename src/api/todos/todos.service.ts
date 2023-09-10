import Todo from "./todos.model";
import { serviceReturn } from "../../types/serviceReturn.type";
import { TodoType } from "../../types/todo.type";

async function addTodo(user_id:string,todo:string):Promise<serviceReturn>{

    let result: serviceReturn = {};
    try{
        const user_todos = await Todo.findOne({user_id:user_id})
        let result_todos = null
        let new_todo:TodoType = {context:todo}
        if(user_todos === null){
            const initialize_todo_list = new Todo({user_id:user_id,todos:[new_todo]})
            result_todos = await initialize_todo_list.save()
        }
        else{
            result_todos = await Todo.findOneAndUpdate({user_id:user_id}, {todos:[...user_todos.todos,new_todo]},{new: true});
        }
        result.status  = true;
        result.message = "Todo added successfuly!";
        result.payload = result_todos.todos || [];
    }
    catch(error){
        console.log(error)
        result.status = false;
        result.message = "Failed to add new todo!";
    }

    return result;
}

async function listTodo(user_id:string):Promise<serviceReturn>{

    let result: serviceReturn = {};
    try{
        const todo_list = await Todo.findOne({user_id:user_id});
        result.status  = true;
        result.message = "Todo list getted successfuly!";
        result.payload = todo_list || [];
    }
    catch(error){
        result.status  = false;
        result.message = "Failed to get todo list!";
    }

    return result;
}

async function deleteTodo(user_id:string,todo_id:string):Promise<serviceReturn>{

    let result: serviceReturn = {};
    try{
        const user_todos = await Todo.findOne({user_id:user_id})
        let result_todos = []
        if(user_todos !== null){
            var filtered_todos = user_todos.todos.filter(item => item._id.valueOf() !== todo_id)
            if(filtered_todos.length === 0 || filtered_todos.length === user_todos.todos.length){
                result.status  = false;
                result.message = "Todo not found!";
                result.payload = user_todos;
            }
            else if(filtered_todos.length > 0){
                result_todos = await Todo.findOneAndUpdate({user_id:user_id}, {todos:filtered_todos},{new: true});
                result.status  = true;
                result.message = "Todo deleted successfuly!";
                result.payload = result_todos;
            }
        }
        else{
            result.status = false;
            result.message = "User has not any todos";
            result.payload = []
        }
    }
    catch(error){
        result.status  = false;
        result.message = "Failed to delete todo!";
    }

    return result;
}

export default {addTodo,listTodo,deleteTodo};
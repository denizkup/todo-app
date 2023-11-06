import Todo from "./todos.model";
import { serviceReturn } from "../../types/serviceReturn.type";
import { TodoType } from "../../types/todo.type";

async function addTodo(user_id:string,todo:string):Promise<serviceReturn>{

    let result: serviceReturn = {};
    try{
        const user_todos = await Todo.findOne({user_id:user_id});
        let result_todos = null;
        let new_todo:TodoType = {context:todo,completed:false};
        if(user_todos === null){
            const initialize_todo_list = new Todo({user_id:user_id,todos:[new_todo]});
            result_todos = await initialize_todo_list.save();
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

async function updateTodo(user_id:string,updated_todo:TodoType):Promise<serviceReturn> {
    let result: serviceReturn = {};
    try{
        const user_todos = await Todo.findOne({user_id:user_id});
        let updated_todos = user_todos
        if(user_todos !== null){
            user_todos.todos.forEach(todo => {
                if(todo._id.valueOf() === updated_todo._id){
                    todo.context = updated_todo.context;
                    todo.completed = updated_todo.completed
                }
            });

            let update_todos = await Todo.findOneAndUpdate({user_id:user_id}, {todos:[...user_todos.todos]},{new: true});
            result.status  = true;
            result.message = "Todo updated successfuly!";
            result.payload = updated_todos.todos || [];
        }
        else{
            result.status  = false;
            result.message = "Todos not found";
        }
    }
    catch(error){
        result.status = false;
        result.message = "Failed to update todo!"
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
        const user_todos = await Todo.findOne({user_id:user_id});
        let result_todos = []
        if(user_todos !== null){
            let filtered_todos = user_todos.todos.filter(item => item._id.valueOf() !== todo_id);
            if(user_todos.todos.length === 0){
                result.status  = false;
                result.message = "Todo not found!";
                result.payload = user_todos;
            }
            else if(filtered_todos.length >= 0){
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

export default {addTodo,updateTodo,listTodo,deleteTodo};
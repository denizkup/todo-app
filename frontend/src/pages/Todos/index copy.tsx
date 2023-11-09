import React,{useEffect, useState,useLayoutEffect,useRef} from 'react';
import { getTodoListService,deleteTodoService,addTodoService,updateTodoService } from '../../services/todo.service';
import { TodoType } from '../../types/todo.type';
import {MdDelete} from 'react-icons/md';
import { Switch } from "@material-tailwind/react";


const MIN_TEXTAREA_HEIGHT = 16  ;

const Todos = () => {
    const [todos,setTodos]             = useState<Array<TodoType>>([])
    const [newTodo,setNewTodo]         = useState<string>("")
    const [updatedTodo,setUpdatedTodo] = useState<TodoType | null>(null);
    const [hideCompleted,setHideCompleted] = useState<boolean>(false);
    const textareaRef                  = useRef<HTMLTextAreaElement>(null);

    useLayoutEffect(() => {
        if (textareaRef.current != null) {
            // Reset height - important to shrink on delete
            textareaRef.current.style.height = "inherit";
            // Set height
            textareaRef.current.style.height = `${Math.max(
                                                textareaRef.current.scrollHeight,
                                                MIN_TEXTAREA_HEIGHT
                                                )}px`;
        }

       
      }, [newTodo]);

    useEffect(()=>{
        const fetchTodos = async () => {
            const result = await getTodoListService();
            if(result.status && result.payload.todos){
                setTodos(result.payload.todos)
            }
        }
        fetchTodos()
    },[])


    async function deleteTodoHandler(todo_id:string) {
        const delete_result = await deleteTodoService(todo_id)
        if(delete_result && delete_result.status){
            setTodos(delete_result.payload.todos)
        }
    }

    async function addTodoHandler(todo_context:string) {
        if(todo_context.length > 0){
            const add_result = await addTodoService(todo_context)
            if(add_result && add_result.status){
                setTodos(add_result.payload)
                setNewTodo("")
            }
        }    
    }

    function onTodoAddSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        addTodoHandler(newTodo);
    }
    
    function updateTodoHandler(e: React.ChangeEvent<HTMLInputElement>){
        e.preventDefault();
        const target = e.target as HTMLInputElement;
        const updated_todos = todos.map(todo => {
            if (todo._id === target.id) {
              setUpdatedTodo(prevState => ({...prevState,_id:target.id,context:target.value,completed:todo.completed}));
              return {...todo, context: target.value};
            }
            return todo;
          });
        setTodos(updated_todos);

    }

    async function onTodoUpdateSubmit(e: React.FormEvent<HTMLFormElement>){
        // e.preventDefault()
        document.activeElement.blur();
        if(updatedTodo){
            const update_result = await updateTodoService(updatedTodo)
            if(update_result && update_result.status){
                setTodos(update_result.payload)
                setUpdatedTodo(null);
            }
        }
    }

    async function completeTodoHandler(e: React.FormEvent<HTMLInputElement>){
        let updated_todo = null
        const target = e.target as HTMLInputElement;
        const updated_todos = todos.map(todo => {
            if (todo._id === target.id) {
                updated_todo = {...todo}
                updated_todo.completed = target.checked
                return updated_todo
            }
            return todo;
          });
        setTodos(updated_todos);


        if(updated_todo){
            const update_result = await updateTodoService(updated_todo)
                if(update_result && update_result.status){
                    setTodos(update_result.payload)
                    setUpdatedTodo(null);
                }
        }
    
    }


    return(
        <div className='flex items-start justify-center h-screen'>
            <div className='w-1/2 mt-10'>
                <Switch  color="red" label="Hide completed todos" onChange={() => setHideCompleted(current => !current)} crossOrigin={undefined} ></Switch>
                <p className='text-3xl text-center text-black'> Todos </p>
                {todos.map((todo) => {
                    if(!todo.completed  || (!hideCompleted && todo.completed)){
                        return(
                            <div key={todo._id} className="group flex items-center justify-start space-x-2 p-3 m-3 w-auto">
             
                                        <input type="checkbox" className='text-white' checked={todo.completed} id={todo._id}  onChange={completeTodoHandler}/>
                                        <input type="text" className={` focus:outline-none text-black w-full ${todo.completed ? 'line-through' : ''}`}  
                                                id={todo._id} value={todo.context} onChange={updateTodoHandler} onBlur={onTodoUpdateSubmit}  
                                                onKeyDown={(e) => {if (e.key === "Enter") onTodoUpdateSubmit()}}/>
                        
                                <button className="hidden group-hover:block text-black font-bold" onClick={() =>deleteTodoHandler(todo._id) }><MdDelete/></button>
                            </div>
                        )
                    }
                })}
                <div >
                    <textarea
                        className="text-black w-full resize-none overflow-hidden no-scrollbar bg-transparent focus:outline-none"
                        value={newTodo}
                        placeholder='Add new todo'
                        onChange={(e) => setNewTodo(e.target.value)}
                        onKeyDown={(e) => {if (e.key === "Enter") onTodoAddSubmit(e)}}
                        ref={textareaRef}
                    />

                </div>

            </div>

        </div>
    )
}

export default Todos;
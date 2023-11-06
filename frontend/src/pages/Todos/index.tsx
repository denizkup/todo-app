import React,{useEffect, useState,useLayoutEffect,useRef} from 'react';
import { getTodoListService,deleteTodoService,addTodoService,updateTodoService } from '../../services/todo.service';
import { TodoType } from '../../types/todo.type';
import {MdDelete} from 'react-icons/md';


const MIN_TEXTAREA_HEIGHT = 16  ;

const Todos = () => {
    const [todos,setTodos] = useState<Array<TodoType>>([])
    const [newTodo,setNewTodo] = useState<string>("")
    const [updatedTodo,setUpdatedTodo] = useState<TodoType | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

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
    
    function updateTodoHandler(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        const updated_todos = todos.map(todo => {
            if (todo._id === e.target.id) {
              setUpdatedTodo(prevState => ({...prevState,_id:e.target.id,context:e.target.value,completed:todo.completed}));
              return {...todo, context: e.target.value};
            }
            return todo;
          });
        setTodos(updated_todos);

    }

    async function onTodoUpdateSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(updatedTodo){
            const update_result = await updateTodoService(updatedTodo)
            if(update_result && update_result.status){
                setTodos(update_result.payload)
                setUpdatedTodo(null);
            }
        }
    }


    async function completeTodoHandler(e: React.FormEvent<HTMLFormElement>){
        let updated_todo = null
        const updated_todos = todos.map(todo => {
            if (todo._id === e.target.id) {
                updated_todo = {...todo}
                updated_todo.completed = e.target.checked
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
        <div className='flex items-start justify-center h-screen bg-slate-200'>
            <div className='w-1/2 mt-10'>
                <p className='text-3xl text-center text-black'> Todos </p>
                    {todos.map((todo) => {
                        {console.log(todo)}
                        return(
                            <div key={todo._id} className="group flex items-center justify-between p-3 m-3 hover:bg-slate-300">
                                <form onSubmit={onTodoUpdateSubmit}>
                                    <div className='flex items-center justify-center space-x-2 '>
                                        <input type="checkbox" className='text-white' checked={todo.completed} id={todo._id}  onChange={completeTodoHandler}/>
                                        <input type="text" className={`bg-slate-200 focus:outline-none text-black resize-none overflow-y-hidden no-scrollbar ${todo.completed ? 'line-through' : ''}`}  id={todo._id} value={todo.context} onChange={(e) => updateTodoHandler(e)} onBlur={onTodoUpdateSubmit}/>
                                    </div>
                                </form>
                        
                                <button className="hidden group-hover:block text-black font-bold" onClick={() =>deleteTodoHandler(todo._id) }><MdDelete/></button>
                            </div>
                        )
                    })}
                <form className='text-center' onSubmit={onTodoAddSubmit}>
                    <div >
                        <textarea
                            className="border-red text-black w-full resize-none overflow-hidden no-scrollbar bg-transparent"
                            value={newTodo}
                            placeholder='Add new todo'
                            onChange={(e) => setNewTodo(e.target.value)}
                            ref={textareaRef}
                        />

                    </div>
                    <button type="submit" className="text-black bg-teal-500 hover:bg-teal-600 py-1 px-1 rounded">Add</button>
                </form>

            </div>

        </div>
    )
}

export default Todos;
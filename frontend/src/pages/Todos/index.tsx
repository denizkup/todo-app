import React,{useEffect, useState,useLayoutEffect,useRef} from 'react';
import { getTodoListService,deleteTodoService,addTodoService,updateTodoService } from '../../services/todo.service';
import { TodoType } from '../../types/todo.type';
import {MdDelete,MdLogout,MdSync,MdSyncProblem} from 'react-icons/md';
import {useAuth} from "../../hooks/auth.hook"
import { useNavigate } from 'react-router-dom';

const MIN_TEXTAREA_HEIGHT = 16  ;

const Todos = () => {
    const [todos,setTodos]             = useState<Array<TodoType>>([])
    const [newTodo,setNewTodo]         = useState<string>("")
    const [updatedTodo,setUpdatedTodo] = useState<TodoType | null>(null);
    const [hideCompleted,setHideCompleted] = useState<boolean>(false);
    const textareaRef                  = useRef<HTMLTextAreaElement>(null);
    const {verify,logout}              = useAuth();
    const navigate                     = useNavigate();
    const [sync,setSync]               = useState({active:false,status:true});
    const toggleClass = " transform translate-x-5";

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
        verify()
            .then((result) => {
                if(result === false){
                    navigate("/login")
                }
                else{
                    fetchTodos()
                }
            })
            .catch((error) => {

            })
     
    },[])


    async function signOut(){
        try{
            const signout_result = await logout()
            if(signout_result) navigate("/login")

        }
        catch(error){

        }
    }

    async function deleteTodoHandler(todo_id:string) {
        setSync((prevState) => ({...prevState,active:true}));
        try{
            const delete_result = await deleteTodoService(todo_id)
            if(delete_result && delete_result.status){
                setTodos(delete_result.payload.todos)
                setTimeout(() => setSync((prevState) => ({...prevState,active:false,status:true})),300)
            }
            else{
                setTimeout(() => setSync((prevState) => ({...prevState,active:false,status:false})),300)

            }
        }
        catch(error){
            setTimeout(() => setSync((prevState) => ({...prevState,active:false,status:false})),300)
        }

    }

    async function addTodoHandler(todo_context:string) {
        if(todo_context.length > 0){
            setSync((prevState) => ({...prevState,active:true}));
            try{
                const add_result = await addTodoService(todo_context)
                if(add_result && add_result.status){
                    setTimeout(() => setSync((prevState) => ({...prevState,active:false,status:true})),300)
                    setTodos(add_result.payload)
                    setNewTodo("")
                }
                else{
                    setTimeout(() => setSync((prevState) => ({...prevState,active:false,status:false})),300)
                }
            }
            catch(error){
                setTimeout(() => setSync((prevState) => ({...prevState,active:false,status:false})),300)
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
            setSync((prevState) => ({...prevState,active:true}));
            try{
                const update_result = await updateTodoService(updated_todo)
                console.log("update_result ",update_result)
                if(update_result && update_result.status){
                    setTodos(update_result.payload)
                    setUpdatedTodo(null);
                    setTimeout(() => setSync((prevState) => ({...prevState,active:false,status:true})),300)
    
                }
                else{
                    setTimeout(() => setSync((prevState) => ({...prevState,active:false,status:false})),300)
    
                }
            }
            catch(error){
                setTimeout(() => setSync((prevState) => ({...prevState,active:false,status:false})),300)

            }
        }
    
    }

    return(
        <div className='flex items-start justify-center h-screen bg-slate-100 dark:bg-slate-900 '>
            <div className='w-1/2 h-screen mt-10 border border-slate-200 rounded-lg shadow p-5 dark:border-slate-800'>
                <div className='flex items-center justify-between space-x-1'>
                    <div className='flex space-x-1'>
                        <div className={"w-12 h-6 flex items-center rounded-full p-1 cursor-pointer" + (!hideCompleted ? ' bg-slate-600 dark:bg-slate-100' : ' bg-primary-light dark:bg-primary-dark')}
                                onClick={() => {
                                    setHideCompleted(current => !current)
                                    
                                }}>
                            <div className={"bg-slate-100 dark:bg-slate-800 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" + (!hideCompleted ? 'null' : toggleClass)}/>
                        </div>
                        <p className='text-slate-900 dark:text-slate-100 text-sm'>Hide completed stupid todos</p>

                    </div>
                    <div className='flex items-center justify-center space-x-5'>
                        <div className='flex flex-col items-center justify-center'>
                            <a id="sync" className={sync.active ? "animate-spin text-slate-100" : "text-slate-700"} >
                                {sync.status ? 
                                    <MdSync className="w-6 h-6"/>
                                    :
                                    <MdSyncProblem className="text-red-500 w-6 h-6"/>
                                }
                            </a>
                        </div>

                        <button className='text-slate-900 dark:text-slate-100' onClick={() => signOut() }><MdLogout className="w-8 h-8" /></button>


                    </div>
                </div>
                <p className='text-3xl text-center text-black dark:text-slate-100'> Stupid Todos </p>

                
        
                {todos.map((todo) => {
                    if(!todo.completed  || (!hideCompleted && todo.completed)){
                        return(
                            <div key={todo._id} className="group flex items-center space-x-2 p-3 m-3 w-auto">
                                <div className=" flex justify-center items-center">
                                    <input type="checkbox" className="appearance-none border-2 rounded-md  w-6 h-6 border-teal-500  checked:bg-teal-500 dark:border-teal-700 dark:checked:bg-teal-700"
                                            checked={todo.completed} id={todo._id}  onChange={completeTodoHandler}  />
                                    <svg className="fill-current hidden w-4 h-4 text-white pointer-events-none absolute" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                                </div>

                                <input type="text" className={` focus:outline-none text-black w-full ${todo.completed ? 'line-through' : ''} bg-transparent  text-slate-900 dark:text-slate-100 sm:text-sm rounded-lg block w-full p-2.5` }  
                                        id={todo._id} value={todo.context} onChange={updateTodoHandler} onBlur={onTodoUpdateSubmit}  
                                        disabled={todo.completed}
                                        onKeyDown={(e) => {if (e.key === "Enter") onTodoUpdateSubmit(e)}}/>

                                <button className="hidden group-hover:block text-secondary-light dark:text-secondary-dark" onClick={() =>deleteTodoHandler(todo._id) }>
                                    <MdDelete className="w-6 h-6 "/>
                                </button>
                            </div>
                        )
                    }
                })}
                <div >
                    <textarea
                        className="text-slate-900 dark:text-slate-100 w-full resize-none overflow-hidden no-scrollbar bg-transparent focus:outline-none text-center mt-5 caret-slate-100"
                        value={newTodo}
                        placeholder='Add new stupid todo '
                        onChange={(e) => setNewTodo(e.target.value)}
                        onKeyDown={(e) => {if (e.key === "Enter") onTodoAddSubmit(e)}}
                        ref={textareaRef}
                        disabled={sync.active}
                    />

                </div>

            </div>

        </div>
    )
}

export default Todos;
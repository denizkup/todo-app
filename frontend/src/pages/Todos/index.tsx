import React,{useEffect, useState,useLayoutEffect,useRef} from 'react';
import { TodoType } from '../../types/todo.type';
import {useAuth} from "../../hooks/auth.hook"
import {MdDelete,MdSync,MdSyncProblem} from 'react-icons/md';
import { getTodoListService,deleteTodoService,addTodoService,updateTodoService } from '../../services/todo.service';

const MIN_TEXTAREA_HEIGHT = 16  ;

const Todos = () => {
    const [todos,setTodos]             = useState<Array<TodoType>>([])
    const [newTodo,setNewTodo]         = useState<string>("")
    const [updatedTodo,setUpdatedTodo] = useState<TodoType | null>(null);
    const [hideCompleted,setHideCompleted] = useState<boolean>(false);
    const textareaRef                  = useRef<HTMLTextAreaElement>(null);
    const {logout}                     = useAuth();
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

    async function fetchTodos() {
        setSync((prevState) => ({...prevState,active:true}));

        try{
            const result = await getTodoListService();
            if(result.status && result.payload.todos){
                setTodos(result.payload.todos)
                setTimeout(() => setSync((prevState) => ({...prevState,active:false,status:true})),300)
            }
            else{
                setTimeout(() => setSync((prevState) => ({...prevState,active:false,status:true})),300)

            }
        }
        catch(error){
            if(error?.response?.status === 401){
                logout()
            }
            setTimeout(() => setSync((prevState) => ({...prevState,active:false,status:true})),300)
        }  
    }

    useEffect(()=>{
        fetchTodos() 
    },[])

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
        document.activeElement.blur();
        if(updatedTodo){
            setSync((prevState) => ({...prevState,active:true}));
            try{
                const update_result = await updateTodoService(updatedTodo)
                if(update_result && update_result.status){
                    setTimeout(() => setSync((prevState) => ({...prevState,active:false,status:true})),300)
                    setTodos(update_result.payload)
                    setUpdatedTodo(null);
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
            <>                  
                <p className='text-5xl xs:text-3xl text-center text-primary-text dark:text-primary-textDark'> Todos </p>
                <div className='flex flex-row items-center justify-between'>
                    <div className='flex flex-row items-center space-x-1 mb-4 mt-4'>
                        <div className={"w-12 h-6 flex items-center rounded-full p-1 cursor-pointer" + (!hideCompleted ? ' bg-background-dark dark:bg-background' : ' bg-primary dark:bg-primary-dark')}
                                onClick={() => {
                                    setHideCompleted(current => !current)
                                }}>
                            <div className={"bg-background dark:bg-background-dark h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" + (!hideCompleted ? 'null' : toggleClass)}/>
                        </div>
                        <p className='text-primary-text dark:text-primary-textDark text-xs font-light'>Hide completed todos</p>

                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        {sync.status ? 
                            <button disabled={sync.active} onClick={() => fetchTodos()} className={sync.active ? "animate-spin text-slate-700 dark:text-slate-100" : "text-slate-700 dark:text-slate-100"}>
                                <MdSync className="xs:w-6 xs:h-6 md:w-7 md:h-7"/>
                            </button>
                            :
                            <MdSyncProblem className="text-secondary dark:text-secondary-dark xs:w-6 xs:h-6 md:w-7 md:h-7"/>
                        }
                    </div>
                </div>
                <div >
                    <textarea
                        className="text-slate-900 dark:text-slate-100 w-full resize-none overflow-hidden no-scrollbar bg-transparent focus:outline-none text-center mt-5 
                        caret-slate-900 dark:caret-slate-100"
                        value={newTodo}
                        placeholder='Add a new one ... '
                        onChange={(e) => setNewTodo(e.target.value)}
                        onKeyDown={(e) => {if (e.key === "Enter") onTodoAddSubmit(e)}}
                        ref={textareaRef}
                        disabled={sync.active}
                    />

                </div>

                {todos.map((todo) => {
                    if(!todo.completed  || (!hideCompleted && todo.completed)){
                        return(
                            <div key={todo._id} className="group grid grid-cols-12 items-center">
                                <div className="col-start-1 col-end-2 ">
                                    <div className="flex justify-center items-center"> 
                                        <input type="checkbox" className="appearance-none border-2 rounded-md  w-6 h-6 border-primary checked:bg-primary dark:border-primary-dark dark:checked:bg-primary-dark"
                                                checked={todo.completed} id={todo._id}  onChange={completeTodoHandler}  />
                                        <svg className="fill-current hidden w-4 h-4 text-primary-text dark:text-primary-textDark pointer-events-none absolute" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                                    </div>
                                </div>
                                <div className='col-start-2 col-end-12 '>
                                    <input type="text" className={`focus:outline-none w-full ${todo.completed ? 'line-through' : ''} bg-transparent  text-primary-text dark:text-primary-textDark xs:text-sm rounded-lg block w-full p-6` }  
                                            id={todo._id} value={todo.context} onChange={updateTodoHandler} onBlur={onTodoUpdateSubmit}  
                                            disabled={todo.completed}
                                            onKeyDown={(e) => {if (e.key === "Enter") onTodoUpdateSubmit(e)}}/>

                                </div>
                                <div className='col-start-12 col-end-12'>
                                    <button className="invisible group-hover:visible text-secondary dark:text-secondary-dark" onClick={() =>deleteTodoHandler(todo._id) }>
                                        <MdDelete className="xs:w-5 xs:h-5 w-6 h-6 "/>
                                    </button>
                                </div>
                            </div>
                        )
                    }
                })}
          

            </>

    )
}

export default Todos;
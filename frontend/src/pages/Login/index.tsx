import {useEffect,useState} from 'react';
import {useAuth} from "../../hooks/auth.hook"
import { useNavigate } from 'react-router-dom';
import { UserCredentials } from '../../services/auth.service';


const Login = () => {
  const { authData,login,verify} = useAuth();
  const [loading,setLoading]   = useState(false);
  const [userdata,setUserdata] = useState({username:"",password:""} as UserCredentials)
  const [error,setError]       = useState(false)
  const [success,setSuccess]   = useState(false)
  const navigate               = useNavigate();

  useEffect(() => {
    if(authData.status){
      authData.auth_level === "ADMIN" ? navigate("/users") : navigate('/')
    }
    else{
      verify()
        .then((result) => {
          if(result){
            authData.auth_level === "ADMIN" ? navigate("/users") : navigate('/')
          }
          else{
            setLoading(false)
          }
        })
        .catch((error)=> {
        })
  }
},[])

  async function loginSubmit(e) {
    e.preventDefault()
    await login({ username:userdata.username, password:userdata.password } as UserCredentials)
        .then((result) => {
            if(result?.status){
              setSuccess(true)
              if(result.auth_level === "ADMIN"){
                setTimeout(() => navigate('/users'), 1500);
              }
              else if(result.auth_level === "USER"){
                setTimeout(() => navigate('/'), 1500);

              }

            }
            else{
              setError(true)
              setUserdata((prevState) => ({...prevState,password:""}))
            }

        })
        .catch((error) => {

        })
  }

  if(!loading){
    return(
      <section className='bg-background dark:bg-background-dark'>
        <div className='flex flex-col items-center md:justify-center lg:justify-start lg:py-20 px-6 py-8 space-y-6 mx-auto h-screen'>
          <p className='text-3xl  font-semibold text-primary-text dark:text-primary-textDark mb-3 text-center'> Welcome To Another Stupid Todo App</p>
          <div className='w-full bg-foreground rounded-lg shadow-xl  dark:bg-foreground-dark lg:w-1/2 xl:w-1/3'>
            <div className='p-6 space-y-4  md:space-y-6 sm:p-8'>
              <h1 className="text-2xl font-semibold leading-tight tracking-tight text-primary-text  dark:text-primary-textDark text-center">
                Sign in to your stupid account</h1>
              <form className='space-y-4 md:space-y-6' onSubmit={loginSubmit}>
                <div>
                  <label htmlFor="username" className='block mb-2 text-sm font-medium text-primary-text dark:text-primary-textDark'>Your stupid username</label>
                  <input type="text" name="userame" id="username"
                         className='bg-slate-50 border border-slate-300 text-slate-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-slate-100 dark:border-slate-600'
                         onChange={(e) => setUserdata((prevState) =>({...prevState,username:e.target.value}))}
                         onFocus={() => setError(false)}
                         value={userdata.username}
                  />
                </div>
                <div>
                  <label htmlFor='password' className='block mb-2 text-sm font-medium text-slate-900 dark:text-slate-300'>Your stupid password</label>
                  <input type="password" name="password" id='password'
                         className='bg-slate-50 border border-slate-300 text-slate-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-slate-100 dark:border-slate-600'
                         onChange={(e) => setUserdata((prevState) =>({...prevState,password:e.target.value}))}
                         onFocus={() => setError(false)}
                         value={userdata.password}


                  />
                </div>
                <div>
                  {error &&
                    <p className='flex items-center justify-center text-center text-slate-100 dark:text-slate-300 bg-red-800 rounded-lg mb-2  py-2.5'> Wrong username or password!</p>
                  }
                  {success && !error && 
                    <p className='flex items-center justify-center text-center text-slate-100 dark:text-slate-50 bg-primary dark:bg-primary-dark rounded-lg mb-2  py-2.5'> Login is successful!</p>
                  }
                  <button type="submit" disabled={error || success} className='w-full text-slate-100 bg-teal-500 disabled:bg-slate-400 dark:disabled:bg-slate-700 hover:bg-teal-600 dark:bg-primary-dark rounded-lg px-5 py-2.5 text-center'>
                    Sign In
                  </button>
                  
                
                </div>
              </form>
  
            </div>
  
          </div>
        </div>
      </section>
    )
  }
  else{
    <></>
  }
}




export default Login;
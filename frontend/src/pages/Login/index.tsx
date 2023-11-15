import {useEffect,useState} from 'react';
import {useAuth} from "../../hooks/auth.hook"
import { useNavigate } from 'react-router-dom';
import { UserCredentials } from '../../services/auth.service';
import Input from '../../components/input';
import { useForm } from "react-hook-form";
import Button from '../../components/button';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MdCheckCircleOutline, MdLogin,MdOutlineChangeCircle,MdWarningAmber } from 'react-icons/md';

import { loginResultType } from '../../types/loginResult.type';

const formSchema = Yup.object().shape({
  username:Yup.string()
  .required("Username is required"),

  password: Yup.string()
  .required("Password is required")
})

const Login = () => {
  const { authData,login,verify}     = useAuth();
  const navigate                     = useNavigate();
  const [loginStatus,setLoginStatus] = useState<loginResultType>({success:false,error:false,message:""})


  const { register, 
          handleSubmit, 
          formState: { errors,isSubmitting}} = useForm({ mode: "all",
                                                         resolver: yupResolver(formSchema)});

  useEffect(() => {
    if(authData.status){
      authData.auth_level === "ADMIN" ? navigate("/users") : navigate('/')
    }
    else if(!authData.logged_out){
      verify()
        .then((result) => {
          if(result){
            authData.auth_level === "ADMIN" ? navigate("/users") : navigate('/')
          }
        })
        .catch((error)=> {
        })
  }
},[])


  const onSubmit = async (data:UserCredentials) => {

    try{
      const login_result = await login(data)
      if(login_result?.status){
        setLoginStatus(prevState => ({...prevState,success:true,error:false,message:login_result.message}))

        if(login_result.auth_level === "ADMIN"){
          setTimeout(() => navigate('/users'), 500);
        }
        else if(login_result.auth_level === "USER"){
          setTimeout(() => navigate('/'), 500);

        }
      }
      else{
        setLoginStatus(prevState => ({...prevState,success:false,error:true,message:login_result?.message}))
      }

    }
    catch(error){
      setLoginStatus(prevState => ({...prevState,success:false,error:true,message:"System Error"}))
    }
  };

  return(
    <section className='bg-background dark:bg-background-dark'>
      <div className='flex flex-col items-center md:justify-center lg:justify-start lg:py-20 px-6 py-8 space-y-6 mx-auto h-screen'>
        <p className='text-3xl  font-semibold text-primary-text dark:text-primary-textDark mb-3'> Welcome To Another Stupid Todo App</p>
        <div className='bg-foreground rounded-xl shadow-xl  dark:bg-foreground-dark lg:w-1/2 xl:w-1/3'>
          <div className='flex flex-col p-6 space-y-4 md:space-y-6 sm:p-8 bg-red-'>
            <h1 className="text-2xl font-semibold leading-tight tracking-tight text-primary-text  dark:text-primary-textDark mb-5">
              Sign in to your stupid account
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col space-y-8">
                <Input name="username" label="Username" type="text" errors={errors} register={register} />
                <Input name="password" label="Password" type="password" errors={errors} register={register}/>
                <div className='flex flex-col items-center space-y-4'>
                  {loginStatus.error && !isSubmitting &&
                    <div className="grid grid-cols-12 gap-4 items-center justify-center w-1/2 bg-secondary dark:bg-secondary-dark mb-2 py-3 px-4 rounded-xl">
                      <div className="ml-1 col-start-1 col-end-2 "> 
                        <MdWarningAmber className="w-6 h-6"/>
                      </div>
                      <div className="col-start-2 col-end-12 text-center">{loginStatus.message}</div>

                    </div>
                  }
                
                  <Button type="submit"  disabled={isSubmitting} className='w-1/3'>
                    <div className="grid grid-cols-12 gap-4 items-center justify-center">
                      <div className="ml-1 col-start-1 col-end-2"> 
                        {isSubmitting 
                          ? 
                            <MdOutlineChangeCircle className="animate-spin w-6 h-6"/>
                          : 
                            loginStatus.success 
                              ? 
                              <MdCheckCircleOutline className="w-6 h-6"/> 
                              : 
                              <MdLogin className="w-6 h-6"/>
                        }
                        
                      </div>
                      <div className="col-start-2 col-end-12">Signin</div>
                    </div>
                  </Button>

                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}


export default Login;
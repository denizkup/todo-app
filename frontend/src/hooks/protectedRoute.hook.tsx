import {Outlet,Navigate} from 'react-router-dom';
import { useAuth } from './auth.hook';
import { useEffect,useState} from 'react';
import Loading from '../pages/Loading';

type allowedAuthLevelType = {
    auth_level:"USER" | "ADMIN"
}

export function ProtectedRoutes(allowed_auth_level:allowedAuthLevelType){
    const {verify,authData}  = useAuth();
    const [loading,setLoading] = useState(true)
    useEffect( ()=>{
        verify()
            .then((res) => {
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
            })
      }
    ,[])
    if(!loading){
        if(authData.status === true && allowed_auth_level.auth_level === authData.auth_level){
            return <Outlet/>
        }
        else{
            return <Navigate to="/signin" />
        }
    }
    return <Loading/>
}
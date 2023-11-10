import {Outlet,Navigate} from 'react-router-dom';
import { useAuth } from './auth.hook';
import { useEffect,useState} from 'react';
import Loading from '../pages/Loading';

export function ProtectedRoutes(){
    const {verify,authed}  = useAuth();
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
        return authed ? <Outlet/> : <Navigate to="/login" />
    }
    return <Loading/>
}
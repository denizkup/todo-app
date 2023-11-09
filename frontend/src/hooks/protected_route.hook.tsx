import {Outlet,Navigate} from 'react-router-dom';


export function ProtectedRoutes(){
    const authorized = true;

    return authorized ? <Outlet/> : <Navigate to="/login" />
}
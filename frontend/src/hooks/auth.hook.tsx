import { createContext,useContext,useMemo,useState,PropsWithChildren} from "react";

// import { useNavigate } from "react-router-dom";

import { verifyUser } from "../services/auth.service";
import { UserCredentials,loginUser,logoutUser} from "../services/auth.service";

interface IUserContext{
    authed:boolean | any,
    login:(user:UserCredentials) =>  Promise<void | boolean>;
    verify:() =>  Promise<void | boolean>;
    logout:() =>  Promise<void | boolean>;


}
const UserContext = createContext<IUserContext>({authed:null,verify:async () => {},login:async () => {},logout:async () => {}});


export const UserProvider= ({ children }: PropsWithChildren<{}>) => {
    const [authed,setAuthed] = useState(false);


    async function login(user:UserCredentials) {
        try{
            const login_result = await loginUser(user)
            if(login_result.status){
                setAuthed(true);
                return true;
            }
            else{
                setAuthed(false);
                return false;
            }
        }
        catch(error){
            setAuthed(false);
            return false;
        }
        
    }

    async function verify() {
        try{
            const verified = await verifyUser()
            if(verified){
                setAuthed(true);
                return verified
            }
            else{
                setAuthed(false);
                return false;
                
            }
        }
        catch(error){
            setAuthed(false)
            throw(error)
        }
        
    }

    async function logout(){
        try{
            const logout_result = await logoutUser()
            setAuthed(false)
            return true
        }
        catch(error){
            throw(error)
        }
    }

    const context_value = useMemo(
        ()=> ({
            authed,
            verify,
            login,
            logout
        }),
        [authed]
    );

    return(
        <UserContext.Provider value={context_value}>
            {children}
        </UserContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(UserContext);
}

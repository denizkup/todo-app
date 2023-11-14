import { createContext,useContext,useMemo,useState,PropsWithChildren} from "react";

// import { useNavigate } from "react-router-dom";

import { verifyUser } from "../services/auth.service";
import { UserCredentials,loginUser,logoutUser} from "../services/auth.service";
import { authDataType } from "../types/authData.type";

interface IUserContext{
    authData:authDataType | any,
    login:(user:UserCredentials) =>  Promise<void | authDataType>;
    verify:() =>  Promise<void | boolean>;
    logout:() =>  Promise<void | boolean>;


}
const UserContext = createContext<IUserContext>({authData:null,verify:async () => {},login:async () => {},logout:async () => {}});


export const UserProvider= ({ children }: PropsWithChildren<{}>) => {
    const [authData,setAuthData] = useState<authDataType>({status:false,fullname:"",auth_level:""})


    async function login(user:UserCredentials):Promise<authDataType> {
        try{
            const login_result = await loginUser(user)
            if(login_result.status){
                const auth_data = {status:login_result.status,fullname:login_result.payload.user_name+" "+login_result.payload.user_lastname,auth_level:login_result.payload.auth_level}
                setAuthData(auth_data)
                return auth_data;
            }
            else{
                setAuthData({status:false})
                return {status:false};
            }
        }
        catch(error){
            setAuthData({status:false})
            return {status:false};
        }
        
    }

    async function verify() {
        try{
            const verify_result = await verifyUser()
            if(verify_result){
                setAuthData({status:true,fullname:verify_result.name+" "+verify_result.lastname,auth_level:verify_result.auth_level})
            }
            return verify_result
          
        }
        catch(error){
            setAuthData({status:false})
            throw(error)
        }
        
    }

    async function logout(){
        try{
            const logout_result = await logoutUser()
            setAuthData({status:false})
            return logout_result
        }
        catch(error){
            throw(error)
        }
    }

    const context_value = useMemo(
        ()=> ({
            verify,
            login,
            logout,
            authData
        }),
        [authData]
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

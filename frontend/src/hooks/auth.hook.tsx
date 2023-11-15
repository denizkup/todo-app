import { createContext,useContext,useMemo,useState,PropsWithChildren} from "react";
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
                const auth_data = {status:true,
                                   logged_out:false,
                                   message:login_result.message,
                                   fullname:login_result.payload.user_name+" "+login_result.payload.user_lastname,
                                   auth_level:login_result.payload.auth_level
                                }

                setAuthData(auth_data)
                return auth_data;
            }
            else{
                const auth_data = {status:false,
                                   message:login_result.message,
                                }
                setAuthData(auth_data)
                return auth_data;
            }
        }
        catch(error){
            const auth_data = {status:false,message:"Unexpected error!"}
            setAuthData(auth_data)
            return auth_data;
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
            setAuthData({status:false,logged_out:true})
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

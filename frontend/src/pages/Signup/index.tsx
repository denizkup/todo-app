import {useState} from 'react'
import SignupForm from "./signupForm";
import { signupUser } from "../../services/auth.service";
import { useNavigate} from 'react-router-dom';
import { loginResultType } from '../../types/loginResult.type';
import { userDataType } from '../../types/userData.type';
import {MdWarningAmber} from 'react-icons/md'

type signupResultType = loginResultType
const Signup = () => {
    const navigate = useNavigate()
    const [signupStatus,setSignupStatus] = useState<signupResultType>({success:false,error:false,message:""})

    async function signup(userdata:userDataType){
        try{
            const signup_result = await signupUser(userdata)
            console.log("Signup result => ",signup_result)
            if(signup_result.status){
                setSignupStatus(prevState => ({...prevState,success:true}))
                navigate("/signin")
            }
            else{
                setSignupStatus(prevState => ({...prevState,error:true,message:signup_result?.message}))
                return false
            }
        }
        catch(error){
            console.log("Error while signup!")
        }
    }
    return(
        <div className="h-screen bg-background dark:bg-background-dark overflow-auto">
            <div className="flex flex-col items-center xs:justify-center justify-start md:p-20 lg:p-10 h-screen space-y-4">
                <h1 className="text-6xl xs:text-4xl mb-4">Signup</h1>
                {signupStatus.error && 
                    <div className="grid grid-cols-12 gap-4 items-center justify-center w-2/3 bg-secondary dark:bg-secondary-dark mb-2 py-3 px-4 rounded-xl">
                        <div className="ml-1 col-start-1 col-end-2 "> 
                            <MdWarningAmber className="w-6 h-6"/>
                        </div>
                        <div className="col-start-2 col-end-12 text-center">{signupStatus.message}</div>

                    </div>

                }
                <div className="bg-foreground rounded-xl shadow-xl dark:bg-foreground-dark md:w-full lg:w-3/4 xs:w-4/5 p-6">
                    <SignupForm signupHandler={signup}/>
                </div>
            </div>


        </div>
    )
}

export default Signup;
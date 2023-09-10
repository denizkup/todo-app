import Session from "../models/sessions.model"
import { SessionType } from "../types/session.type"

export default class Sesssions {
    sessions:{[session_id:string]:SessionType} = {}

    constructor(){
        this.sessions = {}
    }

    async createSession(session:SessionType):Promise<boolean>{
        let result = false
        try{
            const new_session = new Session({session_id:session.session_id,data:session.session_data})
            await new_session.save()
            result = true
        }
        catch(error){
            console.log("Fail to create session with id:",session.session_id)
            console.log("Error : ",error)
        }
        finally{
            return result
        }
    }

    async deleteSession(session_id:string):Promise<boolean>{
        let result = false
        try{
            await Session.deleteOne({session_id:session_id})
            result = true
        }
        catch(error){
            console.log("Fail to delete session with id:",session_id)
            console.log("Error : ",error)
        }
        finally{
            return result
        }
    }

    async getSession(session_id:string):Promise<any>{
        let result = null
        try{
            const session = await Session.findOne({session_id:session_id});
            if(session !== null){
                result = session.data
            }
        }
        catch(error){
            console.log("Fail to delete session with id:",session_id)
            console.log("Error : ",error)
        }
        finally{
            return result
        }
    }
}
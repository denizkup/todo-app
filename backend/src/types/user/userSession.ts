import {z} from "zod";
import { UserData } from "./userData";

export const UserSessionData = UserData.pick({id:true,email:true,name:true,lastname:true,auth_level:true});
export type UserSessionData = z.infer<typeof UserSessionData>;
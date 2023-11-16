import {z} from "zod";
import { UserData} from "./userData";

export const UserCredentials = UserData.pick({email:true,password:true});
export type UserCredentials = z.infer<typeof UserCredentials>;

 
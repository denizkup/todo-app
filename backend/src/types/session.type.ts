import {z} from "zod";
import { UserSessionData } from "./user/userSession";


export const Session = z.object({
    session_id:z.string().uuid(),
    session_data:UserSessionData
});

export type SessionType = z.infer<typeof Session>;
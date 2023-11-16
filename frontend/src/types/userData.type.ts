import {z} from "zod";

const AUTH_LEVELS = ["ADMIN", "USER"] as const;

export const userDataType= z.object({
    _id        : z.string().optional(),
    email      : z.string({required_error: "EMAIL_REQUIRED"}).email(),
    name       : z.string({required_error: "NAME_REQUIRED"}).min(2).max(255),
    lastname   : z.string({required_error: "LASTNAME_REQUIRED"}).min(2).max(255),
    password   : z.string({required_error: "PASSWORD_REQUIRED"}).min(3).max(255),
    auth_level : z.enum(AUTH_LEVELS)
});

export type userDataType = z.infer<typeof userDataType>;
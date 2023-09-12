import {z} from "zod";

const AUTH_LEVELS = ["ADMIN", "MODERATOR", "USER"] as const;

export const UserData = z.object({
    id         : z.string().optional(),
    email      : z.string({required_error: "EMAIL_REQUIRED"}).email(),
    username   : z.string({required_error: "USERNAME_REQUIRED"}).min(2).max(255),
    name       : z.string({required_error: "NAME_REQUIRED"}).min(2).max(255),
    lastname   : z.string({required_error: "LASTNAME_REQUIRED"}).min(2).max(255),
    password   : z.string({required_error: "PASSWORD_REQUIRED"}).min(3).max(255),
    auth_level : z.enum(AUTH_LEVELS)
});

export type UserData = z.infer<typeof UserData>;
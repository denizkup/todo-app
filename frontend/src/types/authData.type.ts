import {z} from "zod";


export const authDataType = z.object({
    status:z.boolean(),
    logged_out:z.boolean().optional(),
    message:z.string().optional(),
    fullname:z.string().optional(),
    auth_level:z.string().optional(),

});

export type authDataType = z.infer<typeof authDataType>;
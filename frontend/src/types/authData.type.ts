import {z} from "zod";


export const authDataType = z.object({
    status:z.boolean(),
    fullname:z.string().optional(),
    auth_level:z.string().optional(),

});

export type authDataType = z.infer<typeof authDataType>;
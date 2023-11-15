import {z} from "zod";


export const loginResultType = z.object({
    success:z.boolean(),
    error:z.boolean(),
    message:z.string().optional()
});

export type loginResultType = z.infer<typeof loginResultType>;
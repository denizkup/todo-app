import {z} from "zod";

export const serviceReturn = z.object({
    status:z.boolean({required_error: "STATUS_REQUIRED"}),
    message:z.string().optional(),
    payload:z.any().optional()

})

export type serviceReturn = z.infer<typeof serviceReturn>


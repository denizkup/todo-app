import {z} from "zod";

export const Todo = z.object({
    _id:z.string().optional(),
    todo:z.string()
})

export type TodoType = z.infer<typeof Todo>
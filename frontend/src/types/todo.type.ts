import {z} from "zod";


export const TodoType = z.object({
    _id:z.string(),
    context:z.string(),
    completed:z.boolean()
});

export type TodoType = z.infer<typeof TodoType>;
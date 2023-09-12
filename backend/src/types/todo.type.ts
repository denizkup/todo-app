import {z} from "zod";


export const TodoType = z.object({
    id:z.string(),
    context:z.string()
});

export type TodoType = z.infer<typeof TodoType>;
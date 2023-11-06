import {Router} from "express";
import * as todoController from "./todos.controller";
import validateRequest from "../../middlewares/validateRequest.middleware";
import { TodoType } from "../../types/todo.type";
const router:Router = Router();

router.post("/add",
    validateRequest({body:TodoType.omit({_id:true,completed:true})}),
    todoController.addTodo
)

router.put("/update",
    validateRequest({body:TodoType}),
    todoController.updateTodo
)

router.get("/list",
    todoController.listTodo
)

router.delete("/delete/:_id",
    validateRequest({params:TodoType.omit({context:true,completed:true})}),
    todoController.deleteTodo
)

export default router;
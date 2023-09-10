import {Router} from "express";
import * as todoController from "./todos.controller";
import validateRequest from "../../middlewares/validateRequest.middleware";
import { TodoType } from "../../types/todo.type";
const router:Router = Router();

router.post("/add",
    validateRequest({body:TodoType.omit({id:true})}),
    todoController.addTodo
)

router.get("/list",
    todoController.listTodo
)

router.delete("/delete",
    validateRequest({query:TodoType.omit({context:true})}),
    todoController.deleteTodo
)

export default router;
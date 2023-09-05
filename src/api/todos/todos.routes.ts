import {Router} from "express";
import * as todoController from "./todos.controller";

const router = Router();

router.post("/add",
    todoController.addTodo
)

router.get("/list",
    todoController.listTodo
)

router.delete("/delete/:id",
    todoController.deleteTodo
)

export default router;
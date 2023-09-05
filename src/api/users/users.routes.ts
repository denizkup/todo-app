import {Router} from "express";
import * as userController from "./users.controller";

const router = Router();

router.post("/add",
    userController.addUser
)

router.get("/get",
    userController.getUser
)

router.get("/list",
    userController.listUser
)

router.delete("/delete/:id",
    userController.deleteUser
)

export default router;
import {Router} from "express";
import * as userController from "../controllers/user.controller";

const router = Router();

router.post("/add",
    userController.addUser
)

router.get("/get/:username",
    userController.getUser
)

router.get("/list",
    userController.listUser
)

router.delete("/delete/:id",
    userController.deleteUser
)

export default router;
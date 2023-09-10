import {Router} from "express";
import * as userController from "./users.controller";
import validateRequest from "../../middlewares/validateRequest.middleware";
import { UserData } from "../../types/user/userData";

const router:Router = Router();

router.post("/add",
    validateRequest({body:UserData}),
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
import {Router} from "express";
import authenticationController from "../controllers/authentication.controller";
import { UserCredentials } from "../types/user/userCredentials";
import { UserData } from "../types/user/userData";
import validateRequest from "../middlewares/validateRequest.middleware";
const router:Router = Router()

router.post("/signup",
            validateRequest({body:UserData}),
            authenticationController.signup
);

router.post("/signin", 
            validateRequest({body:UserCredentials}),
            authenticationController.signin
);

router.post("/signout",
            authenticationController.signout
);

export default router;
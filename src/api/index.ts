import express from 'express';
import users from './users/users.routes';
import todos from './todos/todos.routes';
import authorize from "../middlewares/authorization.middleware";

const router = express.Router();

router.use('/users', authorize(["ADMIN"]),users);
router.use("/todos",authorize(), todos)

export default router;

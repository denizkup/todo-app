import express from 'express';
import users from './users/users.routes';
import todos from './todos/todos.routes';

const router = express.Router();

router.use('/users', users);
router.use("/todos", todos)

export default router;

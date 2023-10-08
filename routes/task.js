import express from 'express'   
import { createTask ,getMyTask, updateTask,deleteTask } from '../conrollers/task.js';
import {isAuth} from '../middleware/auth.js'

const router = express.Router();

router.post('/new',isAuth,createTask);

router.get('/getMyTask',isAuth,getMyTask);
router.route('/:id').put(isAuth,updateTask).delete(isAuth,deleteTask)

export default router;
import {createTask, displayPending, displayCompleted, deleteTask, updateTask} from '../controller/taskController.js'
import express from 'express'
import { signUpController, authMiddlware, signIn } from "../controller/auth.js"

const router = express.Router();


router.post('/register', signUpController);
router.post('/login', signIn)


router.get('/', authMiddlware ,(req, res) => {
    res.send("Todo api")
})
router.post('/create', authMiddlware, createTask);
router.get('/pending', authMiddlware,  displayPending);
router.get('/completed', authMiddlware, displayCompleted);
router.delete('/delete/:id', deleteTask);
router.put('/update/:id', authMiddlware, updateTask);


export default router;
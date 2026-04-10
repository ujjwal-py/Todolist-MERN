import {createTask, displayPending, displayCompleted, deleteTask, updateTask, getUsername, getUsernameHandler} from '../controller/taskController.js'
import express from 'express'
import { signUpController, authMiddlware, signIn, signInMiddleware, check_user } from "../controller/auth.js"

const router = express.Router();


router.post('/register', signUpController);
router.post('/login', signInMiddleware, signIn)
router.get('/check-user', check_user)
router.get('/get-username', authMiddlware, getUsernameHandler);


router.get('/', authMiddlware ,(req, res) => {
    res.send("Todo api")
})
router.post('/create', authMiddlware, createTask);
router.get('/pending', authMiddlware,  displayPending);
router.get('/completed', authMiddlware, displayCompleted);
router.delete('/delete/:id', deleteTask);
router.put('/update/:id', authMiddlware, updateTask);


export default router;
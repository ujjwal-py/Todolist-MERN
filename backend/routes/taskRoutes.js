import {createTask, displayPending, displayCompleted, deleteTask, updateTask, getUsername, getUsernameHandler} from '../controller/taskController.js'
import express from 'express'
import { signUpController, authMiddleware, signIn, preventRelogin, check_user, logOut } from "../controller/auth.js"

const router = express.Router();


router.post('/register', preventRelogin, signUpController);
router.post('/login', preventRelogin, signIn)
router.get('/check-user', check_user)
router.get('/get-username', authMiddleware, getUsernameHandler);
router.post('/logout', logOut);


router.get('/', authMiddleware ,(req, res) => {
    res.send("Todo api")
})
router.post('/create', authMiddleware, createTask);
router.get('/pending', authMiddleware,  displayPending);
router.get('/completed', authMiddleware, displayCompleted);
router.delete('/delete/:id', deleteTask);
router.put('/update/:id', authMiddleware, updateTask);


export default router;
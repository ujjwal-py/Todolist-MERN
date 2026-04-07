import {createTask, displayPending, displayCompleted, deleteTask, updateTask} from '../controller/taskController.js'
import express from 'express'
import { signUpController, authMiddlware } from "../controller/auth.js"

const router = express.Router();


router.post('/register', signUpController);


router.get('/', authMiddlware ,(req, res) => {
    res.send("Todo api")
})
router.post('/create', createTask);
router.get('/pending',  displayPending);
router.get('/completed', displayCompleted);
router.delete('/delete/:id', deleteTask);
router.put('/update/:id', updateTask);


export default router;
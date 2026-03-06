import express from 'express'
import {createTask, displayPending, displayCompleted, deleteTask, updateTask} from '../controller/taskController.js'

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Todo api")
})
router.post('/create', createTask);
router.get('/pending', displayPending);
router.get('/completed', displayCompleted);
router.delete('/delete/:id', deleteTask);
router.put('/update/:id', updateTask);


export default router;
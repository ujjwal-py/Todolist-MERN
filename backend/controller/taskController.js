import Task from "../model/Task.js";
import jwt from 'jsonwebtoken'
import zod from 'zod';

const taskSchema = zod.object({
    task_state: zod.enum(["pending", "completed"]),
    title: zod.string().trim().max(50),
    description: zod.string().trim().max(100),
    priority: zod.enum(["high", "mid", "low"]),
    deadline_date: zod.coerce.date().refine((date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return localDate >= today;
    }, "dates can't be in past"),
    deadline_time: zod.string().length(5),
    user: zod.string().trim()
});



export const getUsername = (req, res) => {
    return req.user.username;
}

export const getUsernameHandler = (req, res) => {
    try {
        const username = getUsername(req, res);
        res.json({username})
    }
    catch(err) {
        res.status(401).json({message: err.message})
    }
}

export const createTask = async (req, res) => {
    try {
        // validation fist
        const validate = taskSchema.safeParse(req.body);
        if (!validate.success) {
                console.log(validate.error.issues)
            return res.status(400).json({
                msg : validate.error.issues
            });
        }
        const data = validate.data;
        data.deadline_date = req.body.deadline_date;
        const newTask = await Task.create(data)
        res.status(201).json({id: `${newTask._id}`})
    }
    catch (err) {
        console.error(err);
        res.status(500).json({message: err});
    }
}

export const displayPending = async (req, res) => {
    const user = getUsername(req, res);
    try {
        const tasks = await Task.find({task_state : "pending", user: user});
        res.status(201).json(tasks)
    }
    catch(err) {
        console.error("An error Occured ", err)
        res.status(500).json({message: err.message})
    }
}

export const displayCompleted = async (req, res) => {
    const user = getUsername(req, res);

    try {
        const tasks = await Task.find({task_state : "completed", user: user});
        res.status(201).json(tasks)
    }
    catch(err) {
        console.error("An error Occured ", err)
        res.status(500).json({message: err.message})
    }
}

export const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({message: "ID is required"});
        }
        await Task.findByIdAndDelete(id);
        res.status(204).send();
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

export const updateTask = async (req, res) => {

    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({message: "ID is required"});
        }
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            req.body,
            {new: true}
        );
        if (!updatedTask) {
            return res.status(404).json({message: "Task not found"});
        }
        res.status(200).json(updatedTask)
    }
    catch(err) {
        res.status(500).json({message: err.message})
    }
};


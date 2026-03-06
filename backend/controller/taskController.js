import Task from "../model/Task.js";
// import {nanoid} from 'nanoid';

export const createTask = async (req, res) => {
    try {
        const {title, description, priority, deadline_date, deadline_time} = req.body;
        // const id = nanoid(6);
        const newTask = await Task.create({
            title,
            description,
            priority,
            deadline_date,
            deadline_time
        })
        res.status(201).json({id: `${newTask._id}`})
    }
    catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
}

export const displayPending = async (req, res) => {
    try {
        const tasks = await Task.find({task_state : "pending"});
        res.status(201).json(tasks)
    }
    catch(err) {
        console.error("An error Occured ", err)
        res.status(500).json({message: err.message})
    }
}

export const displayCompleted = async (req, res) => {
    try {
        const tasks = await Task.find({task_state : "completed"});
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


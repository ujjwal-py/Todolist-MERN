import Task from "../model/Task.js";
import jwt from 'jsonwebtoken'
// import {nanoid} from 'nanoid';
export const getUsername = (req, res) => {
    let token = req.headers.authorization;
    token = token.startsWith('Bearer ') ? token.slice(7) : token;
    const decode = jwt.decode(token);
    const username = decode.username;
    return username;
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
        const {title, description, priority, deadline_date, deadline_time} = req.body;
        const user = getUsername(req, res);
        // const id = nanoid(6);
        const newTask = await Task.create({
            title,
            description,
            priority,
            deadline_date,
            deadline_time, 
            user
        })
        res.status(201).json({id: `${newTask._id}`})
    }
    catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
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
        await Task.findByIdAndDelete();
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


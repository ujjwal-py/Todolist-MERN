import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    task_state : {
        type : String, 
        default: "pending"
    },
    title : {
        type : String, 
        required: true
    }, 
    description : {
        type : String, 
        required : false
    },
    priority : {
        type : String, 
        required: true
    }, 
    deadline_date : {
        type: String, 
        required: true
    }, 
    deadline_time: {
        type: String, 
        required: true
    }
}, {timestamps : true})

export default mongoose.model("TaskProject", taskSchema);
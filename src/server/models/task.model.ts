import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        duration: {
            type: Number,
            required: false
        },
        deadline: {
            type: Date,
            required: true,
            default: Date.now
        },
        isEvent: {
            type: Boolean,
            required: true,
            default: false
        },
        status: {
            type: String,
            required: true,
            default: "Not Started"
        },
        repeat: {
            type: String,
            required: true,
            default: "Never"
        },
        project: {
            type: ObjectId,
            required: false
        },
    },
    {
        timestamps: true
    }
);

const Task = mongoose.model("Task", TaskSchema);

export default Task;
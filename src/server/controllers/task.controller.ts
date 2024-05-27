import Task from "../models/task.model.js";
import Day from "../models/day.model.js"; 

const addTask = async (req: any, res: any) => {
    try {
        const task = await Task.create(req.body);

        // Find the existing Day document for the task's deadline
        const taskDeadline = new Date(task.deadline);
        taskDeadline.setHours(0, 0, 0, 0); // Ensure only the date part is used

        let day = await Day.findById(taskDeadline);
        if (!day) {
            //if the day does not exist, create a new day
            day = await Day.create({_id: taskDeadline, tasks: [] });
        }

        // Add the new task to the day's tasks
        day.tasks.push(task._id);
        await day.save();

        res.status(200).json(task);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

const updateTaskById = async (req: any, res: any) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body);
        if (!task) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
        const updatedTask = await Task.findById(req.params.id);
        res.status(200).json(updatedTask);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

const getAllTasks = async (req: any, res: any) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json(tasks);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

const getTaskById = async (req: any, res: any) => {
    try {
        const task = await Task.findById(req.params.id);
        res.status(200).json(task);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

const deleteTaskById = async (req: any, res: any) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
        res.status(200).json({ message: "Task deleted" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export { addTask, updateTaskById, getAllTasks, getTaskById, deleteTaskById };
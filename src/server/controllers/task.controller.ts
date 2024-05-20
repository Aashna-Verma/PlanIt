import Task from "../models/task.model.js";

const addTask = async (req: any, res: any) => {
    try {
        const task = await Task.create(req.body);
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
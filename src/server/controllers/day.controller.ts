import Day from "../models/day.model.js"; 

const addDay = async (req: any, res: any) => {
    try {
        const day = await Day.create(req.body);

        res.status(200).json(day);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

const updateDayById = async (req: any, res: any) => {
    try {
        const day = await Day.findByIdAndUpdate(req.params.id, req.body);
        if (!day) {
            res.status(404).json({ message: "Day not found" });
            return;
        }
        const updatedDay = await Day.findById(req.params.id);
        res.status(200).json(updatedDay);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

const getAllDays = async (req: any, res: any) => {
    try {
        const days = await Day.find({});
        res.status(200).json(days);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

const getDayById = async (req: any, res: any) => {
    try {
        const day = await Day.findById(req.params.id);
        res.status(200).json(day);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

const deleteDayById = async (req: any, res: any) => {
    try {
        const day = await Day.findByIdAndDelete(req.params.id);
        if (!day) {
            res.status(404).json({ message: "Day not found" });
            return;
        }
        res.status(200).json({ message: "Day deleted" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export { addDay, updateDayById, getAllDays, getDayById, deleteDayById };
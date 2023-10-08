import ErrorHandler from '../middleware/error.js';
import { Task } from '../models/task.js'


export const createTask = async (req, res, next) => {
    try {
        const { tittle, description } = req.body;
        if (!tittle) {
            return next(new ErrorHandler("Tittle Missing", 400));
        }
        if (!description) {
            return next(new ErrorHandler("Description Missing", 400));
        }

        await Task.create({ tittle, description, user: req.user })
        res.status(201).json({
            success: true,
            messgae: "Task Created Successfully"
        })
        
    } catch (error) {
        next(error)
    }
}

export const getMyTask = async (req, res, next) => {
    try {
        const taskList = await Task.find({ user: req.user._id })
        res.json({
            success: true,
            task: taskList
        })

    } catch (error) {
        next(error)

    }
}

export const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id)

        if (!task) return next(new ErrorHandler("Invalid Task Id", 404));

        task.isCompleted = !task.isCompleted;
        await task.save();
        res.json({
            success: true,
            messgae: "Updated Successfully"
        })

    } catch (error) {
        next(error)

    }
}

export const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) return next(new ErrorHandler("Invalid Task Id", 404));

        await Task.deleteOne({ _id: id });
        res.json({
            success: true,
            messgae: "Deleted Successfully"
        })

    } catch (error) {
        next(error)
    }
};

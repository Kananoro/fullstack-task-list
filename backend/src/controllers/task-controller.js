import { catchAsync } from "../utils/catch-async.js";
import {
	getAllTask,
	getTaskById,
	updateTask,
} from "../services/task-service.js";

export const getAllTaskes = catchAsync(async (req, res) => {
	const allTask = await getAllTask(req.user.FIO);
	res.send(allTask);
});

export const changeTask = catchAsync(async (req, res) => {
	if (req.user) {
		const taskId = req.params.taskId;
		const { status } = req.body;
		const task = await getTaskById(taskId);
		if (task.responsibleFIO == req.user.FIO) {
			task.status = status || task.status;
		}
		const updatedTask = await updateTask(task.id, task);
		res.json(updatedTask);
		d;
	} else {
		res.status(401).send("Unathorized");
	}
});

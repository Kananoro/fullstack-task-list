import { prisma } from "../config/prisma.js";

export const getAllTask = async (data) => {
	const allTask = await prisma.task.findMany({
		where: {
			responsibleFIO: data,
		},
	});
	return allTask;
};

export const getTaskById = async (id) => {
	const task = await prisma.task.findUnique({
		where: {
			id: Number(id),
		},
	});
	return task;
};

export const updateTask = async (id, data) => {
	try {
		const updatedTask = await prisma.task.update({
			where: {
				id: Number(id),
			},
			data: data,
		});
	} catch (error) {
		throw new Error("Could not update task");
	}
};

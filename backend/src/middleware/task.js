import { Router } from "express";
import { getAllTaskes } from "../controllers/task-controller.js";

const router = Router();

export const taskMiddleware = (req, res, next) => {
	return getAllTaskes(req, res, next);
};

export default router;

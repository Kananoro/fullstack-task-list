import passport from "passport";
import { router } from "../app.js";
import { taskMiddleware } from "../middleware/task.js";
import { changeTask } from "../controllers/task-controller.js";

router.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	taskMiddleware,
);

router.put(
	"/:taskId",
	passport.authenticate("jwt", { session: false }),
	changeTask,
);

export default router;

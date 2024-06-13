import { validation } from "../utils/validate.js";
import { loginSchema } from "./validators/login.js";
import { authLogin } from "../controllers/login-controller.js";
import { authToken } from "../middleware/auth-token.js";
import { router } from "../app.js";

router.post("/", validation(loginSchema), authLogin);

router.get("/protect", authToken, (req, res, next) => {
	if (!req.user) return res.sendStatus(403);
	res.json({ user: req.user });
	next();
});

export default router;

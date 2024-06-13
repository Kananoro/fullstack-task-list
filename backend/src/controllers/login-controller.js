import catchAsync from "../utils/catch-async.js";
import { loginUserWithLoginAndPassword } from "../services/login-service.js";
import { generateAuthToken } from "../services/token-service.js";

export const authLogin = catchAsync(async (req, res) => {
	const { login, password } = req.body;
	const user = await loginUserWithLoginAndPassword(login, password);
	if (!user) {
		return res.status(401).json({ message: "Invalid credentials!" });
	}

	const { password: userPassword, ...userWithoutPassword } = user;
	const token = await generateAuthToken(user);
	res.send({ token, userWithoutPassword });
});

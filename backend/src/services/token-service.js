import jwt from "jsonwebtoken";
import { config } from "../config/jwt.js";

export const generateAuthToken = async (
	user,
	expiresIn = "1h",
	secret = config.jwt.secret,
) => {
	const token = jwt.sign(
		{
			FIO: user.FIO,
			id: user.id,
			login: user.login,
		},
		secret,
		{
			expiresIn: expiresIn,
		},
	);
	return token;
};

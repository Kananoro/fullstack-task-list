import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (!token) return res.sendStatus(401);

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) throw new Error("error: ", err);
		req.user = user;
		next();
	});
};

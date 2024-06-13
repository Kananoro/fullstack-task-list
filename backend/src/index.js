import passport from "passport";
import { app } from "./app.js";
import dotenv from "dotenv";
import cors from "cors";
import loginRoutes from "./routes/login-route.js";
import taskRoutes from "./routes/task-route.js";
import { jwtStrategy } from "./config/passport-jwt.js";

dotenv.config();

const port = process.env.PORT || 3000;
app.use(passport.initialize());

app.use(cors());

passport.use("jwt", jwtStrategy);

app.use("/auth", loginRoutes);
app.use("/task", taskRoutes);

app.listen(port, function () {
	console.log(`Server start on http://localhost:${port}`);
});

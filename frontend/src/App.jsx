import {
	Link,
	RouterProvider,
	createBrowserRouter,
	redirect,
} from "react-router-dom";
import { instance } from "./utils/api";
import LoginPage from "./pages/login/loginPage";
import TaskPage from "./pages/task/taskPage";

const protectedLoader = async () => {
	try {
		const isAuthorised = await instance.get("/auth/protect");
		if (isAuthorised.status !== 200) return redirect("/");
		return null;
	} catch (error) {
		return redirect("/");
	}
};

const router = createBrowserRouter([
	{
		path: "/",
		errorElement: (
			<div className="w-full h-full flex justify-center items-center flex-col">
				<p className="text-error text-4xl font-light">Error 404</p>
				<p className="text-2xl mb-10">Oops! Page Not Found!</p>
				<Link to={"/"}>
					<p className="text-2xl">Back to login</p>
				</Link>
			</div>
		),
		children: [
			{
				path: "",
				element: <LoginPage />,
			},
			{
				path: "task",
				loader: protectedLoader,
				element: <TaskPage />,
			},
		],
	},
]);

function App() {
	return (
		<div className="w-full h-full bg-background">
			<div className="w-[1200px] h-full text-text m-auto">
				<RouterProvider router={router} />
			</div>
		</div>
	);
}

export default App;

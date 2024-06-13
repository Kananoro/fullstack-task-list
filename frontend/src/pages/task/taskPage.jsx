import { useEffect, useState } from "react";
import { api } from "../../utils/api-get";
import Task from "../../components/task";
import { useNavigate } from "react-router-dom";

const TaskPage = () => {
	const [tasks, setTasks] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		const getTask = async () => {
			try {
				const task = await api.getTasks();
				task.data.sort((a, b) => {
					if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) return -1;
					if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) return 1;
					return 0;
				});
				setTasks(task.data);
			} catch (error) {
				console.error(error);
			}
		};
		getTask();
	}, []);
	const onLogout = () => {
		localStorage.removeItem("token");
		navigate("/");
	};

	return (
		<div className="w-full h-full relative pt-5 flex flex-col items-center">
			<button onClick={() => onLogout()} className="absolute top-5 right-5">
				Log Out
			</button>
			<h1 className="text-3xl mb-5">List of Task</h1>
			<div className="w-full overflow-y-auto overflow-x-hidden custom-scrollbar flex flex-col gap-2 items-center">
				{tasks.map((data) => (
					<Task key={data.id} data={data} />
				))}
			</div>
		</div>
	);
};

export default TaskPage;

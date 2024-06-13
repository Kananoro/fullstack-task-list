import { instance } from "./api";

const loginUser = (login, password) => {
	return instance.post("/auth", {
		login: login,
		password: password,
	});
};

const getTasks = () => {
	return instance.get("/task");
};

const isAuthorised = async () => {
	try {
		await instance.get("/auth/protect").then((res) => {
			if (res.status === 200) return true;
			return false;
		});
	} catch (error) {
		return false;
	}
};

const statusChange = async (id, status) => {
	try {
		await instance.put(`/task/${id}`, {
			status: status,
		});
	} catch (error) {
		console.error(error);
	}
};

export const api = { loginUser, getTasks, isAuthorised, statusChange };

import axios from "axios";

const port = import.meta.env.PORT || 3000;

export const instance = axios.create({
	baseURL: `http://localhost:${port}`,
});

instance.interceptors.request.use((config) => {
	config.headers.authorization = `Bearer ${localStorage.token}`;
	return config;
});

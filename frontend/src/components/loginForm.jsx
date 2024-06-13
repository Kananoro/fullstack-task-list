import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api-get";

const LoginForm = () => {
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();
	const onLoginClick = async () => {
		setErrorMessage(null);
		api
			.loginUser(login, password)
			.then((res) => {
				localStorage.setItem("token", res.data.token);
				navigate("/task");
			})
			.catch((error) => {
				const apiError = error.response.status;
				if (apiError === 500) {
					setErrorMessage(
						error.response.data.message.map((item) => String(item)).join("\n"),
					);
					setTimeout(errorTimeout, 2000);
				}
				if (apiError === 401) {
					setErrorMessage("Password incorrect!");
					setTimeout(errorTimeout, 2000);
				}
				if (apiError === 404) {
					setErrorMessage("Login not found!");
					setTimeout(errorTimeout, 2000);
				}
			});
	};

	const errorTimeout = () => {
		setErrorMessage(null);
	};
	return (
		<div className="flex flex-col justify-center items-center w-full h-full">
			<div className=" flex h-72 relative flex-col gap-2 items-center justify-center self-center">
				<h1 className="text-4xl text-text p-5">Authorization 🔐</h1>
				<div className="w-[250px] flex flex-col justify-center">
					<input
						tabIndex="1"
						type="text"
						id="login"
						placeholder="login"
						className="outline-none px-2 py-1 rounded-b-none rounded-lg border bg-transparent border-secondary focus:border-focus transition-all duration-500"
						value={login}
						onChange={(e) => setLogin(e.target.value)}
					/>
					<input
						tabIndex="2"
						type="password"
						id="password"
						placeholder="password"
						className="outline-none px-2 py-1 rounded-t-none rounded-lg border bg-transparent border-secondary focus:border-focus transition-all duration-500 mb-3"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button
						onClick={() => {
							onLoginClick();
						}}>
						Sign in
					</button>
					{errorMessage && (
						<p className="absolute p-2 text-sm rounded-lg text-error bottom-0">
							{errorMessage}
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default LoginForm;

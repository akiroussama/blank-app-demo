import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import Button from "./Button";
import InputField from "./InputField";

interface LoginFormProps {
	onLogin: ({ token, error }: { token: string; error: string }) => void;
	title?: string;
	errorMessage?: string;
}
const LoginForm: React.FC<LoginFormProps> = ({
	onLogin,
	title = "Log In",
	errorMessage,
}) => {
	const [submitted, setSubmitted] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	// add jwt token to local storage
	const [token, setToken] = useState("");
	const LOGIN_MUTATION = gql`
		mutation Login($username: String!, $password: String!) {
			login(username: $username, password: $password)
		}
	`;

	// add authenification using jwt token to local storage from graphql mutation
	const [login, { data }] = useMutation(LOGIN_MUTATION, {
		onCompleted: (data) => {
			setToken(data.login);
			localStorage.setItem("token", token);
			onLogin({ token, error: "" });
		},
		onError: (error) => {
			onLogin({ token: "", error: error.message });
		},
	});

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSubmitted(true);
		if (username && password) {
			login({ variables: { username, password } });
		} else {
			onLogin({ token: "", error: "Username and password are required" });
		}
	};

	return (
		<div className="max-w-screen-sm p-12 mx-auto bg-gray-50 rounded-md shadow-lg">
			<form className="flex flex-col" onSubmit={handleFormSubmit}>
				<fieldset>
					<legend className="text-3xl text-gray-800 mb-4">{title}</legend>
					<InputField
						name="username"
						type="text"
						label="Username"
						submitted={submitted}
						requiredMessage="Username is required"
						onChange={(e) => setUsername(e.target.value)}
						value={username}
						autoComplete="username"
					/>
					<InputField
						name="password"
						type="password"
						label="Password"
						submitted={submitted}
						requiredMessage="Password is required"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						autoComplete="current-password"
					/>
					<Button type="submit" className="bg-purple-900">
						Login
					</Button>
					{errorMessage && (
						<div className="text-red-500 mt-2">{errorMessage}</div>
					)}
				</fieldset>
			</form>
		</div>
	);
};

export default LoginForm;

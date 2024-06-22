import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await actions.signUp(email, password);
			if (response) {
				console.log("User registered successfully");
				navigate("/login");  // Redirigir al login después de un registro exitoso
			}
		} catch (error) {
			console.error("Error registering user:", error);
		}
	};

	return (
		<div className="text-center mt-5">
			<div className="container">
				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
						<input 
							type="email" 
							className="form-control" 
							id="exampleInputEmail1" 
							aria-describedby="emailHelp"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
					</div>
					<div className="mb-3">
						<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
						<input 
							type="password" 
							className="form-control" 
							id="exampleInputPassword1"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button type="submit" className="btn btn-primary">Submit</button>
				</form>
			</div>
		</div>
	);
};

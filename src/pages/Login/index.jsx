//Frontend for Login of user
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";


function Login(){
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); // New state for success message


	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:5000/api/auth/Login";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data.data); // Access res.data.data as per backend response
            setSuccessMessage(res.data.message); // Set success message from backend
            setError(""); // Clear any previous errors

            // Redirect to home page after a short delay
            setTimeout(() => {
                window.location = "/";
            }, 1500); // Redirect after 1.5 seconds
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
                setSuccessMessage(""); // Clear success message on error
			} else {
                setError("An unexpected error occurred. Please try again.");
                setSuccessMessage("");
            }
		}
	};

	return (
		<>
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						
						<button type="submit" className={styles.green_btn}>
							Sign In
						</button>
						<Link to="/forgot-password" style={{alignItems: "center", fontFamily: 'Montserrat',
							fontStyle: "normal",
							fontWeight: 400, // Corrected 'fontweight' to 'fontWeight'
							fontSize: 14,    // Corrected 'fontsize' to 'fontSize'
							lineHeight: 24}}>
							<p style={{padding: "0 15px"}}>Forgot Your Password?</p>
						</Link>
                        {/* Display success or error messages */}
                        {successMessage && <div className={styles.success_msg}>{successMessage}</div>}
						{error && <div className={styles.error_msg}>{error}</div>}
						
						<h2>Don't have an account?</h2>
						<Link to="/signup">
							<button type="button" className={styles.green_btn}>
								Sign Up
							</button>
						</Link>
						
					</form>
				</div>
				
			</div>
		</div>
		</>
	);
};

export default Login;
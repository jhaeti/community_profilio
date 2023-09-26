"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import styles from "../styles.module.css";
import TextField from "@mui/material/TextField";
import { SUCCESS, WARN } from "@/contexts/MsgContext";
import apiUrl from "@/utils/apiUrl";
import useMsgContext from "@/hooks/useMsgContext";

const AddUserProfileInput = () => {
	const [state, setState] = useState({
		name: "",
		email: "",
		password: "",
		role: "",
	});

	const { dispatch } = useMsgContext();
	const router = useRouter();

	const [isEmailValid, setIsEmailValid] = useState(false);

	const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

	function validateEmail(email) {
		return emailRegex.test(email);
	}

	useEffect(() => {
		setIsEmailValid(validateEmail(state.email));
	}, [state.email]);

	function handleSubmit(e) {
		e.preventDefault();

		if (!state.name || !state.email || !state.password || !state.role) {
			dispatch({ type: WARN, payload: "Input all fields." });
		} else if (!isEmailValid) {
			dispatch({ type: WARN, payload: "Enter a valid email." });
		} else {
			(async function addUser() {
				const res = await fetch(apiUrl + "/users/add-user", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
					body: JSON.stringify(state),
				});
				if (res.ok) {
					dispatch({
						type: SUCCESS,
						payload: "user added successfully",
					});
					router.push("/admin-panel/user");
				} else {
					dispatch({ type: WARN, payload: await res.json() });
				}
			})();
		}
	}

	function handleChange(e) {
		setState((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className={styles.flex}>
					<TextField
						name="name"
						value={state.name}
						id="outlined-basic"
						variant="outlined"
						color="primary"
						className={styles.input}
						onChange={handleChange}
						mt={3}
						label="NAME"
					/>
					<TextField
						name="email"
						value={state.email}
						id="outlined-basic"
						variant="outlined"
						color="primary"
						className={styles.input}
						onChange={handleChange}
						mt={3}
						label="EMAIL"
					/>
					<TextField
						name="password"
						value={state.password}
						id="outlined-basic"
						variant="outlined"
						color="primary"
						className={styles.input}
						onChange={handleChange}
						mt={3}
						label="PASSWORD"
						type={"password"}
					/>
				</div>
				<div className={styles.flex}>
					<FormControl style={{ minWidth: "30rem" }}>
						<InputLabel id="demo-simple-select-label">
							ROLE
						</InputLabel>
						<Select
							name="role"
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							label="ROLE"
							onChange={handleChange}
						>
							<MenuItem value={"BASIC"}>BASIC</MenuItem>
							<MenuItem value={"ADMIN"}>ADMIN</MenuItem>
						</Select>
					</FormControl>
					<button
						style={{
							display: "block",
							padding: "1.8rem",
							width: "100%",
							textTransform: "uppercase",
							background: "var(--color-primary)",
							color: "var(--color-white)",
							border: "none",
							outline: "none",
							borderRadius: "2px",
							fontSize: "2.2rem",
							minWidth: "35rem",
							maxWidth: "45rem",
						}}
					>
						Submit community profile
					</button>
				</div>
			</form>
		</>
	);
};

export default AddUserProfileInput;

"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import styles from "./styles.module.css";
import useMsgContext from "@/hooks/useMsgContext";
import { SUCCESS, WARN } from "@/contexts/MsgContext";
import apiUrl from "@/utils/apiUrl";
import { useRouter } from "next/navigation";

const Inputs = ({ id }) => {
	const [state, setState] = useState({
		name: "",
		email: "",
		organization: "",
		reason: "",
	});
	const router = useRouter();
	const { dispatch } = useMsgContext();

	const [isEmailValid, setIsEmailValid] = useState(false);

	const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

	function validateEmail(email) {
		return emailRegex.test(email);
	}

	useEffect(() => {
		setIsEmailValid(validateEmail(state.email));
	}, [state.email]);

	function handleChange(e) {
		setState((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	}

	function handleMakeRequest() {
		if (
			!state.name ||
			!state.email ||
			!state.organization ||
			!state.reason
		) {
			dispatch({ type: WARN, payload: "Please fill all form" });
		} else if (!isEmailValid) {
			dispatch({ type: WARN, payload: "Please input a valid email." });
		} else {
			fetch(`${apiUrl}/requesters`, {
				method: "POST",
				headers: {
					Accept: "*/*",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...state,
					communityProfileRequested: id,
				}),
			})
				.then((res) => res.json())
				.then((json) => {
					dispatch({
						type: SUCCESS,
						payload:
							"Request sent. Please we would reach back to you with your email.   ",
					});
					setTimeout(() => {
						router.push("/");
					}, [2000]);
				});
		}
	}
	return (
		<Box>
			<Box mt={3}>
				<div className={styles.flex}>
					<TextField
						name="name"
						value={state.name}
						id="outlined-basic"
						label="User Name"
						variant="outlined"
						color="primary"
						className={styles.input}
						onChange={handleChange}
						mt={3}
					/>
					<TextField
						name="email"
						value={state.email}
						id="outlined-basic"
						label="Email"
						variant="outlined"
						color="primary"
						className={styles.input}
						onChange={handleChange}
						mt={3}
					/>
					<TextField
						name="organization"
						value={state.organization}
						id="outlined-basic"
						label="Organization name"
						variant="outlined"
						color="primary"
						mt={3}
						className={styles.input}
						onChange={handleChange}
					/>
				</div>

				<textarea
					name="reason"
					value={state.reason}
					id="reason"
					rows="4"
					placeholder="What do you need this for?"
					className={styles.textarea}
					onChange={handleChange}
				></textarea>
			</Box>
			<Box>
				<button onClick={handleMakeRequest} className={styles.btn}>
					SUBMIT REQUEST FOR FULL PROFILE
				</button>
			</Box>
		</Box>
	);
};

export default Inputs;

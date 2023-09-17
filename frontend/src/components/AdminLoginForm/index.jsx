"use client";
import { useState } from "react";

import styles from "./styles.module.css";
import apiUrl from "@/utils/apiUrl";
import useUserContext from "@/hooks/useUserContext";
import { useRouter } from "next/navigation";
import { ADD_USER } from "@/contexts/UserContext";
import { ERROR } from "@/contexts/MsgContext";
import useMsgContext from "@/hooks/useMsgContext";

const AdminLoginForm = () => {
	const [state, setState] = useState({
		email: "",
		password: "",
	});
	const router = useRouter();
	const { dispatch: userDispatch } = useUserContext();
	const { dispatch: msgDispatch } = useMsgContext();

	function handleChange(e) {
		setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	}

	async function handleAdminLogin(e) {
		e.preventDefault();
		const res = await fetch(`${apiUrl}/users/login`, {
			method: "POST",
			credentials: "include",
			body: JSON.stringify(state),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		if (res.ok) {
			await router.push("/admin-panel");
			userDispatch({
				type: ADD_USER,
				user: data.user,
				token: data.token,
			});
		} else {
			msgDispatch({ type: ERROR, payload: data });
		}
	}

	return (
		<form>
			<form>
				<div className={styles.group}>
					<input
						value={state.email}
						onChange={handleChange}
						name="email"
						type="text"
						required
					/>
					<span className="highlight"></span>
					<span className="bar"></span>
					<label>Email</label>
				</div>
				<div className={styles.group}>
					<input
						value={state.password}
						onChange={handleChange}
						name="password"
						type="password"
						required
					/>
					<span className="highlight"></span>
					<span className="bar"></span>
					<label>Password</label>
				</div>
				<button onClick={handleAdminLogin} className={styles.btn}>
					Login
				</button>
			</form>
		</form>
	);
};

export default AdminLoginForm;

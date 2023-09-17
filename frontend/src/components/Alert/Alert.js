"use client";
import { CLEAR_MSG } from "../../contexts/MsgContext";
import useMsgContext from "../../hooks/useMsgContext";
import styles from "./styles.module.css";

const Alert = () => {
	const { msg, dispatch } = useMsgContext();

	return (
		msg.content &&
		setTimeout(() => {
			dispatch({ type: CLEAR_MSG });
		}, 3000) && (
			<div className={styles.alert}>
				<div
					style={{
						background:
							msg.color === "success"
								? "green"
								: msg.color === "warn"
								? "orange"
								: "red",
					}}
					className={styles.alert_content}
				>
					{msg.content}
					<div
						onClick={() => {
							dispatch({ type: CLEAR_MSG });
						}}
						className={styles.alert_close}
					>
						x
					</div>
				</div>
			</div>
		)
	);
};

export default Alert;

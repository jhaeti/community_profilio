"use client";
import { useRouter } from "next/navigation";
import styles from "../styles.module.css";
const RequestBtn = ({ id }) => {
	const router = useRouter();
	function handleClick() {
		router.push("/community-profiles/" + id + "/make-request-for-profile");
	}
	return (
		<button onClick={handleClick} className={styles.btn}>
			Request for full profile
		</button>
	);
};

export default RequestBtn;

"use client";
import { useRouter } from "next/navigation";

import styles from "../styles.module.css";
import apiUrl from "@/utils/apiUrl";

const Btn = ({ id }) => {
	const router = useRouter();
	const getAbstract = () => {
		router.push(apiUrl + "/community-profiles/" + id + "/abstract");
	};

	return (
		<button onClick={getAbstract} className={styles.btn}>
			View abstract
		</button>
	);
};

export default Btn;

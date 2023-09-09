"use client";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
const GoBack = () => {
	const router = useRouter();
	const handleClick = () => {
		router.back();
	};
	return (
		<div onClick={handleClick} className={styles.container}>
			<div className={styles.line1}></div>
			<div className={styles.line2}></div>
			<div className={styles.line3}></div>
		</div>
	);
};

export default GoBack;

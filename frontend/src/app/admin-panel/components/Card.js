"use client";
import { useRouter } from "next/navigation";
import styles from "../styles.module.css";

const Card = ({ count, label, route }) => {
	const router = useRouter();

	function handleClick() {
		router.push(route);
	}
	return (
		<div className={styles.card} onClick={handleClick}>
			<div>{count | "Loading .."}</div>
			<div>{label}</div>
		</div>
	);
};

export default Card;

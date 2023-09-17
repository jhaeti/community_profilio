import styles from "./styles.module.css";
const NextImage = ({ enable, setImgNumber }) => {
	return (
		<div
			onClick={() => {
				if (enable) {
					setImgNumber((prev) => prev + 1);
				}
			}}
			className={[styles.next, !enable ? styles.disable : ""].join(" ")}
		></div>
	);
};

export default NextImage;

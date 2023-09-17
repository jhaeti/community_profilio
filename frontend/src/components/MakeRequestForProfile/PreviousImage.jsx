import styles from "./styles.module.css";
const PreviousImage = ({ enable, setImgNumber }) => {
	return (
		<div
			onClick={() => {
				if (enable) {
					setImgNumber((prev) => prev - 1);
				}
			}}
			className={[styles.prev, !enable ? styles.disable : ""].join(" ")}
		></div>
	);
};

export default PreviousImage;

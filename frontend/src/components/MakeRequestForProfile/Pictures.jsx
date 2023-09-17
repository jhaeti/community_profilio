"use client";

import { useState } from "react";

import apiUrl from "@/utils/apiUrl";
import styles from "./styles.module.css";
import NextImage from "./NextImage";
import PreviousImage from "./PreviousImage";

const Pictures = ({ id, imgsNumber, name }) => {
	const [imgNumber, setImgNumber] = useState(0);
	return (
		<>
			<img
				className={styles.img}
				src={`${apiUrl}/community-profiles/${id}/imgs/${imgNumber}`}
				alt={name}
			/>
			<PreviousImage enable={imgNumber > 0} setImgNumber={setImgNumber} />
			<NextImage
				enable={imgNumber + 1 < imgsNumber}
				setImgNumber={setImgNumber}
			/>
		</>
	);
};

export default Pictures;

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "../styles.module.css";
import TextField from "@mui/material/TextField";
import { SUCCESS } from "@/contexts/MsgContext";
import apiUrl from "@/utils/apiUrl";
import useMsgContext from "@/hooks/useMsgContext";

const AddCommunityProfileInput = () => {
	const [state, setState] = useState({
		name: "",
		district: "",
		region: "",
		abstract: null,
		mainProfile: null,
	});
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [filePreviews, setFilePreviews] = useState([]);
	const { dispatch } = useMsgContext();
	const router = useRouter();

	function handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData();
		for (const name in state) {
			formData.append(name, state[name]);
		}

		selectedFiles.forEach((file) => {
			formData.append("imgs", file);
		});
		(async function postProduct() {
			const res = await fetch(apiUrl + "/community-profiles", {
				method: "POST",
				credentials: "include",
				body: formData,
			});

			if (res.ok) {
				dispatch({ type: SUCCESS, payload: "Profile added" });
				router.back();
				router.refresh();
			} else {
				dispatch({ type: WARN, payload: await res.json() });
			}
		})();
	}

	function FileUploader() {
		const handleFileChange = (e) => {
			const files = Array.from(e.target.files);

			setSelectedFiles(files);

			const previews = files.map((file) => URL.createObjectURL(file));
			setFilePreviews(previews);
		};

		function handleAbstractChange(e) {
			setState((prev) => ({ ...prev, abstract: e.target.files[0] }));
		}
		function handleMainProfileChange(e) {
			setState((prev) => ({ ...prev, mainProfile: e.target.files[0] }));
		}

		return (
			<div>
				<label
					htmlFor="abstract"
					style={{
						padding: "2rem",
						background: `${
							state.abstract ? "green" : "var(--color-gray)"
						} `,
						color: "var(--color-white)",
						marginRight: "2rem",
					}}
				>
					Upload Abstract
				</label>

				<input
					style={{
						visibility: "hidden",
						position: "absolute",
					}}
					onChange={handleAbstractChange}
					type="file"
					id="abstract"
				/>
				<label
					htmlFor="mainProfile"
					style={{
						padding: "2rem",
						background: `${
							state.mainProfile ? "green" : "var(--color-gray)"
						} `,
						color: "var(--color-white)",
						marginRight: "2rem",
					}}
				>
					Upload main profile
				</label>

				<input
					style={{
						visibility: "hidden",
						position: "absolute",
					}}
					onChange={handleMainProfileChange}
					type="file"
					id="mainProfile"
				/>
				<label
					htmlFor="img"
					style={{
						padding: "2rem",
						margin: "0.5rem 0",
						display: "inline-block",
						background: `${
							state.img ? "green" : "var(--color-gray)"
						} `,
						color: "var(--color-white)",
					}}
				>
					Upload Image
				</label>

				<input
					style={{
						visibility: "hidden",
					}}
					onChange={handleFileChange}
					type="file"
					id="img"
					multiple
				/>
				<div>
					{filePreviews.map((preview, index) => (
						<img
							key={index}
							src={preview}
							alt={`File Preview ${index}`}
							style={{
								maxWidth: "100px",
								maxHeight: "100px",
								margin: "10px",
							}}
						/>
					))}
				</div>
				<button
					style={{
						display: "block",
						padding: "1.8rem",
						width: "100%",
						textTransform: "uppercase",
						background: "var(--color-primary)",
						color: "var(--color-white)",
						border: "none",
						outline: "none",
						borderRadius: "2px",
						fontSize: "2.2rem",
						minWidth: "35rem",
						maxWidth: "45rem",
					}}
				>
					Submit community profile
				</button>
			</div>
		);
	}

	function handleChange(e) {
		setState((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	}

	return (
		<>
			<form onSubmit={handleSubmit} encType="multipart/form-data">
				<div className={styles.flex}>
					<TextField
						name="name"
						value={state.name}
						id="outlined-basic"
						variant="outlined"
						color="primary"
						className={styles.input}
						onChange={handleChange}
						mt={3}
						label="NAME"
					/>
					<TextField
						name="district"
						value={state.district}
						id="outlined-basic"
						variant="outlined"
						color="primary"
						className={styles.input}
						onChange={handleChange}
						mt={3}
						label="DISTRICT"
					/>
					<TextField
						name="region"
						value={state.region}
						id="outlined-basic"
						variant="outlined"
						color="primary"
						className={styles.input}
						onChange={handleChange}
						mt={3}
						label="REGION"
					/>
				</div>
				<FileUploader />
			</form>
		</>
	);
};

export default AddCommunityProfileInput;

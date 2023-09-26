"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "../styles.module.css";
import TextField from "@mui/material/TextField";
import { SUCCESS } from "@/contexts/MsgContext";
import apiUrl from "@/utils/apiUrl";
import useMsgContext from "@/hooks/useMsgContext";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

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

		if (
			!state.name ||
			!state.district ||
			!state.region ||
			!state.abstract ||
			!state.mainProfile ||
			selectedFiles.length === 0
		) {
			console.log(123);
			return;
		}
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
					<FormControl style={{ minWidth: "30rem" }}>
						<InputLabel id="demo-simple-select-label">
							REGION
						</InputLabel>
						<Select
							name="region"
							value={state.region}
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							label="REGION"
							onChange={handleChange}
						>
							<MenuItem value={"Ashanti Region"}>
								Ashanti Region
							</MenuItem>
							<MenuItem value={"Brong-Ahafo Region"}>
								Brong-Ahafo Region
							</MenuItem>
							<MenuItem value={"Central Region"}>
								Central Region
							</MenuItem>
							<MenuItem value={"Eastern Region"}>
								Eastern Region
							</MenuItem>
							<MenuItem value={"Greater Accra Region"}>
								Greater Accra Region
							</MenuItem>
							<MenuItem value={"Northern Region"}>
								Northern Region
							</MenuItem>
							<MenuItem value={"Upper East Region"}>
								Upper East Region
							</MenuItem>
							<MenuItem value={"Upper West Region"}>
								Upper West Region
							</MenuItem>
							<MenuItem value={"Volta Region"}>
								Volta Region
							</MenuItem>
							<MenuItem value={"Western Region"}>
								Western Region
							</MenuItem>
							<MenuItem value={"Western North Region"}>
								Western North Region
							</MenuItem>
							<MenuItem value={"Bono Region"}>
								Bono Region
							</MenuItem>
							<MenuItem value={"Oti Region"}>Oti Region</MenuItem>
							<MenuItem value={"North East Region"}>
								North East Region
							</MenuItem>
							<MenuItem value={"Savannah Region"}>
								Savannah Region
							</MenuItem>
							<MenuItem value={"Ahafo Region"}>
								Ahafo Region
							</MenuItem>
						</Select>
					</FormControl>
				</div>
				<FileUploader />
			</form>
		</>
	);
};

export default AddCommunityProfileInput;

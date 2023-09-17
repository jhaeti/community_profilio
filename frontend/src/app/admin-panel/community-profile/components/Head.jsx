"use client";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
const Head = () => {
	const router = useRouter();
	const handleAddProfile = () => {
		router.push("/admin-panel/community-profile/add");
	};

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
			}}
		>
			<Typography mt={2} variant="h4">
				Community Profiles
			</Typography>
			<Button
				onClick={handleAddProfile}
				style={{
					fontSize: "1.6rem",
					textTransform: "uppercase",
					fontWeight: "bold",
				}}
				variant="contained"
			>
				Add community profile
			</Button>
		</div>
	);
};

export default Head;

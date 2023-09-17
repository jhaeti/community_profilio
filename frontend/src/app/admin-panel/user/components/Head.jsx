"use client";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
const Head = () => {
	const router = useRouter();
	const handleAddUser = () => {
		router.push("/admin-panel/user/add");
	};

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
			}}
		>
			<Typography mt={2} variant="h4">
				Users
			</Typography>
			<Button
				onClick={handleAddUser}
				style={{
					fontSize: "1.6rem",
					textTransform: "uppercase",
					fontWeight: "bold",
				}}
				variant="contained"
			>
				Add user
			</Button>
		</div>
	);
};

export default Head;

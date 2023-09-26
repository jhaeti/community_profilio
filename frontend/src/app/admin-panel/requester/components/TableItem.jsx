"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import apiUrl from "@/utils/apiUrl";
import useMsgContext from "@/hooks/useMsgContext";
import { ERROR, SUCCESS } from "@/contexts/MsgContext";

const TableItem = ({ item }) => {
	const [open, setOpen] = useState(false);
	const { dispatch: msgDispatch } = useMsgContext();
	const handleOpen = () => {
		setOpen(true);
	};
	const handleDelete = async () => {
		setOpen(false);
		const res = await fetch(
			apiUrl + "/requesters/" + String(item._id) + "/grant",
			{
				credentials: "include",
				method: "GET",
			}
		);
		const data = await res.json();
		if (res.ok) {
			msgDispatch({
				type: SUCCESS,
				payload: "Community Profile has been GRANTED successfully",
			});
		} else {
			msgDispatch({ type: ERROR, payload: "Something went wrong" });
		}
		router.refresh();
	};

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		pt: 2,
		px: 4,
		pb: 3,
	};

	const router = useRouter();

	const id = String(item._id).slice(0, 10);
	return (
		<tr>
			<td>{id}</td>
			<td>{item.name}</td>
			<td>{item.email}</td>
			<td>{item.organization}</td>
			<td>
				{item.granted ? (
					"Granted"
				) : (
					<Button
						onClick={handleOpen}
						variant="contained"
						color="info"
					>
						SEND PROFILE
					</Button>
				)}
				<Modal
					open={open}
					onClose={() => setOpen(false)}
					aria-labelledby="parent-modal-title"
					aria-describedby="parent-modal-description"
				>
					<Box sx={{ ...style, width: 400 }}>
						<h2 id="parent-modal-title">
							Are you sure you want to send this profile
						</h2>
						<Button
							onClick={handleDelete}
							color="info"
							variant="contained"
						>
							CONFIRM SEND PROFILE
						</Button>
					</Box>
				</Modal>
			</td>
			<td>{new Date(item.date).toISOString().split("T")[0]}</td>
		</tr>
	);
};

export default TableItem;

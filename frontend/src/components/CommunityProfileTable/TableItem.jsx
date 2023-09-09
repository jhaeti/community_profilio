"use client";
import { useRouter } from "next/navigation";

const TableItem = ({ item }) => {
	const router = useRouter();
	const handleCLick = () => {
		router.push("/community-profiles/" + String(item._id));
	};

	return (
		<tr onClick={handleCLick}>
			<td>{item.name}</td>
			<td>{item.district}</td>
			<td>{item.region}</td>
			<td>{new Date(item.date).toISOString().split("T")[0]}</td>
		</tr>
	);
};

export default TableItem;

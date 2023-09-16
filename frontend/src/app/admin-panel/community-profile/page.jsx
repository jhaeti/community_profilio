import Typography from "@mui/material/Typography";
import Table from "./components/Table";
import apiUrl from "@/utils/apiUrl";
import { cookies } from "next/dist/client/components/headers";
import Head from "./components/Head";

const page = async () => {
	const res = await fetch(apiUrl + "/users/community-profiles", {
		headers: {
			Cookie: cookies(),
		},
	});

	const data = await res.json();

	return (
		<div className="">
			<Head />
			<Table data={data} />
		</div>
	);
};

export default page;

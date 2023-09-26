import { cookies } from "next/dist/client/components/headers";

import Head from "./components/Head";
import Table from "./components/Table";
import apiUrl from "@/utils/apiUrl";

const page = async () => {
	const res = await fetch(apiUrl + "/users/requesters", {
		headers: {
			Cookie: cookies(),
		},
	});

	const data = await res.json();

	return (
		<div>
			<Head />
			<Table data={data} />
		</div>
	);
};

export default page;

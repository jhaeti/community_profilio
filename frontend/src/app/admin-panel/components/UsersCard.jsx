"use client";
import useUserContext from "@/hooks/useUserContext";
import Card from "./Card";
import apiUrl from "@/utils/apiUrl";
import { useEffect, useState } from "react";

const UsersCard = () => {
	const {
		state: { user },
	} = useUserContext();
	const [count, setCount] = useState();

	useEffect(() => {
		(async function fetchCount() {
			if (user?.role === "ADMIN") {
				const res = await fetch(`${apiUrl}/users/count`, {
					credentials: "include",
				});
				const data = await res.json();
				if (res.status == 200) {
					setCount(data);
				}
			}
		})();
	}, []);

	return user?.role === "ADMIN" ? (
		<Card count={count} label="USERS" route="/admin-panel/user" />
	) : (
		""
	);
};

export default UsersCard;

import { cookies } from "next/dist/client/components/headers";
import apiUrl from "@/utils/apiUrl";
import styles from "./styles.module.css";
import Card from "./components/Card";
import UsersCard from "./components/UsersCard";

const adminPanel = async () => {
	const communityCountRes = await fetch(
		`${apiUrl}/community-profiles/count`,
		{
			cache: "no-store",
			headers: {
				Cookie: cookies(),
			},
		}
	);
	const communityCount = await communityCountRes.json();

	const requesterCountRes = await fetch(apiUrl + "/users/requesters/count", {
		cache: "no-store",
		headers: {
			Cookie: cookies(),
		},
	});
	const requesterCount = await requesterCountRes.json();

	return (
		<div className={[styles.adminPanel, "mt-6"].join(" ")}>
			<Card
				count={communityCountRes.ok && communityCount}
				label="COMMUNITY PROFILES"
				route="/admin-panel/community-profile"
			/>
			<UsersCard />
			<Card
				count={requesterCountRes.ok && requesterCount}
				label="REQUESTERS"
				route={"/admin-panel/requester"}
			/>
		</div>
	);
};

export default adminPanel;

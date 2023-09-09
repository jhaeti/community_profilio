import CommunityProfileTable from "@/components/CommunityProfileTable";
import apiUrl from "@/utils/apiUrl";

export default async function Home() {
	const res = await fetch(apiUrl + "/community-profiles");
	const data = await res.json();
	return (
		<>
			<div className="container">
				{data && <CommunityProfileTable data={data} />}
			</div>
		</>
	);
}

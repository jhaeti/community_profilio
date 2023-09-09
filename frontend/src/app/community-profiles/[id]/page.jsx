import apiUrl from "@/utils/apiUrl";
import GoBack from "@/components/GoBack";

const CommunityDetails = async ({ params }) => {
	const res = await fetch(apiUrl + "/community-profiles/" + params.id);
	const data = await res.json();
	return (
		<div>
			<GoBack />
		</div>
	);
};

export default CommunityDetails;

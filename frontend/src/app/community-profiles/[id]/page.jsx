import apiUrl from "@/utils/apiUrl";
import GoBack from "@/components/GoBack";
import styles from "./styles.module.css";
import Btn from "./components/Btn";
import RequestBtn from "./components/RequestBtn";
import Pictures from "@/components/MakeRequestForProfile/Pictures";

const CommunityDetails = async ({ params }) => {
	const res = await fetch(apiUrl + "/community-profiles/" + params.id);
	const data = await res.json();

	return (
		<div className="mb-8">
			<GoBack />
			<div className={styles.content}>
				<div className={styles.left}>
					<Pictures
						id={params.id}
						name={data.name}
						imgsNumber={data.imgsNumber}
					/>
				</div>
				<div className={styles.right}>
					<p>
						Community : <strong>{data.name}</strong>
					</p>
					<p>
						District : <strong>{data.district}</strong>
					</p>
					<p>
						Region : <strong>{data.region}</strong>
					</p>
					<Btn id={params.id} />
					<RequestBtn id={params.id} />
				</div>
			</div>
		</div>
	);
};

export default CommunityDetails;

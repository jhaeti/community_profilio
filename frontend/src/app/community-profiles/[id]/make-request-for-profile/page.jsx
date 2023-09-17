import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import GoBack from "@/components/GoBack";
import styles from "./styles.module.css";
import Inputs from "@/components/MakeRequestForProfile/Inputs";

const MakeRequestPage = ({ params }) => {
	return (
		<div>
			<GoBack />
			<Box sx={{ width: "100%", maxWidth: 500 }}>
				<Typography
					className={styles.h3}
					variant="h4"
					mt={2}
					gutterBottom
				>
					Request for community profile
				</Typography>
			</Box>
			<Inputs id={params.id} />
		</div>
	);
};

export default MakeRequestPage;

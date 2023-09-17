import GoBack from "@/components/GoBack";

const layout = ({ children }) => {
	return (
		<div>
			<GoBack />
			{children}
		</div>
	);
};

export default layout;

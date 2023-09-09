import TableItem from "./TableItem";
import styles from "./styles.module.css";
const CommunityProfileTable = ({ data }) => {
	return (
		<table className={styles.table}>
			<thead>
				<tr>
					<td>Community</td>

					<td>District</td>

					<td>Region</td>

					<td>Date(YYYY-MM-DD)</td>
				</tr>
			</thead>
			<tbody>
				{data.map((item, i) => (
					<TableItem key={i} item={item} />
				))}
			</tbody>
		</table>
	);
};

export default CommunityProfileTable;

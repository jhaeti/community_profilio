import styles from "./styles.module.css";
import TableItem from "./TableItem";
const Table = ({ data }) => {
	return (
		<table className={styles.table}>
			<thead>
				<tr>
					<td>ID</td>

					<td>Community</td>

					<td>District</td>

					<td>Region</td>

					<td>Operations</td>

					<td>Date(Y/M/D)</td>
				</tr>
			</thead>
			<tbody>
				{data &&
					data.map((item, i) => <TableItem key={i} item={item} />)}
			</tbody>
		</table>
	);
};

export default Table;

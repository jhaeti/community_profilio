import { usePathname } from "next/navigation";
import Link from "next/link";

import styles from "./styles.module.css";

const NavMenuItem = ({ text, url }) => {
	const pathname = usePathname();
	const isActive = pathname.indexOf(url) >= 0;

	return (
		<li className={styles.nav_item}>
			<Link className={isActive ? styles.active : ""} href={url}>
				{text}
			</Link>
			<div></div>
		</li>
	);
};

export default NavMenuItem;

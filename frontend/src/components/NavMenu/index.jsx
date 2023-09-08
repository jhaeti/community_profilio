import Link from "next/link";
import styles from "./styles.module.css";
import NavMenuItem from "./NavMenuItem";
const NavMenu = () => {
	return (
		<nav className={styles.nav}>
			<div className="container">
				<div className={styles.nav_branding}>Logo</div>
				<ul className={styles.nav_menu}>
					<NavMenuItem
						text="community profiles"
						url="/community-profiles"
					/>
					<NavMenuItem text="login" url="/admin-login" />
				</ul>
			</div>
		</nav>
	);
};

export default NavMenu;

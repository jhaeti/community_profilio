"use client";
import { useLayoutEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

import useUserContext from "@/hooks/useUserContext";
import { REMOVE_USER, ADD_USER } from "@/contexts/UserContext";
import styles from "./styles.module.css";
import apiUrl from "@/utils/apiUrl";

import NavMenuItem from "./NavMenuItem";

const NavMenu = ({ userData }) => {
	const router = useRouter();
	const [redirectToAdmin, setRedirectToAdmin] = useState(false);
	const pathname = usePathname();
	const {
		state: { isAuthenticated },
		dispatch,
	} = useUserContext();

	const isActive = (url) => pathname.indexOf(url) >= 0;

	useLayoutEffect(() => {
		if (userData) {
			dispatch({
				type: ADD_USER,
				user: userData.user,
				token: userData.token,
			});
		}
	}, []);

	function logout() {
		fetch(apiUrl + "/users/logout", {
			credentials: "include",
		}).then(() => {
			router.push("/admin-login");
			dispatch({ type: REMOVE_USER });
		});
		// const res = await fetch(apiUrl + "/users/logout", {
		// 	credentials: "include",
		// });
		// if (res.status === 200) {
		// fetch(apiUrl + "/users/logout", {
		// 	credentials: "include",
		// })
		// 	.then((res) => res.json())
		// 	.then((data) => {
		// 		setRedirectToAdmin
		// 	})

		// 		dispatch({ type: REMOVE_USER });
		// 		router.push("/admin-login");

		// router.refresh();
		// }
	}

	return (
		<nav className={styles.nav}>
			<div className="container">
				<div className={styles.nav_branding}>communityProfilio</div>
				<ul className={styles.nav_menu}>
					<li className={styles.nav_item}>
						<Link
							className={
								isActive("/community-profiles")
									? styles.active
									: ""
							}
							href={"/community-profiles"}
						>
							community profiles{" "}
						</Link>
						<div></div>
					</li>
					{!isAuthenticated ? (
						<li className={styles.nav_item}>
							<Link
								className={
									isActive("/admin-login")
										? styles.active
										: ""
								}
								href={"/admin-login"}
							>
								login{" "}
							</Link>
							<div></div>
						</li>
					) : (
						<>
							<li className={styles.nav_item}>
								<Link
									className={
										isActive("/admin-panel")
											? styles.active
											: ""
									}
									href={"/admin-panel"}
								>
									Admin-panel
								</Link>
								<div></div>
							</li>
							<li className={styles.nav_item}>
								<button
									className={false ? styles.active : ""}
									onClick={logout}
								>
									logout
								</button>
								<div></div>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
};

// const Navbar = ({ userData }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const {
//     state: { isAuthenticated },
//     dispatch,
//   } = useUserContext();

//   useLayoutEffect(() => {
//     userData &&
//       dispatch({ type: ADD_USER, user: userData.user, token: userData.token });
//   }, []);

//   function logout() {
//     fetch(apiUrl + "/users/logout", {
//       credentials: "include",
//     }).then(() => {
//       dispatch({ type: REMOVE_USER });
//       router.push("/auth/login");
//     });
//   }

//   return (
//     <nav
//       style={{
//         "--bg-color":
//           pathname === "/" || pathname.startsWith("/auth")
//             ? "var(--color-dark-transparent)"
//             : "var(--color-white-transparent)",
//       }}
//       className={styles.nav}
//     >
//       <div className={"container" + " " + styles.container}>
//         <Link href="/">
//           <Image
//             priority={true}
//             alt="Art hub local logo"
//             src={
//               pathname === "/" || pathname.startsWith("/auth")
//                 ? "/logo.svg"
//                 : "/logo_dark.svg"
//             }
//             width={94}
//             height={54}
//           />
//         </Link>
//         <ul>
//           <li>
//             <Link
//               style={{
//                 color:
//                   pathname === "/" || pathname.startsWith("/auth")
//                     ? "var(--color-white)"
//                     : "var(--color-dark)",
//               }}
//               href={isAuthenticated ? "/profile/orders" : "/auth/login"}
//             >
//               {isAuthenticated ? "Profile" : "Login"}
//             </Link>
//           </li>
//           <li className={styles.join}>
//             <button
//               onClick={() => {
//                 isAuthenticated ? logout() : router.push("/auth/join");
//               }}
//               className={fonts.primaryBold.className + " " + styles.btn}
//             >
//               {isAuthenticated ? "Logout" : "Join"}
//             </button>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

export default NavMenu;

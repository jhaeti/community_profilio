import { Inter } from "next/font/google";
import "./index.css";
import NavMenu from "@/components/NavMenu";
import Provider from "@/contexts/Provider";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Provider>
					<NavMenu />
					<div className="container">{children}</div>
					<Footer />
				</Provider>
			</body>
		</html>
	);
}

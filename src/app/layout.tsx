import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import "@/styles/globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<div
					className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
				>
					<main className={styles.main}>{children}</main>
				</div>
			</body>
		</html>
	);
}

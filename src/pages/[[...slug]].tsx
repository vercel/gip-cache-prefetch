import { useEffect, useState } from "react";
import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { NextPageContext } from "next";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

// Function to generate random slugs
const generateRandomString = (length: number) => {
	const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
	return Array.from({ length }, () =>
		chars.charAt(Math.floor(Math.random() * chars.length)),
	).join("");
};

const API_URL = `${process.env.NEXT_PUBLIC_APP_URL}/api/time`;

const generateRandomSlugs = () => {
	const slugs = [];

	for (let i = 0; i < 5; i++) {
		// Generate random strings between 3 and 8 characters
		slugs.push(generateRandomString(Math.floor(Math.random() * 6) + 3));
	}

	return slugs;
};

export default function Home({ time }: { time: number }) {
	const router = useRouter();
	const { slug } = router.query;
	const [randomSlugs, setRandomSlugs] = useState<string[]>([]);

	// Initialize random slugs
	useEffect(() => {
		setRandomSlugs(generateRandomSlugs());
	}, []);

	// Format the time
	const formattedTime = new Date(time).toLocaleString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: true,
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	// Format the slug for display
	const displaySlug = Array.isArray(slug) ? slug.join("/") : slug || "home";

	const handleRefresh = () => {
		setRandomSlugs(generateRandomSlugs());
	};

	useEffect(() => {
		if (randomSlugs.length) {
			const urls = randomSlugs.map(
				(randomSlug) => `${API_URL}?path=${randomSlug}`,
			);

			// Prefetch with `fetch`. The `priority` doesn't have the best browser support.
			// Promise.all(urls.map((url) => fetch(url, { priority: "low" }))).then(
			// 	() => {
			// 		console.log("Prefetch complete");
			// 	},
			// );

			const links = urls.map((url) => {
				const link = document.createElement("link");
				link.href = url;
				link.rel = "prefetch";
				return link;
			});

			document.body.append(...links);
		}
	}, [randomSlugs]);

	return (
		<>
			<Head>
				<title>{`${displaySlug} - Server Time`}</title>
				<meta
					name="description"
					content="Server time display with route information"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div
				className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
			>
				<main className={styles.main}>
					<div className={styles.slug}>/{displaySlug}</div>
					<div className={styles.timeDisplay}>{formattedTime}</div>
					<div className={styles.linkSection}>
						<button onClick={handleRefresh} className={styles.refreshButton}>
							Refresh Links
						</button>
						<ul className={styles.linkList}>
							{randomSlugs.map((randomSlug, index) => (
								<li key={index}>
									<Link href={`/${randomSlug}`} prefetch>
										/{randomSlug}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</main>
			</div>
		</>
	);
}

Home.getInitialProps = async (ctx: NextPageContext) => {
	const res = await fetch(`${API_URL}?path=${ctx.query.slug || "home"}`);
	const json = await res.json();
	return json;
};

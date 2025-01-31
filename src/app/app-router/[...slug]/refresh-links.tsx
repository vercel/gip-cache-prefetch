"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { generateRandomSlugs } from "@/lib/generate-random-slugs";
import styles from "@/styles/Home.module.css";

const API_URL = `${process.env.NEXT_PUBLIC_APP_URL}/api/time`;

export function RefreshLinks() {
	const [randomSlugs, setRandomSlugs] = useState<string[]>([]);

	// Initialize random slugs
	useEffect(() => {
		setRandomSlugs(generateRandomSlugs());
	}, []);

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

			// document.body.append(...links);
		}
	}, [randomSlugs]);

	return (
		<div className={styles.linkSection}>
			<button onClick={handleRefresh} className={styles.refreshButton}>
				Refresh Links
			</button>
			<ul className={styles.linkList}>
				{randomSlugs.map((randomSlug, index) => (
					<li key={index}>
						<Link href={`/app-router/${randomSlug}`} prefetch>
							/{randomSlug}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

import { Suspense } from "react";
import styles from "@/styles/Home.module.css";
import { RefreshLinks } from "./refresh-links";
import { ServerTime } from "./server-time";

// export const dynamic = "error";

export default async function Home({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	// Format the slug for display
	const displaySlug = Array.isArray(slug) ? slug.join("/") : slug || "home";

	return (
		<>
			<div className={styles.slug}>/{displaySlug}</div>
			<Suspense fallback={<div className={styles.timeDisplay}>Loading...</div>}>
				<ServerTime slug={slug} />
			</Suspense>
			<RefreshLinks />
		</>
	);
}

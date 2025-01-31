import styles from "@/styles/Home.module.css";

const API_URL = `${process.env.NEXT_PUBLIC_APP_URL}/api/time`;

export async function ServerTime({ slug }: { slug: string }) {
	const res = await fetch(`${API_URL}?path=${slug || "home"}`, {
		next: { revalidate: 10 },
		cache: "force-cache",
	});
	const { time } = await res.json();

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

	return <div className={styles.timeDisplay}>{formattedTime}</div>;
}

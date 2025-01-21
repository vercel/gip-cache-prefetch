import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	console.log("Server time", req.query.path);
	await new Promise((resolve) => setTimeout(resolve, 2000));
	// Cache the asset in the browser and in Vercel for 1 hour.
	res.setHeader(
		"Cache-Control",
		"public, max-age=10, stale-while-revalidate=50",
		// "public, max-age=3600, immutable",
	);
	res.status(200).json({ time: Date.now(), path: req.query.path });
}

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	await new Promise((resolve) => setTimeout(resolve, 2000));
	res.setHeader(
		"Cache-Control",
		"public, max-age=10, stale-while-revalidate=50, immutable",
	);
	res.status(200).json({ time: Date.now() });
}

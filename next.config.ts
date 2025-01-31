import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactStrictMode: true,
	rewrites: async () => {
		return {
			beforeFiles: [
				{
					source: "/:path*",
					has: [
						{
							type: "header",
							key: "x-edge-function",
							value: "1",
						},
					],
					destination: "/api/edge?path=:path*",
				},
			],
		} as any;
	},
	// experimental: {
	// 	staleTimes: {
	// 		dynamic: 1,
	// 		static: 1,
	// 	},
	// },
};

export default nextConfig;

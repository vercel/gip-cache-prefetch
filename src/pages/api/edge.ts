import type { NextRequest } from "next/server";

export const runtime = "edge";

export default async function handler(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const path = searchParams.get("path") || "";

	console.log("REQ", req.url, req.nextUrl);

	// This are all the headers you want to have be sent down to the browser.
	const responseHeaders = new Headers({
		"x-redirect-custom": "1",
	});

	const location = new URL(`/${path}`, req.url).toString();
	// Go to the origin for the content, forward the method and all headers
	// from the original request.
	const pageResponse = await fetch(location, { ...req });

	// Merge responseHeaders with the page response headers.
	for (const [key, value] of responseHeaders) {
		pageResponse.headers.set(key, value);
	}

	return pageResponse;
}

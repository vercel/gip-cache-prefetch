const generateRandomString = (length: number) => {
	const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
	return Array.from({ length }, () =>
		chars.charAt(Math.floor(Math.random() * chars.length)),
	).join("");
};

export const generateRandomSlugs = () => {
	const slugs = [];

	for (let i = 0; i < 5; i++) {
		// Generate random strings between 3 and 8 characters
		slugs.push(generateRandomString(Math.floor(Math.random() * 6) + 3));
	}

	// When needing a fixed list use this.
	// return ["i4g", "oahbdv", "rszr851q", "bl4bl34d", "wn1r"];

	return slugs;
};

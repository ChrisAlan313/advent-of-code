export const gameLineParser = (
	line: string,
): { game: number; sets: { red?: number; blue?: number; green?: number }[] } => {
	const lineFormat = /Game \d+: (\d+ (red|blue|green)(, |; |))+/;
	if (!lineFormat.test(line)) {
		throw new Error(`Incorrect format. Line given is: ${line}`);
	}

	// Split by `:` or `;`
	const lineParts = line.split(/[:;]/) as Array<string>;
	const gameNumber = lineParts.shift()?.replace('Game ', '') as string;
	const sets = lineParts.map((set) => {
		const pairs = set.split(',').map((str) => {
			const s = str.trim().split(' ').reverse();
			return [s[0], +s[1]];
		});
		return Object.fromEntries(pairs);
	});

	return {
		game: +gameNumber,
		sets,
	};
};

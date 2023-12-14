type Set = {
	red?: number;
	blue?: number;
	green?: number;
};
type Game = {
	id: number;
	sets: Set[];
};

export const gameLineParser = (line: string): Game => {
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
		id: +gameNumber,
		sets,
	};
};

export const isGamePossible = (game: Game, bounds: Set): boolean => {
	for (const set of game.sets) {
		if (!isSetPossible(set, bounds)) {
			return false;
		}
	}
	return true;
};

export const isSetPossible = (set: Set, bounds: Set): boolean => {
	const redBounds = bounds.red ?? 0;
	const blueBounds = bounds.blue ?? 0;
	const greenBounds = bounds.green ?? 0;

	if (set.red && set.red > redBounds) {
		return false;
	}
	if (set.blue && set.blue > blueBounds) {
		return false;
	}
	if (set.green && set.green > greenBounds) {
		return false;
	}

	return true;
};

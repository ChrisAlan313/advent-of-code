export type Round = {
	red?: number;
	blue?: number;
	green?: number;
};
export type Game = {
	id: number;
	rounds: Round[];
};

export const gameLineParser = (line: string): Game => {
	const lineFormat = /Game \d+: (\d+ (red|blue|green)(, |; |))+/;
	if (!lineFormat.test(line)) {
		throw new Error(`Incorrect format. Line given is: ${line}`);
	}

	// Split by `:` or `;`
	const lineParts = line.split(/[:;]/) as Array<string>;
	const gameNumber = lineParts.shift()?.replace('Game ', '') as string;
	const rounds = lineParts.map((round) => {
		const pairs = round.split(',').map((str) => {
			const s = str.trim().split(' ').reverse();
			return [s[0], +s[1]];
		});
		return Object.fromEntries(pairs);
	});

	return {
		id: +gameNumber,
		rounds,
	};
};

export const isGamePossible = (game: Game, bounds: Round): boolean => {
	for (const round of game.rounds) {
		if (!isRoundPossible(round, bounds)) {
			return false;
		}
	}
	return true;
};

export const isRoundPossible = (round: Round, bounds: Round): boolean => {
	const redBounds = bounds.red ?? 0;
	const blueBounds = bounds.blue ?? 0;
	const greenBounds = bounds.green ?? 0;

	if (round.red && round.red > redBounds) {
		return false;
	}
	if (round.blue && round.blue > blueBounds) {
		return false;
	}
	if (round.green && round.green > greenBounds) {
		return false;
	}

	return true;
};

export const allPossibleGames = (games: Game[], bounds: Round): Game[] => {
	return [];
};

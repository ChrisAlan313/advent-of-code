import { BunFile } from 'bun';

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
	return games.filter((game) => isGamePossible(game, bounds));
};

export const fileTotaller = async (file: BunFile, bounds: Round): Promise<number> => {
	const text = await file.text();
	const lines = text.split('\n');
	const games = lines.map<Game>((line) => gameLineParser(line));
	const possibleGames = allPossibleGames(games, bounds);

	return possibleGames
		.map((game) => game.id)
		.reduce((acc, cur) => {
			return acc + cur;
		}, 0);
};

// console.log(
// 	'Determine which games would have been possible if the bag had been' +
// 		'loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes.' +
// 		'What is the sum of the IDs of those games?',
// 	await fileTotaller(Bun.file(`${import.meta.dir}/inputs/day-2.txt`), {
// 		red: 12,
// 		green: 13,
// 		blue: 14,
// 	}),
// );

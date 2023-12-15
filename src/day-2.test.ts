import { describe, expect, it } from 'bun:test';
import {
	type Game,
	type Round,
	allPossibleGames,
	gameLineParser,
	isGamePossible,
	isRoundPossible,
} from './day-2';

describe('gameLineParser', () => {
	it('should throw if line is malformed', () => {
		expect(() => gameLineParser('')).toThrow();
		expect(() => gameLineParser('Game 1:')).toThrow();
		expect(() => gameLineParser('Game 1: 1 purple')).toThrow();
	});
	it('should return the game id', () => {
		const line =
			'Game 7: 7 green, 12 blue, 3 red; 19 red, 12 blue; 8 blue, 8 red, 7 green; 6 red, 7 green, 5 blue';
		const expected = 7;
		const actual = gameLineParser(line).id;
		expect(actual).toBe(expected);
	});
	it('should return the right number of rounds', () => {
		const line = 'Game 13: 1 green, 6 red; 7 blue, 13 red, 1 green; 3 blue, 4 red';
		const expected = 3;
		const actual = gameLineParser(line).rounds.length;
		expect(actual).toBe(expected);
	});
	it('should return the a collection of round', () => {
		const line = 'Game 32: 1 red, 7 blue; 1 red, 8 blue; 1 red, 2 green, 13 blue';
		const expected = [
			{ red: 1, blue: 7 },
			{ red: 1, blue: 8 },
			{ red: 1, green: 2, blue: 13 },
		];
		const actual = gameLineParser(line).rounds;
		expect(actual).toEqual(expected);
	});
});

describe('isGamePossible', () => {
	describe('given a possible game', () => {
		it('returns true', () => {
			const game = {
				id: 4,
				rounds: [
					{ red: 1, blue: 7 },
					{ red: 1, blue: 8 },
					{ red: 1, green: 2, blue: 13 },
				],
			};
			const bounds = { red: 1, green: 2, blue: 13 };

			expect(isGamePossible(game, bounds)).toBe(true);
		});
	});
	describe('given an impossible game', () => {
		it('returns false if too many reds in a round', () => {
			const game = {
				id: 4,
				rounds: [
					{ red: 1, blue: 7 },
					{ red: 2, blue: 8 },
					{ red: 1, green: 2, blue: 13 },
				],
			};
			const bounds = { red: 1, green: 2, blue: 13 };

			expect(isGamePossible(game, bounds)).toBe(false);
		});
		it('returns false if too many greens in a round', () => {
			const game = {
				id: 4,
				rounds: [{ red: 1, blue: 7 }, { blue: 8 }, { red: 1, green: 3, blue: 13 }],
			};
			const bounds = { red: 1, green: 2, blue: 13 };

			expect(isGamePossible(game, bounds)).toBe(false);
		});
		it('returns false if too many blues in a round', () => {
			const game = {
				id: 4,
				rounds: [{ red: 1, blue: 7 }, { blue: 21 }, { red: 1, green: 3, blue: 13 }],
			};
			const bounds = { red: 1, green: 2, blue: 13 };

			expect(isGamePossible(game, bounds)).toBe(false);
		});
	});
});

describe('isRoundPossible', () => {
	describe('given a possible round', () => {
		it('returns true for the same', () => {
			const round = { red: 1, green: 2, blue: 13 };
			const bounds = { red: 1, green: 2, blue: 13 };

			expect(isRoundPossible(round, bounds)).toBe(true);
		});
		it('returns true for the same', () => {
			const round = { red: 1, green: 1, blue: 12 };
			const bounds = { red: 1, green: 2, blue: 13 };

			expect(isRoundPossible(round, bounds)).toBe(true);
		});
	});
	describe('given an impossible round', () => {
		it('returns false if too many reds in a round', () => {
			const round = { red: 2, blue: 7 };
			const bounds = { red: 1, green: 2, blue: 13 };

			expect(isRoundPossible(round, bounds)).toBe(false);
		});
		it('returns false if too many blues in a round', () => {
			const round = { blue: 99 };
			const bounds = { red: 1, green: 2, blue: 13 };

			expect(isRoundPossible(round, bounds)).toBe(false);
		});
		it('returns false if too many greens in a round', () => {
			const round = { red: 1, green: 3, blue: 7 };
			const bounds = { red: 1, green: 2, blue: 13 };

			expect(isRoundPossible(round, bounds)).toBe(false);
		});
	});
});

describe('allPossibleGames', () => {
	it('returns an empty array if no possible games', () => {
		const expected: Game[] = [];
		const actual = allPossibleGames(
			[
				{
					id: 4,
					rounds: [{ red: 1, blue: 7 }, { blue: 21 }, { red: 1, green: 3, blue: 13 }],
				},
				{
					id: 5,
					rounds: [{ red: 7 }, { blue: 4 }, { green: 3, blue: 13 }],
				},
			],
			{ red: 99 },
		);

		expect(expected).toEqual(actual);
	});
	it('returns array of games within bounds', () => {
		const passingGame: Game = {
			id: 4,
			rounds: [{ red: 1, blue: 7 }, { blue: 2 }, { red: 1, green: 3, blue: 3 }],
		};
		const notPassingGame: Game = {
			id: 5,
			rounds: [{ red: 7 }, { blue: 4 }, { green: 3, blue: 13 }],
		};
		const games = [passingGame, notPassingGame];
		const bounds: Round = { red: 1, blue: 7, green: 3 };
		const expected = [passingGame];
		const actual = allPossibleGames(games, bounds);

		expect(expected).toEqual(actual);
	});
});

import { describe, expect, it } from 'bun:test';
import { gameLineParser, isGamePossible, isSetPossible } from './day-2';

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
	it('should return the right number of sets', () => {
		const line = 'Game 13: 1 green, 6 red; 7 blue, 13 red, 1 green; 3 blue, 4 red';
		const expected = 3;
		const actual = gameLineParser(line).sets.length;
		expect(actual).toBe(expected);
	});
	it('should return the a collection of set', () => {
		const line = 'Game 32: 1 red, 7 blue; 1 red, 8 blue; 1 red, 2 green, 13 blue';
		const expected = [
			{ red: 1, blue: 7 },
			{ red: 1, blue: 8 },
			{ red: 1, green: 2, blue: 13 },
		];
		const actual = gameLineParser(line).sets;
		expect(actual).toEqual(expected);
	});
});

describe('isGamePossible', () => {
	describe('given a possible game', () => {
		it('returns true', () => {
			const game = {
				id: 4,
				sets: [
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
		it('returns false if too many reds in a set', () => {
			const game = {
				id: 4,
				sets: [
					{ red: 1, blue: 7 },
					{ red: 2, blue: 8 },
					{ red: 1, green: 2, blue: 13 },
				],
			};
			const bounds = { red: 1, green: 2, blue: 13 };

			expect(isGamePossible(game, bounds)).toBe(false);
		});
		it('returns false if too many greens in a set', () => {
			const game = {
				id: 4,
				sets: [{ red: 1, blue: 7 }, { blue: 8 }, { red: 1, green: 3, blue: 13 }],
			};
			const bounds = { red: 1, green: 2, blue: 13 };

			expect(isGamePossible(game, bounds)).toBe(false);
		});
		it('returns false if too many blues in a set', () => {
			const game = {
				id: 4,
				sets: [{ red: 1, blue: 7 }, { blue: 21 }, { red: 1, green: 3, blue: 13 }],
			};
			const bounds = { red: 1, green: 2, blue: 13 };

			expect(isGamePossible(game, bounds)).toBe(false);
		});
	});
});

describe('isSetPossible', () => {
	describe('given a possible set', () => {
		it('returns true for the same', () => {
			const set = { red: 1, green: 2, blue: 13 };
			const bounds = { red: 1, green: 2, blue: 13 };

			expect(isSetPossible(set, bounds)).toBe(true);
		});
		it('returns true for the same', () => {
			const set = { red: 1, green: 1, blue: 12 };
			const bounds = { red: 1, green: 2, blue: 13 };

			expect(isSetPossible(set, bounds)).toBe(true);
		});
	});
	describe('given an impossible game', () => {
		it('returns false if too many reds in a set', () => {
			const set = { red: 2, blue: 7 };
			const bounds = { red: 1, green: 2, blue: 13 };

			expect(isSetPossible(set, bounds)).toBe(false);
		});
		it('returns false if too many blues in a set', () => {
			const set = { blue: 99 };
			const bounds = { red: 1, green: 2, blue: 13 };

			expect(isSetPossible(set, bounds)).toBe(false);
		});
		it('returns false if too many greens in a set', () => {
			const set = { red: 1, green: 3, blue: 7 };
			const bounds = { red: 1, green: 2, blue: 13 };

			expect(isSetPossible(set, bounds)).toBe(false);
		});
	});
});

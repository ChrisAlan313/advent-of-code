import { describe, expect, it } from 'bun:test';
import { combineDigits, convertWordToNum, extractFirstAndLastDigits, fileTotaller } from './day-1';

describe('integration', () => {
	it('solves day of advent 1-1', async () => {
		const file = Bun.file(`${import.meta.dir}/inputs/day-1.txt`);
		const expectedTotal = 55208;
		const actualTotal = await fileTotaller(file);

		expect(actualTotal).toBe(expectedTotal);
	});

	it('solves day of advent 1-2', async () => {
		const file = Bun.file(`${import.meta.dir}/inputs/day-1.txt`);
		const expectedTotal = 54578;
		const actualTotal = await fileTotaller(file, { readWords: true });

		expect(actualTotal).toBe(expectedTotal);
	});
});

describe('fileTotaller', () => {
	describe('without readWords option', () => {
		it('takes a  file and returns the sum of the first and last digits', async () => {
			const testFile = Bun.file('testFile.txt');
			await Bun.write(
				testFile,
				`rhqrpdxsqhgxzknr2foursnrcfthree
	2bmckl
	four95qvkvveight5
	2tqbxgrrpmxqfglsqjkqthree6nhjvbxpflhr1eightwohr`,
			);
			const expectedTotal = 22 + 22 + 95 + 21;
			const actualTotal = await fileTotaller(testFile);

			expect(actualTotal).toBe(expectedTotal);
		});
	});
});

describe('combineDigits', () => {
	it('concatonates two digits into a single two dgit number', () => {
		expect(combineDigits(['1', '1'])).toBe(11);
		expect(combineDigits(['9', '1'])).toBe(91);
	});
});

describe('extractFirstAndLastDigits', () => {
	describe('without the readWords option', () => {
		it('gets the first and last digits in the string', () => {
			expect(extractFirstAndLastDigits('211a1')).toEqual([2, 1]);
			expect(extractFirstAndLastDigits('12')).toEqual([1, 2]);
			expect(extractFirstAndLastDigits('7eight7fmqpzrjlcctjvhrdcjgm2mgkqrbdcmzlzngbkqlj1')).toEqual(
				[7, 1],
			);
		});

		it('returns single digit as first and last digits when only one digit in string', () => {
			expect(extractFirstAndLastDigits('1')).toEqual([1, 1]);
			expect(extractFirstAndLastDigits('a2')).toEqual([2, 2]);
		});

		it('throws error if no digit is in string', () => {
			const str = 'hello';
			expect(() => extractFirstAndLastDigits(str)).toThrow(Error);
		});
	});

	describe('without the readWords option', () => {
		const options = { readWords: true };
		it('gets the first and last digits in the string', () => {
			expect(extractFirstAndLastDigits('13two', options)).toEqual([1, 2]);
			expect(extractFirstAndLastDigits('eight71', options)).toEqual([8, 1]);
		});

		it('returns single digit as first and last digits when only one digit in string', () => {
			expect(extractFirstAndLastDigits('two', options)).toEqual([2, 2]);
			expect(extractFirstAndLastDigits('oonee', options)).toEqual([1, 1]);
		});

		it('throws error if no digit is in string', () => {
			const str = 'hello';
			expect(() => extractFirstAndLastDigits(str, options)).toThrow(Error);
		});
	});
});

describe('convertWordToNum', () => {
	it('takes digit word and returns number', () => {
		expect(convertWordToNum('five')).toBe(5);
	});

	it('throws error if word is not a digit word', () => {
		expect(() => convertWordToNum('hello')).toThrow(Error);
	});
});

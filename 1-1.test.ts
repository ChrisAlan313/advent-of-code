import { describe, expect, it, spyOn } from 'bun:test';
import { combineDigits, extractFirstAndLastDigits } from './1-1';

describe('combineDigits', () => {
	it('concatonates two digits into a single two dgit number', () => {
		expect(combineDigits(['1', '1'])).toBe(11);
		expect(combineDigits(['9', '1'])).toBe(91);
	});
});

describe('extractFirstAndLastDigits', () => {
	it('gets the first and last digits in the string', () => {
		expect(extractFirstAndLastDigits('211a1')).toEqual(['2', '1']);
		expect(extractFirstAndLastDigits('12')).toEqual(['1', '2']);
		expect(extractFirstAndLastDigits('7eight7fmqpzrjlcctjvhrdcjgm2mgkqrbdcmzlzngbkqlj1')).toEqual([
			'7',
			'1',
		]);
	});

	it('returns single digit as first and last digits when only one digit in string', () => {
		expect(extractFirstAndLastDigits('1')).toEqual(['1', '1']);
		expect(extractFirstAndLastDigits('a2')).toEqual(['2', '2']);
	});

	it('returns null and throws console error if no digit is in string', () => {
		const str = 'hello';
		const spy = spyOn(console, 'error');
		expect(extractFirstAndLastDigits(str)).toEqual(null);
		expect(spy).toHaveBeenCalledTimes(1);
	});
});

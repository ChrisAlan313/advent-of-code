// 1. Take the first and last number of the string and concatonate them
// 2. Sum all the numbers

import { BunFile } from 'bun';

// Solve problem

// Library

export const fileTotaller = async (file: BunFile): Promise<number> => {
	const text = await file.text();
	const lines = text.split('\n');
	const numbers = lines.map<number>((line) => combineDigits(extractFirstAndLastDigits(line)));

	return numbers.reduce((acc, cur) => {
		return acc + cur;
	}, 0);
};

export const combineDigits = (digits: [string, string]): number => {
	return +digits.join('');
};

export const extractFirstAndLastDigits = (str: string): [string, string] => {
	// Regex to capture all digits in string
	const rgx: RegExp = /[0-9]/g;
	const digits = [...str.matchAll(rgx)].flat();
	if (digits === undefined || digits.length === 0) {
		throw new Error(`No digits in str. Value of str is ${str}`);
	}
	const firstDigit = digits[0];
	const lastDigit = digits.length === 1 ? digits[0] : digits[digits.length - 1];

	return [firstDigit, lastDigit];
};

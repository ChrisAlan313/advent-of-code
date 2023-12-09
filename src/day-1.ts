// 1. Take the first and last number of the string and concatonate them
// 2. Sum all the numbers

import { BunFile } from 'bun';

interface Options {
	// Are number words (one, two, three) read as digits?
	readWords?: boolean;
}

export const fileTotaller = async (file: BunFile, options?: Options): Promise<number> => {
	const text = await file.text();
	const lines = text.split('\n');
	const numbers = lines.map<number>((line) =>
		combineDigits(extractFirstAndLastDigits(line, options)),
	);

	return numbers.reduce((acc, cur) => {
		return acc + cur;
	}, 0);
};

export const combineDigits = (digits: [number, number]): number => {
	return +digits.join('');
};

export const extractFirstAndLastDigits = (str: string, options?: Options): [number, number] => {
	// The trick here is that sometimes a string has two words that share a letter.
	// ie. 'mcnine4sixrloneightspv' which has 'oneight'. The last number word in the
	// string is eight, but that isn't picked up if you parse the string one letter
	// at a time left to right.

	// I'm going to rework this to take the string and find the first digit, then stop
	// and reverse the string to find the first backwards digit and use that as the last.
	// This worked, but ended up with a high amount of repetition. I'm moving on.

	const readWords = options?.readWords;

	const rgx = readWords ? /[0-9]|zero|one|two|three|four|five|six|seven|eight|nine/g : /[0-9]/g;
	const rgxBackwards = readWords
		? /[0-9]|orez|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/g
		: /[0-9]/g;

	const digits = str.match(rgx);
	if (digits === null) {
		throw new Error(`No digits in str. Value of str is ${str}`);
	}
	const firstDigit = digits[0].length === 1 ? +digits[0] : convertWordToNum(digits[0]);

	const strBackwards = str.split('').reverse().join('');
	const digitsBackwards = strBackwards.match(rgxBackwards);
	if (digitsBackwards === null) {
		throw new Error(`No digits in str. Value of str is ${strBackwards}`);
	}
	const lastDigit =
		digitsBackwards[0].length === 1 ? +digitsBackwards[0] : convertWordToNum(digitsBackwards[0]);

	return [firstDigit, lastDigit];
};

export const convertWordToNum = (word: string): number => {
	switch (word) {
		case 'zero':
		case 'orez':
			return 0;
		case 'one':
		case 'eno':
			return 1;
		case 'two':
		case 'owt':
			return 2;
		case 'three':
		case 'eerht':
			return 3;
		case 'four':
		case 'ruof':
			return 4;
		case 'five':
		case 'evif':
			return 5;
		case 'six':
		case 'xis':
			return 6;
		case 'seven':
		case 'neves':
			return 7;
		case 'eight':
		case 'thgie':
			return 8;
		case 'nine':
		case 'enin':
			return 9;
		default:
			throw new Error(`Word ${word} is not a number word`);
	}
};

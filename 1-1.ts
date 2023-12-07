// 1. Take the first and last number of the string and concatonate them
// 2. Sum all the numbers

export const combineDigits = (digits: [string, string]): number => {
	return +digits.join('');
};

export const extractFirstAndLastDigits = (str: string): string[] | null => {
	// Regex to capture all digits in string
	const rgx: RegExp = /[0-9]/g;
	const digits = [...str.matchAll(rgx)].flat();
	if (digits === undefined || digits.length === 0) {
		console.error(`No digits in str. Value of str is ${str}`);
		return null;
	}
	const firstDigit = digits[0];
	const lastDigit = digits.length === 1 ? digits[0] : digits[digits.length - 1];

	return [firstDigit, lastDigit];
};

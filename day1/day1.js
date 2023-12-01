// Import the 'fs' module for file system operations
import fs from 'fs';

// Function for Part One
function partOne(fileName) {
    // Read the file content, trim extra spaces, and split lines
    const lines = fs.readFileSync('./day1.txt', 'utf-8').trim().split('\n');

    // Extract and sum the first and last numbers from each line
    const values = lines.map((line) => {
        let first = line.split('').find((v) => !Number.isNaN(Number(v)));
        let last = line.split('').findLast((v) => !Number.isNaN(Number(v)));
        return Number(first + last);
    });

    // Return the sum of all values
    return values.reduce((s, v) => s + v);
}

// Regular expressions and mapping for word-to-number conversion
const firstNumberWordsRegExpression = new RegExp(['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'].join('|'));
const lastNumberWordsRegExpression = new RegExp(['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'].join('|').split('').reverse().join(''));
const wordMap = {
    'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9'
}

// Function for Part Two
function partTwo(fileName) {
    // Read the file content, trim extra spaces, and split lines
    const lines = fs.readFileSync('./day1.txt', 'utf-8').trim().split('\n');

    // Extract and sum the first and last numbers from each line using words
    const values = lines.map((line) => {
        // Find the index of the first numeric character in the line
        let firstNumberIndex = line.split('').findIndex((v) => !Number.isNaN(Number(v)));

        // Match the first word representing a number in the line
        let firstWordMatch = line.match(firstNumberWordsRegExpression);

        // Get the index of the first character of the matched word
        let firstWordNumberIndex = firstWordMatch?.index;

        // Determine the first number, considering word-to-number conversion
        let firstNumber = firstNumberIndex != -1 ? (firstWordMatch ? (
            // If numeric character is before the word, use it
            firstNumberIndex < firstWordNumberIndex
                ? line[firstNumberIndex] : wordMap[firstWordMatch[0]]
        ) : line[firstNumberIndex]) : wordMap[firstWordMatch[0]];

        // Find the index of the last numeric character in the line
        let lastNumberIndex = line.split('').findLastIndex((v) => !Number.isNaN(Number(v)));

        // Match the last word representing a number in the reversed line
        let lastWordMatch = line.split('').reverse().join('').match(lastNumberWordsRegExpression);

        // Get the index of the last character of the matched word
        let lastWordNumberIndex = lastWordMatch ? line.length - 1 - lastWordMatch.index : null;

        // Determine the last number, considering word-to-number conversion
        let lastNumber = lastWordMatch ? (
            // If numeric character is after the word, use it
            lastNumberIndex > lastWordNumberIndex
                ? line[lastNumberIndex] : wordMap[lastWordMatch[0].split('').reverse().join('')]
        ) : line[lastNumberIndex];

        // Return the sum of the first and last numbers as a numeric value
        return Number(firstNumber + lastNumber);
    });

    // Return the sum of all values
    return values.reduce((s, v) => s + v);
}


// Output the results for Part One and Part Two
console.log('Part One Answer: ' + partOne('day1.txt'));
console.log('Part Two Answer: ' + partTwo('day1.txt'));

import fs from "fs";
import readline from "readline";

// Usage
const sourceFilePath = "./data/liste_francais.txt";
const excludeFilePath = "./diceware-fr-alt.txt";
const outputFilePath = "./data/filtered_liste_francais.txt";

// Function to check if a word contains an accent
const containsAccent = (word: string): boolean => {
  // Regex to detect characters with accents
  return /[àáâãäåæçèéêëìíîïðñòóôõöøùúûüýÿ]/i.test(word);
};

// Async function to create a set of words from a file
const createWordSetFromFile = async (
  filePath: string,
): Promise<Set<string>> => {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const words = new Set<string>();
  for await (const line of rl) {
    words.add((line.match(/[a-z]{4,9}/) || [])[0] || "");
  }

  return words;
};

// Main function to filter words
const filterWords = async (
  sourceFilePath: string,
  excludeFilePath: string,
  outputFilePath: string,
) => {
  const excludeWords = await createWordSetFromFile(excludeFilePath);
  const sourceFileStream = fs.createReadStream(sourceFilePath);
  const outputFileStream = fs.createWriteStream(outputFilePath);
  const rl = readline.createInterface({
    input: sourceFileStream,
    crlfDelay: Infinity,
  });

  for await (const word of rl) {
    if (
      !containsAccent(word) &&
      word.length >= 4 &&
      word.length <= 9 &&
      word.slice(-1) !== "s" &&
      !["er", "ir"].includes(word.slice(-2)) &&
      !/^[A-Z]/.test(word) &&
      !excludeWords.has(word)
    ) {
      outputFileStream.write(word + "\n");
    }
  }

  outputFileStream.close();
};

filterWords(sourceFilePath, excludeFilePath, outputFilePath)
  .then(() => console.log("Filtering complete."))
  .catch((error) => console.error("An error occurred:", error));

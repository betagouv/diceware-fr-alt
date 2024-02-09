import fs from "fs";
import readline from "readline";

async function readLinesFromFile(filePath: string): Promise<string[]> {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const lines: string[] = [];
  for await (const line of rl) {
    lines.push(line);
  }
  return lines;
}

function arrayIndexToDicewareIndex(index: number) {
  // Convert the index to base-6, adjust digits to range 1-6, and ensure it has 5 digits
  return index
    .toString(6)
    .split("")
    .map((digit) => (parseInt(digit, 6) + 1).toString())
    .join("")
    .padStart(5, "1");
}

async function processFiles() {
  const dictionaryWords = await readLinesFromFile("./diceware-fr-alt.txt");
  const toRemoveWords = await readLinesFromFile("data/to-remove.txt");
  const replacementWords = await readLinesFromFile("data/replacement.txt");

  // Check if there are enough replacement words
  if (toRemoveWords.length > replacementWords.length) {
    throw new Error("Not enough replacement words for the words to remove.");
  }

  let replacementIndex = 0;

  const updatedWords = dictionaryWords
    .map((line) => {
      const word = (line.match(/[a-z]+/) || [])[0] || "";
      const index = toRemoveWords.indexOf(word);
      if (index !== -1) {
        return replacementWords[replacementIndex++];
      }
      return word;
    })
    .sort();

  const updatedDictionary = updatedWords.map((word, index) => {
    return `${arrayIndexToDicewareIndex(index)}\t${word}`;
  });

  fs.writeFileSync("./diceware-fr-alt.txt", updatedDictionary.join("\n"));
}

processFiles()
  .then(() => console.log("Updated dictionary has been created."))
  .catch((error) => console.error("Error:", error.message));

## Updating the Diceware Dictionary

Despite the meticulous effort put into crafting the Diceware list, it's possible that some offensive words may have inadvertently been included. If you encounter any such terms, here is a detailed guide on how to update the list and contribute to making it a more respectful and useful resource for everyone.

### Setting Up the Script Environment

Before executing the TypeScript scripts necessary for updating the dictionary, you need to set up your environment by following these steps:

1. **Clone the Repository and Switch to the Tooling Branch:**
    - Clone the repository
    - Switch to the 'tooling' branch, which contains the necessary scripts, by running:
      ```
      cd diceware-fr-alt
      git checkout tooling
      ```

2. Install [Node.js](https://nodejs.org/en/) on your system if you haven't already.

3. Open a terminal within the project directory and run `npm i` to install the required Node.js packages.

4. Execute any script with `npx ts-node --files scripts/<script-name>.ts`.

### Replacing Unsuitable Words

To ensure the diceware list remains appropriate and useful, follow these steps to replace words deemed not safe for work (NSFW) or offensive:

1. **Identify and List Words for Removal:**
    - Carefully select the words to be removed and list them in `to-remove.txt`.

2. **Prepare a Base List of Common Words:**
    - We downloaded the `liste_francais.txt` shortened list of French words from [3ZSoftware](https://www.3zsoftware.com/fr/listes.php) to obtain a base of common, everyday vocabulary.

3. **Generate a Filtered Word List:**
    - Execute the `word-founder.ts` script to generate a list of words that meet the specific criteria of the diceware-fr-alt list, such as character limit and absence of accents, outputting the results to `filtered_liste_francais.txt`.

4. **Select Replacement Words:**
    - From the `filtered_liste_francais.txt`, carefully select a number of words equal to those in `to-remove.txt` to serve as replacements. Ensure these replacement words adhere to the following criteria:
        - Commonly found in movies and books, ensuring they are part of the average person's vocabulary.
        - No homophones to avoid confusion.
        - Not vulgar, offensive, or inappropriate.
        - Preferably nouns or adjectives.
    - Record the selected replacement words in `replacement.txt`.

5. **Update the Dictionary File:**
    - Execute `npx ts-node --files scripts/update-diceware-list.ts` to update the `diceware-fr-alt.txt` file with the new words. This step integrates the changes into the main dictionary file.

6. **Prepare for Commit:**
    - Before committing the changes, switch back to the master branch by executing `git checkout master`. This command moves you out of the 'tooling' branch and back to the main branch, ensuring that the main branch remains clean and only receives the final updates.

7. **Commit and Share Your Updates:**
    - Commit the updated list to the repository with the new version of the dictionary.
    - Push the updated version and propose a pull request (PR) on the main repository to share your improvements.

This guide is designed to facilitate the continuous improvement of the diceware list, ensuring it remains a secure and inclusive tool for generating passphrases.

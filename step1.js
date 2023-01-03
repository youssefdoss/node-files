'use strict';

const fsP = require('fs/promises');

/** cat: Reads the contents of a text file and prints them,
 * or prints the relevant error message.
 *
 * path: string
 */
async function cat(path) {
  let content;
  try {
    content = await fsP.readFile(path, 'utf8');
  } catch(err) {
    console.log(`Error reading ${path}: ${err}`)
    process.exit(1);
  }
  console.log(content);
}

cat(process.argv[2]);
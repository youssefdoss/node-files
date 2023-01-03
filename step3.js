'use strict';

const fsP = require('fs/promises');
const axios = require('axios');

/** cat: Reads the contents of a text file and prints them,
 * or prints the relevant error message.
 *
 * path: string
 */
async function cat(path) {
  try {
    return await fsP.readFile(path, 'utf8');
  } catch(err) {
    console.error(`Error reading ${path}: ${err}`)
    process.exit(1);
  }
}

/** webCat: Reads the contents of a URL and prints to the console,
 * or prints the relevant error message
 *
 * url: string
 */
async function webCat(url) {
  try {
    return (await axios({url})).data;
  } catch(err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}

/** write: Writes to a file if text and path are defined,
 * or prints the relevant error message
 *
 * text: string
 * path: string
 */
async function write(text, path) {
  try {
    await fsP.writeFile(path, text, 'utf8');
  } catch(err) {
    console.error(`Couldn't write ${path}: ${err}`);
    process.exit(1);
  }
}

async function catOrWebCat(pathOrUrl, newPath) {
  let text;
  if (pathOrUrl.startsWith('http')) {
    text = await webCat(pathOrUrl);
  } else {
    text = await cat(pathOrUrl);
  }

  if (newPath) {
    await write(text, newPath);
  } else {
    console.log(text);
  }
}

let pathOrUrl;
let newPath;

if (process.argv[2] === '--out') {
  pathOrUrl = process.argv[4];
  newPath = process.argv[3];
} else {
  path = process.argv[2];
}

catOrWebCat(pathOrUrl, newPath);

// let pathOrUrl = process.argv[2];

// if (pathOrUrl.startsWith('http')) {
//   // Why didn't we await these?
//   webCat(pathOrUrl);
// } else {
//   cat(pathOrUrl);
// };
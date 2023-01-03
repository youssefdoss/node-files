'use strict';

const fsP = require('fs/promises');
const axios = require('axios');

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

/** webCat: Reads the contents of a URL and prints to the console,
 * or prints the relevant error message
 *
 * url: string
 */
async function webCat(url) {
  let response;
  try {
    response = await axios({url});
  } catch(err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
  console.log(response.data);
}

let pathOrUrl = process.argv[2];

if (pathOrUrl.startsWith('http')) {
  webCat(pathOrUrl);
} else {
  cat(pathOrUrl);
};
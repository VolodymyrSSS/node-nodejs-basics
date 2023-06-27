// just to verify the code in terminal I entered: node --experimental-modules ./esm.mjs

import path from 'path';
// import path from 'node:path';
import { release, version } from 'os';
// import { release, version } from 'node:os';
import { createServer as createServerHttp } from 'http';
// import { createServer } from 'node:http';

import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import a from './files/a.json' assert { type: 'json' };
import b from './files/b.json' assert { type: 'json' };
import './files/c.js';
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);

const random = Math.random();

let unknownObject;

if (random > 0.5) {
	// unknownObject = require('./files/a.json'); // when const require = createRequire(import.meta.url);
	unknownObject = a;
} else {
	// unknownObject = require('./files/b.json'); // when const require = createRequire(import.meta.url);
	unknownObject = b;
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
	res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
	console.log('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };

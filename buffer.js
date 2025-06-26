import { Buffer } from 'buffer';

// Allocate 10 bytes (initialized with 0s)
const buf1 = Buffer.alloc(10);
console.log('Allocated buffer:', buf1);

// From an array of bytes
const buf2 = Buffer.from([1, 2, 3]);
console.log('Buffer from array:', buf2);

// From a string (UTF-8 encoded)
const buf3 = Buffer.from('Hello', 'utf8');
console.log('Buffer from string:', buf3);

// Write to buf1
buf1.write('Node.js');
console.log('Buffer after write:', buf1.toString());

// Read buf3 as hex
console.log('Hex representation of buf3:', buf3.toString('hex')); // 48656c6c6f

// Slice the first two bytes of buf3
const slice = buf3.slice(0, 2);
console.log('Sliced buffer:', slice); // <Buffer 48 65>
console.log('Sliced buffer as string:', slice.toString()); // He

// Concatenate buf1 and buf3
const combined = Buffer.concat([buf1, buf3]);
console.log('Combined buffer:', combined);
console.log('Combined buffer as string:', combined.toString());

// Convert buffer to base64
const base64Buf = Buffer.from('Hello', 'utf8');
console.log('Base64 representation:', base64Buf.toString('base64')); // SGVsbG8=

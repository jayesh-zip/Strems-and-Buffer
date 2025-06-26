import fs from "fs";
import zlib from "zlib";
import { pipeline } from 'stream';

async function compressFile(inputPath, outputPath, algorithm = 'gzip') {
  let compressStream;
  switch (algorithm) {
    case 'brotli':
      compressStream = zlib.createBrotliCompress({ 
        params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 4 }
      });
      break;
    default: // gzip
      compressStream = zlib.createGzip({ level: 6 });
  }

  return new Promise((resolve, reject) => {
    pipeline(
      fs.createReadStream(inputPath),
      compressStream,
      fs.createWriteStream(outputPath),
      (err) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}

// Run
(async () => {
  try {
    const input = 'largefile.txt';
    const output = 'largefile.txt.gz';
    
    await compressFile(input, output);
    console.log('Compression complete!');

    // Log results
    const stats = fs.statSync(input);
    const compressedStats = fs.statSync(output);
    console.log(`Reduced from ${stats.size} bytes to ${compressedStats.size} bytes`);
  } catch (err) {
    console.error('Error:', err);
  }
})();
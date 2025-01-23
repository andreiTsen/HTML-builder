const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), '01-read-file', 'text.txt');
const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

readStream.on('data', (chunk) => {
    console.log(chunk);
});

readStream.on('error', (error) => {
    console.error('Ошибка чтения файла:', error);
});



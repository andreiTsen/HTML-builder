const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), '01-read-file', 'text.txt');

fs.readFile(filePath, { encoding: 'utf8' }, (error, data) => {
    if (error) {
        console.error('Ошибка чтения файла:', error);
        return;
    }
    console.log(data);
});



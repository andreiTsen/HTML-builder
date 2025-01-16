const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'output.txt');
const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Добро пожаловать! Введите текст (введите "exit" для выхода):');

rl.on('line', (input) => {
    if (input.trim().toLowerCase() === 'exit') {
        console.log('До свидания! Хорошего дня!');
        rl.close();
        return;
    }
    writeStream.write(input + '\n');
});

process.on('SIGINT', () => {
    console.log('\nДо свидания! Хорошего дня!');
    rl.close();
});

rl.on('close', () => {
    writeStream.end();
    process.exit();
});

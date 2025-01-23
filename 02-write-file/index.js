const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'output.txt');
const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ''
});

function sayGoodbye() {
    console.log('\nДо свидания! Хорошего дня!');
    rl.close();
}

console.log('Добро пожаловать! Введите текст (введите "exit" для выхода):');

rl.on('line', (input) => {
    if (input.trim().toLowerCase() === 'exit') {
        sayGoodbye();
        return;
    }
    writeStream.write(input + '\n');
});

rl.on('SIGINT', sayGoodbye);
process.on('SIGINT', sayGoodbye);

rl.on('close', () => {
    writeStream.end();
    process.exit();
});
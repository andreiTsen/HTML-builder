const fs = require('fs').promises;
const path = require('path');

async function displayFileInfo() {
    const folderPath = path.join(__dirname, 'secret-folder');
    
    try {
        const files = await fs.readdir(folderPath, { withFileTypes: true });
        
        for (const file of files) {
            if (file.isFile()) {
                const filePath = path.join(folderPath, file.name);
                const stats = await fs.stat(filePath);
                const fileName = path.parse(file.name).name;
                const fileExt = path.parse(file.name).ext.slice(1);
                const fileSize = (stats.size / 1024).toFixed(3);
                
                console.log(`${fileName} - ${fileExt} - ${fileSize}kb`);
            }
        }
    } catch (error) {
        console.error('Ошибка чтения папки:', error);
    }
}

displayFileInfo();

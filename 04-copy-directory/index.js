const fs = require('fs').promises;
const path = require('path');

const fs = require('fs').promises;
const path = require('path');

async function copyDir() {
    const sourceDir = path.join(__dirname, 'files');
    const targetDir = path.join(__dirname, 'files-copy');

    try {
        await fs.rm(targetDir, { recursive: true, force: true });
        
        await fs.mkdir(targetDir, { recursive: true });
        
        const files = await fs.readdir(sourceDir);
        
        const copyPromises = files.map(file => {
            const sourcePath = path.join(sourceDir, file);
            const targetPath = path.join(targetDir, file);
            return fs.copyFile(sourcePath, targetPath);
        });
        
        await Promise.all(copyPromises);
        
    } catch (error) {
        console.error('Ошибка при копировании директории:', error);
    }
}

copyDir();

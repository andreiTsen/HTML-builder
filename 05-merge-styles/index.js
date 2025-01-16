const fs = require('fs').promises;
const path = require('path');

async function mergeStyles() {
    const stylesDir = path.join(__dirname, 'styles');
    const outputDir = path.join(__dirname, 'project-dist');
    const outputFile = path.join(outputDir, 'bundle.css');

    try {
        await fs.mkdir(outputDir, { recursive: true });
        
        const files = await fs.readdir(stylesDir, { withFileTypes: true });
        
        const cssContents = [];
        
        for (const file of files) {
            if (file.isFile() && path.extname(file.name) === '.css') {
                const filePath = path.join(stylesDir, file.name);
                const content = await fs.readFile(filePath, 'utf8');
                cssContents.push(content);
            }
        }
        
        await fs.writeFile(outputFile, cssContents.join('\n'));
        
    } catch (error) {
        console.error('Error merging styles:', error);
    }
}

mergeStyles();
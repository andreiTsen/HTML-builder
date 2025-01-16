const fs = require('fs').promises;
const path = require('path');

async function buildPage() {
    const projectDir = path.join(__dirname, 'project-dist');
    const templatePath = path.join(__dirname, 'template.html');
    const componentsDir = path.join(__dirname, 'components');
    const stylesDir = path.join(__dirname, 'styles');
    const assetsDir = path.join(__dirname, 'assets');

    try {
        await fs.mkdir(projectDir, { recursive: true });

        let template = await fs.readFile(templatePath, 'utf8');

        const componentRegex = /{{(.*?)}}/g;
        const componentMatches = template.match(componentRegex) || [];
        
        for (const match of componentMatches) {
            const componentName = match.replace(/[{}]/g, '').trim();
            const componentPath = path.join(componentsDir, `${componentName}.html`);
            
            try {
                const componentContent = await fs.readFile(componentPath, 'utf8');
                template = template.replace(match, componentContent);
            } catch (err) {
                console.error(`Ошибка чтения компонента ${componentName}:`, err);
            }
        }

        await fs.writeFile(path.join(projectDir, 'index.html'), template);

        const styleFiles = await fs.readdir(stylesDir, { withFileTypes: true });
        const cssContents = [];
        
        for (const file of styleFiles) {
            if (file.isFile() && path.extname(file.name) === '.css') {
                const content = await fs.readFile(path.join(stylesDir, file.name), 'utf8');
                cssContents.push(content);
            }
        }
        
        await fs.writeFile(path.join(projectDir, 'style.css'), cssContents.join('\n'));

        await copyDir(assetsDir, path.join(projectDir, 'assets'));

    } catch (error) {
        console.error('Ошибка сборки страницы:', error);
    }
}

async function copyDir(src, dest) {
    await fs.rm(dest, { recursive: true, force: true });
    await fs.mkdir(dest, { recursive: true });
    
    const entries = await fs.readdir(src, { withFileTypes: true });
    
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
            await copyDir(srcPath, destPath);
        } else {
            await fs.copyFile(srcPath, destPath);
        }
    }
}

buildPage();
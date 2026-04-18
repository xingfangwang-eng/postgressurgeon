const fs = require('fs');
const path = require('path');

const diagnoseDir = path.join(__dirname, 'diagnose');

// 读取所有静态页面
function getHtmlFiles(dir) {
    const files = [];
    
    function walk(currentDir) {
        const items = fs.readdirSync(currentDir);
        items.forEach(item => {
            const itemPath = path.join(currentDir, item);
            const stats = fs.statSync(itemPath);
            if (stats.isDirectory()) {
                walk(itemPath);
            } else if (item.endsWith('.html')) {
                files.push(itemPath);
            }
        });
    }
    
    walk(dir);
    return files;
}

// 删除nav元素
function removeNavElements(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 正则表达式匹配nav元素
        const navRegex = /<nav[^>]*>\s*<a[^>]*>\[Home\]<\/a>\s*<a[^>]*>\[All Tools\]<\/a>\s*(<a[^>]*>\[GitHub\]<\/a>)?\s*<\/nav>/g;
        
        // 替换nav元素为空字符串
        const updatedContent = content.replace(navRegex, '');
        
        // 写回文件
        fs.writeFileSync(filePath, updatedContent);
        console.log(`Removed nav elements from ${filePath}`);
        
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
    }
}

// 主函数
function main() {
    try {
        // 获取所有HTML文件
        const htmlFiles = getHtmlFiles(__dirname);
        console.log(`Found ${htmlFiles.length} HTML files`);
        
        // 处理每个文件
        htmlFiles.forEach(file => {
            removeNavElements(file);
        });
        
        console.log('All nav elements removed successfully!');
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// 运行主函数
main();

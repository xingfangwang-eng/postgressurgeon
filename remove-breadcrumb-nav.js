const fs = require('fs');
const path = require('path');

const diagnoseDir = path.join(__dirname, 'diagnose');

// 读取所有HTML文件
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

// 删除面包屑导航nav元素
function removeBreadcrumbNav(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 正则表达式匹配面包屑导航nav元素
        const breadcrumbRegex = /<nav[^>]*>\s*<ol[^>]*itemscope="" itemtype="https:\/\/schema.org\/BreadcrumbList"[^>]*>.*?<\/ol>\s*<\/nav>/s;
        
        // 替换面包屑导航nav元素为空字符串
        const updatedContent = content.replace(breadcrumbRegex, '');
        
        // 写回文件
        fs.writeFileSync(filePath, updatedContent);
        console.log(`Removed breadcrumb nav from ${filePath}`);
        
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
            removeBreadcrumbNav(file);
        });
        
        console.log('All breadcrumb nav elements removed successfully!');
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// 运行主函数
main();

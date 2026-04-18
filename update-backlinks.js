const fs = require('fs');
const path = require('path');

// 高权重锚文本选项
const anchorTexts = [
    'Try the Automated Postgres Surgeon',
    'Audit your SQL now',
    'Best Supabase Performance Tool',
    'Optimize your Postgres database',
    'Free Postgres performance audit',
    'Supabase performance optimization',
    'Database surgery tool',
    'Postgres query optimizer',
    'Supabase performance checker',
    'Database performance audit'
];

// 极简终端风格的导航
const globalNav = `
    <nav style="background-color: #003366; color: white; padding: 1rem; margin-bottom: 2rem; font-family: monospace;">
        <a href="${'{{HOME_PATH}}'}" style="color: white; text-decoration: none; margin-right: 2rem;">[Home]</a>
        <a href="${'{{ALL_TOOLS_PATH}}'}" style="color: white; text-decoration: none; margin-right: 2rem;">[All Tools]</a>
        <a href="https://github.com" style="color: white; text-decoration: none;">[GitHub]</a>
    </nav>
`;

// 底部面包屑导航
const breadcrumbNavigation = `
    <!-- 底部面包屑导航 -->
    <nav style="margin-top: 4rem; padding-top: 2rem; border-top: 2px solid #e2e8f0; font-size: 0.875rem;">
        <ol itemscope itemtype="https://schema.org/BreadcrumbList" style="list-style: none; padding: 0;">
            <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" style="display: inline;">
                <a itemprop="item" href="${'{{HOME_PATH}}'}" style="color: #3b82f6; text-decoration: none;">
                    <span itemprop="name">Home</span>
                </a>
                <meta itemprop="position" content="1" />
                <span style="margin: 0 0.5rem;">/</span>
            </li>
            ${'{{ADDITIONAL_ITEMS}}'}
        </ol>
    </nav>
`;

// 生成引用块
function generateBlockquote(keyword) {
    // 随机选择 3 个锚文本
    const shuffledTexts = [...anchorTexts].sort(() => 0.5 - Math.random());
    const selectedTexts = shuffledTexts.slice(0, 3);
    
    let blockquote = `
    <blockquote style="background-color: #f4f4f4; border-left: 4px solid #003366; padding: 1.5rem; margin: 2rem 0;">
        <p style="margin-bottom: 1rem;">Looking for more database performance optimization tips?</p>
        <ul style="list-style: none; padding: 0;">
    `;
    
    selectedTexts.forEach(text => {
        blockquote += `
            <li style="margin-bottom: 0.5rem;">
                <a href="${'{{HOME_PATH}}'}" style="color: #3b82f6; text-decoration: none; font-weight: bold;">${text}</a>
            </li>
        `;
    });
    
    blockquote += `
        </ul>
    </blockquote>
    `;
    
    return blockquote;
}

// 处理单个页面
function processPage(filePath) {
    console.log(`Processing: ${filePath}`);
    
    // 读取文件内容
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 确定路径前缀
    const relativePath = path.relative(__dirname, filePath);
    const isInDiagnose = relativePath.startsWith('diagnose');
    const homePath = isInDiagnose ? '../index.html' : 'index.html';
    const allToolsPath = isInDiagnose ? '../all-topics.html' : 'all-topics.html';
    
    // 注入全局导航
    let updatedContent = content.replace(
        /<body>/,
        `<body>
${globalNav.replace('{{HOME_PATH}}', homePath).replace('{{ALL_TOOLS_PATH}}', allToolsPath)}`
    );
    
    // 注入引用块
    // 在文章中间插入
    const contentSections = updatedContent.split('</section>');
    if (contentSections.length > 2) {
        const middleIndex = Math.floor(contentSections.length / 2);
        contentSections[middleIndex] += generateBlockquote('').replace('{{HOME_PATH}}', homePath);
        updatedContent = contentSections.join('</section>');
    }
    
    // 在文章结尾插入
    updatedContent = updatedContent.replace(
        /<\/article>\s*<\/body>/,
        `
${generateBlockquote('').replace('{{HOME_PATH}}', homePath)}
</article>
</body>`
    );
    
    // 注入底部面包屑导航
    let additionalItems = '';
    if (isInDiagnose) {
        additionalItems = `
            <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" style="display: inline;">
                <a itemprop="item" href="${allToolsPath}" style="color: #3b82f6; text-decoration: none;">
                    <span itemprop="name">All Tools</span>
                </a>
                <meta itemprop="position" content="2" />
                <span style="margin: 0 0.5rem;">/</span>
            </li>
            <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" style="display: inline;">
                <span itemprop="name">${path.basename(filePath, '.html')}</span>
                <meta itemprop="position" content="3" />
            </li>
        `;
    } else if (filePath.endsWith('all-topics.html')) {
        additionalItems = `
            <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" style="display: inline;">
                <span itemprop="name">All Tools</span>
                <meta itemprop="position" content="2" />
            </li>
        `;
    }
    
    const breadcrumb = breadcrumbNavigation
        .replace('{{HOME_PATH}}', homePath)
        .replace('{{ADDITIONAL_ITEMS}}', additionalItems);
    
    updatedContent = updatedContent.replace(
        /<\/body>/,
        `${breadcrumb}
</body>`
    );
    
    // 写入更新后的内容
    fs.writeFileSync(filePath, updatedContent);
    console.log(`Updated: ${filePath}`);
}

// 主函数
function main() {
    try {
        // 处理首页
        processPage(path.join(__dirname, 'index.html'));
        
        // 处理聚合页
        processPage(path.join(__dirname, 'all-topics.html'));
        
        // 处理子页面
        const diagnoseDir = path.join(__dirname, 'diagnose');
        const files = fs.readdirSync(diagnoseDir);
        files.forEach(file => {
            if (file.endsWith('.html')) {
                processPage(path.join(diagnoseDir, file));
            }
        });
        
        console.log('\nAll pages updated successfully!');
        
    } catch (error) {
        console.error('Error processing pages:', error);
    }
}

// 运行主函数
main();

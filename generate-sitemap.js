const fs = require('fs');
const path = require('path');

const domain = 'https://postgressurgeon.wangdadi.xyz';
const diagnoseDir = path.join(__dirname, 'diagnose');

// 读取所有静态页面
function getStaticPages() {
    const pages = [];
    
    // 添加首页
    pages.push({
        url: domain,
        priority: '1.0',
        changefreq: 'daily'
    });
    
    // 添加聚合页
    pages.push({
        url: `${domain}/all-topics.html`,
        priority: '0.9',
        changefreq: 'weekly'
    });
    
    // 添加静态页面
    const files = fs.readdirSync(diagnoseDir);
    files.forEach(file => {
        if (file.endsWith('.html')) {
            pages.push({
                url: `${domain}/diagnose/${file}`,
                priority: '0.8',
                changefreq: 'monthly'
            });
        }
    });
    
    return pages;
}

// 生成HTML站点地图
function generateHtmlSitemap(pages) {
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Site Map - Postgres Surgeon</title>
    <style>
        body {
            font-family: Helvetica, Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 72rem;
            margin: 0 auto;
            padding: 2rem;
            background-color: white;
        }
        h1 {
            font-size: 2rem;
            margin-bottom: 2rem;
            color: #003366;
        }
        ul {
            list-style: none;
            padding: 0;
        }
        li {
            margin-bottom: 1rem;
        }
        a {
            color: #3b82f6;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        .priority {
            font-size: 0.8rem;
            color: #666;
            margin-left: 1rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Site Map</h1>
        <ul>
`;
    
    pages.forEach(page => {
        html += `            <li>
                <a href="${page.url}">${page.url}</a>
                <span class="priority">Priority: ${page.priority}</span>
            </li>
`;
    });
    
    html += `        </ul>
    </div>
</body>
</html>`;
    
    fs.writeFileSync(path.join(__dirname, 'sitemap.html'), html);
    console.log('HTML sitemap generated: sitemap.html');
}

// 生成XML站点地图
function generateXmlSitemap(pages) {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
    
    pages.forEach(page => {
        xml += `    <url>
        <loc>${page.url}</loc>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>
`;
    });
    
    xml += `</urlset>`;
    
    fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml);
    console.log('XML sitemap generated: sitemap.xml');
}

// 在index.html页脚添加sitemap链接
function addSitemapLinkToIndex() {
    const indexPath = path.join(__dirname, 'index.html');
    let content = fs.readFileSync(indexPath, 'utf8');
    
    // 找到页脚位置并添加sitemap链接
    const sitemapLink = `
        <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #e2e8f0; font-size: 0.875rem;">
            <a href="sitemap.html" style="color: #3b82f6; text-decoration: none;">Site Map</a>
        </div>`;
    
    // 在底部面包屑导航后添加sitemap链接
    content = content.replace('</nav>\n\n</body>', `</nav>
${sitemapLink}

</body>`);
    
    fs.writeFileSync(indexPath, content);
    console.log('Sitemap link added to index.html');
}

// 主函数
function main() {
    try {
        const pages = getStaticPages();
        console.log(`Found ${pages.length} pages`);
        
        generateHtmlSitemap(pages);
        generateXmlSitemap(pages);
        addSitemapLinkToIndex();
        
        console.log('All sitemaps generated successfully!');
        
    } catch (error) {
        console.error('Error generating sitemaps:', error);
    }
}

// 运行主函数
main();

const fs = require('fs');
const path = require('path');

// 读取关键词数据
function readKeywords() {
    const keywordsPath = path.join(__dirname, 'seo_keywords.json');
    if (!fs.existsSync(keywordsPath)) {
        console.error('seo_keywords.json file not found');
        process.exit(1);
    }
    
    const keywordsData = JSON.parse(fs.readFileSync(keywordsPath, 'utf8'));
    return keywordsData;
}

// 分类关键词
function categorizeKeywords(keywords) {
    const categories = {
        'Supabase': [],
        'Next.js': [],
        'PostgreSQL': [],
        'Serverless': [],
        'ORM': [],
        'Performance': [],
        'Security': []
    };
    
    keywords.forEach(keywordObj => {
        const keyword = keywordObj.keyword.toLowerCase();
        
        // 根据关键词特征分类
        if (keyword.includes('supabase')) {
            categories['Supabase'].push(keywordObj);
        } else if (keyword.includes('nextjs') || keyword.includes('next.js')) {
            categories['Next.js'].push(keywordObj);
        } else if (keyword.includes('postgres') || keyword.includes('postgresql')) {
            categories['PostgreSQL'].push(keywordObj);
        } else if (keyword.includes('serverless') || keyword.includes('edge') || keyword.includes('lambda') || keyword.includes('cold start')) {
            categories['Serverless'].push(keywordObj);
        } else if (keyword.includes('prisma') || keyword.includes('drizzle') || keyword.includes('kysely') || keyword.includes('orm')) {
            categories['ORM'].push(keywordObj);
        } else if (keyword.includes('performance') || keyword.includes('slow') || keyword.includes('latency') || keyword.includes('bloat') || keyword.includes('fragmentation')) {
            categories['Performance'].push(keywordObj);
        } else if (keyword.includes('security') || keyword.includes('policy') || keyword.includes('rls') || keyword.includes('row level')) {
            categories['Security'].push(keywordObj);
        } else {
            // 默认为 PostgreSQL 分类
            categories['PostgreSQL'].push(keywordObj);
        }
    });
    
    return categories;
}

// 生成富摘要
function generateSummary(userQueryScenario) {
    // 截取前 50 字左右的描述
    let summary = userQueryScenario.trim();
    if (summary.length > 50) {
        summary = summary.substring(0, 50) + '...';
    }
    return summary;
}

// 获取难度标签
function getDifficultyLabel(difficulty) {
    switch (difficulty) {
        case 1:
            return { label: 'Low Competition', class: 'difficulty-low' };
        case 2:
            return { label: 'Medium Priority', class: 'difficulty-medium' };
        case 3:
            return { label: 'High Priority', class: 'difficulty-high' };
        default:
            return { label: 'Unknown', class: 'difficulty-unknown' };
    }
}

// 生成 HTML 页面
function generateHubPage(keywords) {
    const categories = categorizeKeywords(keywords);
    
    // 生成 Schema.org 的 itemListElement 内容
    let schemaItems = [];
    keywords.forEach((item, index) => {
        const link = `diagnose/${item.keyword.replace(/\s+/g, '-')}.html`;
        schemaItems.push({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.target_page_title,
            "url": link
        });
    });
    const schemaItemsJson = JSON.stringify(schemaItems, null, 4).replace(/\//g, '\\/');
    
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Ultimate Database Surgery & Cron Monitoring Index</title>
    <meta name="description" content="Comprehensive guide to database performance optimization, debugging, and best practices for PostgreSQL, Supabase, and serverless environments.">
    <meta name="keywords" content="database surgery, postgres optimization, supabase performance, serverless database, cron monitoring, database security">
    <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Database Surgery & Cron Monitoring Index",
            "description": "Comprehensive guide to database performance optimization, debugging, and best practices",
            "itemListElement": [
                ${schemaItemsJson}
            ]
        }
    </script>
    <style>
        /* 基础样式 */
        body {
            background-color: #f4f4f4;
            min-height: 100vh;
            font-family: Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        
        .container {
            max-width: 72rem;
            margin: 0 auto;
            padding: 2rem;
        }
        
        /* 字体样式 */
        .swiss-font {
            font-weight: bold;
            letter-spacing: -0.02em;
        }
        
        /* 无圆角样式 */
        .no-rounded {
            border-radius: 0;
        }
        
        /* Hero 区域 */
        .hero {
            margin-bottom: 4rem;
            text-align: center;
        }
        
        .hero h1 {
            font-size: 4rem;
            margin-bottom: 1rem;
            color: #003366;
        }
        
        .hero p {
            font-size: 1.5rem;
            color: #666;
            margin-bottom: 2rem;
        }
        
        /* 搜索区域 */
        .search-container {
            margin-bottom: 4rem;
        }
        
        .search-container input {
            width: 100%;
            padding: 1.5rem;
            font-size: 1.25rem;
            border: 4px solid #003366;
            border-radius: 0;
            box-sizing: border-box;
        }
        
        /* 分类区域 */
        .categories {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
        }
        
        article {
            background-color: white;
            padding: 2rem;
            border: 2px solid #e2e8f0;
        }
        
        article h2 {
            font-size: 1.75rem;
            margin-bottom: 1.5rem;
            color: #003366;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 0.5rem;
        }
        
        article ul {
            list-style: none;
            padding: 0;
        }
        
        article li {
            margin-bottom: 1rem;
        }
        
        article a {
            text-decoration: none;
            color: #3b82f6;
            font-weight: 500;
            transition: color 0.3s ease;
        }
        
        article a:hover {
            color: #003366;
            text-decoration: underline;
        }
        
        /* 难度标签样式 */
        .difficulty-tag {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            font-size: 0.75rem;
            font-weight: 600;
            border-radius: 0;
            margin-right: 0.5rem;
        }
        
        .difficulty-low {
            background-color: #dcfce7;
            color: #166534;
            border: 1px solid #bbf7d0;
        }
        
        .difficulty-medium {
            background-color: #fef3c7;
            color: #92400e;
            border: 1px solid #fde68a;
        }
        
        .difficulty-high {
            background-color: #fee2e2;
            color: #991b1b;
            border: 1px solid #fecaca;
        }
        
        /* 链接项目样式 */
        .link-item {
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #f1f5f9;
        }
        
        .link-item:last-child {
            border-bottom: none;
        }
        
        .link-item a {
            display: block;
            margin-bottom: 0.5rem;
        }
        
        .link-item .summary {
            font-size: 0.875rem;
            color: #64748b;
            margin-bottom: 0.5rem;
        }
        
        .link-item .meta {
            display: flex;
            align-items: center;
            font-size: 0.75rem;
            color: #94a3b8;
        }
        
        /* 响应式设计 */
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2.5rem;
            }
            
            .hero p {
                font-size: 1.25rem;
            }
            
            .search-container input {
                padding: 1rem;
                font-size: 1rem;
            }
            
            .categories {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- 面包屑导航 -->
        <div style="margin-bottom: 2rem; font-size: 0.875rem;">
            <a href="index.html" style="color: #3b82f6; text-decoration: none;">Home</a> &gt; <span style="color: #003366; font-weight: bold;">All Topics</span>
        </div>
        
        <!-- Hero 区域 -->
        <div class="hero">
            <h1 class="swiss-font">The Ultimate Database Surgery & Cron Monitoring Index</h1>
            <p>Comprehensive guide to database performance optimization, debugging, and best practices</p>
        </div>
        
        <!-- 搜索区域 -->
        <div class="search-container">
            <input type="text" id="searchInput" placeholder="Search for database topics...">
        </div>
        
        <!-- 行业综述 -->
        <div style="background-color: white; padding: 2rem; margin-bottom: 4rem; border: 2px solid #e2e8f0;">
            <h2 style="font-size: 2rem; margin-bottom: 1.5rem; color: #003366;">Industry Overview: Database Bottlenecks & Automation Challenges</h2>
            <p>In the rapidly evolving landscape of modern software development, database performance has emerged as a critical bottleneck for many applications. As organizations scale their operations, the demands on database systems increase exponentially, often leading to unexpected performance issues that can cripple user experience and business operations.</p>
            <p>One of the most common challenges faced by developers today is the management of database connections in serverless environments. The ephemeral nature of serverless functions means that traditional connection pooling strategies often fall short, leading to connection exhaustion and application failures. This is particularly acute in frameworks like Next.js, where each request can potentially spawn a new function instance.</p>
            <p>Another significant challenge is the optimization of database queries. Many developers rely on ORMs like Prisma, Drizzle, and Kysely to simplify database interactions, but these tools can sometimes generate inefficient queries that lead to full table scans and excessive resource utilization. Without proper monitoring and analysis, these issues can go undetected until they cause production outages.</p>
            <p>Indexing strategies also play a crucial role in database performance. While indexes can dramatically speed up query execution, improper index design can lead to fragmentation, bloat, and increased write overhead. This is especially true for vector databases and applications using UUIDs as primary keys, where index optimization requires specialized knowledge.</p>
            <p>Automation has become a key strategy for addressing these challenges. Tools that can automatically audit database schemas, analyze query performance, and suggest optimizations are becoming essential for modern development teams. By integrating these tools into CI/CD pipelines, developers can catch performance issues early in the development cycle, before they impact production users.</p>
            <p>The rise of managed database services like Supabase has simplified many aspects of database management, but it has also introduced new challenges. Developers must understand the unique characteristics of these platforms, including connection limits, RLS performance implications, and the trade-offs between convenience and control.</p>
            <p>As we look ahead to 2026, the importance of database performance optimization will only continue to grow. With the increasing adoption of AI applications and real-time data processing, the demands on database systems will become even more stringent. Developers who master the art of database surgery—diagnosing and fixing performance issues—will be in high demand, as organizations seek to deliver fast, reliable, and scalable applications.</p>
        </div>
        
        <!-- 分类网格 -->
        <div class="categories" id="categoriesContainer">
`;
    
    // 生成分类内容
    Object.entries(categories).forEach(([category, items]) => {
        if (items.length > 0) {
            // 随机排列分类内的链接
            const shuffledItems = [...items].sort(() => Math.random() - 0.5);
            
            html += `
            <article>
                <h2>${category}</h2>
                <ul>`;
            
            shuffledItems.forEach(item => {
                // 生成链接
                const link = `diagnose/${item.keyword.replace(/\s+/g, '-')}.html`;
                // 生成富摘要
                const summary = generateSummary(item.user_query_scenario);
                // 获取难度标签
                const difficultyInfo = getDifficultyLabel(item.difficulty);
                
                html += `
                    <li class="link-item">
                        <a href="${link}" rel="bookmark">${item.target_page_title}</a>
                        <div class="summary">${summary}</div>
                        <div class="meta">
                            <span class="difficulty-tag ${difficultyInfo.class}">${difficultyInfo.label}</span>
                            <span>${item.intent}</span>
                        </div>
                    </li>`;
            });
            
            html += `
                </ul>
            </article>`;
        }
    });
    
    html += `
        </div>
        
        <!-- 常见问题解答（FAQ） -->
        <div style="background-color: white; padding: 2rem; margin-top: 4rem; border: 2px solid #e2e8f0;">
            <h2 style="font-size: 2rem; margin-bottom: 1.5rem; color: #003366;">Frequently Asked Questions (FAQ)</h2>
            <div style="margin-bottom: 2rem;">
                <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: #003366;">What are the most common database performance bottlenecks in 2026?</h3>
                <p>The most common bottlenecks include connection pool exhaustion in serverless environments, inefficient query patterns generated by ORMs, improper indexing strategies, and bloat in vector databases. These issues are particularly acute in modern stack applications using Next.js and Supabase.</p>
            </div>
            <div style="margin-bottom: 2rem;">
                <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: #003366;">How can I automatically detect database performance issues?</h3>
                <p>Automated tools that integrate with CI/CD pipelines can scan database schemas, analyze query performance, and suggest optimizations. These tools can catch issues early in the development cycle, before they impact production users.</p>
            </div>
            <div style="margin-bottom: 2rem;">
                <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: #003366;">What are the best practices for managing database connections in serverless environments?</h3>
                <p>Best practices include using connection pooling services like Supavisor, implementing proper connection management in ORMs, and leveraging transaction mode connections to reduce the number of active connections.</p>
            </div>
            <div style="margin-bottom: 2rem;">
                <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: #003366;">How do I optimize vector databases for AI applications?</h3>
                <p>Optimization strategies include choosing the right index type (HNSW vs IVFFlat), properly sizing vector embeddings, and implementing efficient similarity search algorithms. Regular maintenance to address index bloat is also crucial.</p>
            </div>
            <div style="margin-bottom: 2rem;">
                <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: #003366;">What are the latest trends in database performance optimization for 2026?</h3>
                <p>Key trends include the increasing adoption of vector databases for AI applications, the rise of automated database performance monitoring tools, and the growing importance of connection management in serverless architectures. There's also a shift towards more granular performance analysis and real-time optimization.</p>
            </div>
        </div>
    </div>
    
    <script>
        // 高性能过滤功能
        function filterTopics() {
            const searchInput = document.getElementById('searchInput');
            const searchTerm = searchInput.value.toLowerCase();
            const categories = document.querySelectorAll('.categories article');
            
            categories.forEach(category => {
                const linkItems = category.querySelectorAll('.link-item');
                let hasMatchingLinks = false;
                
                linkItems.forEach(item => {
                    const itemText = item.textContent.toLowerCase();
                    if (itemText.includes(searchTerm)) {
                        item.style.display = 'block';
                        hasMatchingLinks = true;
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                if (hasMatchingLinks || searchTerm === '') {
                    category.style.display = 'block';
                } else {
                    category.style.display = 'none';
                }
            });
            
            // 保存搜索状态到 URL hash
            if (searchTerm) {
                window.location.hash = 'search=' + encodeURIComponent(searchTerm);
            } else {
                window.location.hash = '';
            }
        }
        
        // 从 URL hash 恢复搜索状态
        function restoreSearchState() {
            const hash = window.location.hash;
            if (hash.startsWith('#search=')) {
                const searchTerm = decodeURIComponent(hash.substring(8));
                document.getElementById('searchInput').value = searchTerm;
                filterTopics();
            }
        }
        
        // 监听搜索框输入事件
        document.getElementById('searchInput').addEventListener('input', filterTopics);
        
        // 页面加载时恢复搜索状态
        window.addEventListener('load', restoreSearchState);
    </script>
</body>
</html>`;
    
    return html;
}

// 主函数
function main() {
    try {
        const keywords = readKeywords();
        const html = generateHubPage(keywords);
        
        // 写入文件
        const outputPath = path.join(__dirname, 'all-topics.html');
        fs.writeFileSync(outputPath, html);
        
        console.log(`Hub page generated successfully at ${outputPath}`);
        console.log(`Total keywords processed: ${keywords.length}`);
        
        // 统计分类
        const categories = categorizeKeywords(keywords);
        console.log('Category breakdown:');
        Object.entries(categories).forEach(([category, items]) => {
            console.log(`${category}: ${items.length} items`);
        });
        
    } catch (error) {
        console.error('Error generating hub page:', error);
    }
}

// 运行主函数
main();

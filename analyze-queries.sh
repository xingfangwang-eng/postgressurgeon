#!/bin/bash

# 提示用户输入数据库 URL
echo "Please enter your database URL:"
read DB_URL

# 检查是否安装了 node
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js first."
    exit 1
fi

# 检查是否安装了 pg 模块
if ! node -e "require('pg')" &> /dev/null; then
    echo "Installing pg module..."
    npm install pg
fi

# 创建临时分析脚本
cat > analyze-queries-temp.js << 'EOF'
const { Client } = require('pg');

async function analyzeQueries(dbUrl) {
    const client = new Client({ connectionString: dbUrl });
    
    try {
        await client.connect();
        console.log('Connected to database');
        
        // 确保 pg_stat_statements 扩展已启用
        await client.query('CREATE EXTENSION IF NOT EXISTS pg_stat_statements');
        
        // 查询耗时排名前 5 的查询
        const query = `
            SELECT
                queryid,
                query,
                mean_exec_time,
                calls,
                total_exec_time,
                rows
            FROM
                pg_stat_statements
            ORDER BY
                mean_exec_time DESC
            LIMIT 5
        `;
        
        const result = await client.query(query);
        const topQueries = result.rows;
        
        // 为每个查询生成优化建议
        const analyzedQueries = topQueries.map(query => ({
            queryid: query.queryid,
            query: query.query,
            mean_exec_time: query.mean_exec_time,
            calls: query.calls,
            total_exec_time: query.total_exec_time,
            rows: query.rows,
            suggestions: generateSuggestions(query.query)
        }));
        
        return analyzedQueries;
    } catch (error) {
        console.error('Error analyzing queries:', error);
        throw error;
    } finally {
        await client.end();
        console.log('Disconnected from database');
    }
}

function generateSuggestions(query) {
    const suggestions = [];
    
    // 检查是否使用了 SELECT *
    if (query.match(/SELECT\s+\*/i)) {
        suggestions.push('Avoid using SELECT *, explicitly list only the columns you need');
    }
    
    // 检查是否使用了 seq scan（通过 EXPLAIN 计划）
    if (query.match(/Seq Scan/i)) {
        suggestions.push('Consider adding indexes to avoid sequential scans');
    }
    
    // 检查是否使用了临时表
    if (query.match(/Temp Table/i)) {
        suggestions.push('Optimize query to reduce temporary table usage');
    }
    
    // 检查是否使用了全表扫描
    if (query.match(/Full Table Scan/i)) {
        suggestions.push('Add appropriate indexes for the WHERE clause');
    }
    
    // 检查是否使用了嵌套循环连接
    if (query.match(/Nested Loop/i)) {
        suggestions.push('Consider using hash join or merge join for large datasets');
    }
    
    // 检查是否使用了排序
    if (query.match(/Sort/i)) {
        suggestions.push('Add indexes that match the sort order to avoid explicit sorting');
    }
    
    // 检查是否使用了子查询
    if (query.match(/\(SELECT/i)) {
        suggestions.push('Consider using JOINs instead of subqueries for better performance');
    }
    
    // 如果没有特定建议，提供通用建议
    if (suggestions.length === 0) {
        suggestions.push('Analyze the execution plan to identify potential bottlenecks');
        suggestions.push('Consider adding indexes for frequently used columns in WHERE clauses');
        suggestions.push('Optimize query structure and use appropriate JOIN types');
    }
    
    return suggestions;
}

// 运行分析
analyzeQueries(process.argv[2])
    .then(queries => {
        console.log('\nTop 5 slowest queries:');
        console.log(JSON.stringify(queries, null, 2));
    })
    .catch(error => {
        console.error('Error:', error);
    });
EOF

# 运行分析脚本
node analyze-queries-temp.js "$DB_URL"

# 清理临时文件
rm analyze-queries-temp.js

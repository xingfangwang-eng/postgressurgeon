const { Client } = require('pg');

/**
 * 分析数据库中耗时排名前 5 的查询
 * @param {string} dbUrl - 数据库连接 URL
 * @returns {Promise<Array>} - 包含前 5 个最烂查询的数组
 */
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

/**
 * 为查询生成优化建议
 * @param {string} query - SQL 查询语句
 * @returns {Array} - 优化建议数组
 */
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

// 示例用法
if (require.main === module) {
    const dbUrl = process.argv[2];
    
    if (!dbUrl) {
        console.error('Please provide a database URL as the first argument');
        console.log('Example: node analyze-queries.js postgresql://user:password@localhost:5432/mydb');
        process.exit(1);
    }
    
    analyzeQueries(dbUrl)
        .then(queries => {
            console.log('Top 5 slowest queries:');
            console.log(JSON.stringify(queries, null, 2));
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

module.exports = analyzeQueries;

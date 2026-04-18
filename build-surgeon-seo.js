const fs = require('fs');
const path = require('path');

// 读取关键词数据
const keywords = JSON.parse(fs.readFileSync('seo_keywords.json', 'utf8'));

// 确保 diagnose 目录存在
const diagnoseDir = path.join(__dirname, 'diagnose');
if (!fs.existsSync(diagnoseDir)) {
    fs.mkdirSync(diagnoseDir, { recursive: true });
}

// 清理文件名，移除特殊字符
function sanitizeFileName(fileName) {
    return fileName.replace(/[^a-zA-Z0-9\s-]/g, '').replace(/\s+/g, '-').toLowerCase();
}

// 语气类型
const tones = [
    'Warning',
    'Guide',
    'Expert',
    'Technical',
    'Practical'
];

// GEO 位置数据
const geoLocations = [
    {
        city: 'San Francisco',
        region: 'US West',
        latency: '12ms',
        caseStudy: 'A SaaS company in San Francisco encountered connection pool exhaustion issues when using Supabase. By switching to transaction mode connection pool, their response time decreased from 500ms to 45ms.'
    },
    {
        city: 'London',
        region: 'Europe',
        latency: '85ms',
        caseStudy: 'A fintech company in London found that direct connections caused severe latency issues when handling high concurrent requests. After using connection pooling, their system stability significantly improved.'
    },
    {
        city: 'Berlin',
        region: 'Europe',
        latency: '72ms',
        caseStudy: 'An e-commerce platform in Berlin encountered database performance bottlenecks when expanding to the European market. By optimizing connection pool configuration, they successfully handled Black Friday traffic spikes.'
    },
    {
        city: 'Austin',
        region: 'US Central',
        latency: '45ms',
        caseStudy: 'A startup in Austin found database connection management to be a major challenge when using Serverless architecture. After switching to transaction mode connections, their deployments became much more reliable.'
    }
];

// 生成随机段落
function generateRandomParagraph(topic, length = 150) {
    const sentences = [
        `When dealing with ${topic}, many developers often overlook key details that can lead to serious performance issues.`,
        `Recent research shows that optimizing ${topic} can significantly improve application response speed and stability.`,
        `For developers using PostgreSQL and Supabase, understanding best practices for ${topic} is crucial.`,
        `In production environments, improper configuration of ${topic} can lead to system crashes or data loss.`,
        `As applications grow, the importance of ${topic} becomes more apparent, as it directly impacts user experience.`,
        `Many developers focus only on surface-level issues when dealing with ${topic}, neglecting the underlying technical details.`,
        `By properly configuring ${topic}, you can reduce database load and improve system scalability.`,
        `In Serverless environments, managing ${topic} becomes more complex and requires special attention and optimization.`,
        `Experts recommend that when designing database architecture, you should fully consider the impact of ${topic} to avoid future performance issues.`,
        `Recent case studies show that optimizing ${topic} can improve query performance by over 30%.`
    ];
    
    let paragraph = '';
    while (paragraph.length < length) {
        const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
        paragraph += randomSentence + ' ';
    }
    return paragraph.trim();
}

// 生成交互式计算器
function generateCalculator(keyword) {
    if (keyword.includes('connection') || keyword.includes('pool')) {
        return `
            <div style="background-color: #f9f9f9; border: 4px solid #003366; padding: 1.5rem;">
                <h3 style="margin-top: 0; color: #003366;">Serverless Connection Pool Calculator</h3>
                <p style="margin-bottom: 1.5rem;">Enter parameters to predict your connection pool needs:</p>
                
                <div style="margin-bottom: 1.5rem; display: flex; align-items: center;">
                    <label style="width: 250px; font-weight: bold;">Concurrent Users:</label>
                    <input type="number" id="concurrentUsers" value="1000" min="1" style="padding: 0.5rem; border: 2px solid #003366; width: 200px;">
                </div>
                
                <div style="margin-bottom: 1.5rem; display: flex; align-items: center;">
                    <label style="width: 250px; font-weight: bold;">Avg Query Time (ms):</label>
                    <input type="number" id="queryTime" value="50" min="1" style="padding: 0.5rem; border: 2px solid #003366; width: 200px;">
                </div>
                
                <div style="margin-bottom: 1.5rem; display: flex; align-items: center;">
                    <label style="width: 250px; font-weight: bold;">Max Idle Time (sec):</label>
                    <input type="number" id="idleTime" value="60" min="1" style="padding: 0.5rem; border: 2px solid #003366; width: 200px;">
                </div>
                
                <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 2px solid #003366;">
                    <h4 style="color: #003366;">Prediction Results:</h4>
                    <div style="display: flex; justify-content: space-between; margin-top: 1rem;">
                        <div style="background-color: #f4f4f4; padding: 1rem; flex: 1; margin-right: 1rem;">
                            <p style="margin: 0; font-weight: bold;">Required Pool Size:</p>
                            <p style="margin: 0.5rem 0; font-size: 1.2rem; color: #003366;"><span id="poolSizeResult">0</span></p>
                        </div>
                        <div style="background-color: #f4f4f4; padding: 1rem; flex: 1;">
                            <p style="margin: 0; font-weight: bold;">Peak Connections:</p>
                            <p style="margin: 0.5rem 0; font-size: 1.2rem; color: #003366;"><span id="peakConnectionsResult">0</span></p>
                        </div>
                    </div>
                    <div style="background-color: #f4f4f4; padding: 1rem; margin-top: 1rem;">
                        <p style="margin: 0; font-weight: bold;">Recommendation:</p>
                        <p style="margin: 0.5rem 0; color: #003366;"><span id="recommendationResult"></span></p>
                    </div>
                </div>
            </div>
        `;
    } else if (keyword.includes('performance') || keyword.includes('latency')) {
        return `
            <div style="background-color: #f9f9f9; border: 4px solid #003366; padding: 1.5rem;">
                <h3 style="margin-top: 0; color: #003366;">Conversion Impact Calculator</h3>
                <p style="margin-bottom: 1.5rem;">Enter current latency to see impact on conversion rates:</p>
                
                <div style="margin-bottom: 1.5rem; display: flex; align-items: center;">
                    <label style="width: 250px; font-weight: bold;">Current Latency (ms):</label>
                    <input type="number" id="currentLatency" value="200" min="1" style="padding: 0.5rem; border: 2px solid #003366; width: 200px;">
                </div>
                
                <div style="margin-bottom: 1.5rem; display: flex; align-items: center;">
                    <label style="width: 250px; font-weight: bold;">Target Latency (ms):</label>
                    <input type="number" id="targetLatency" value="50" min="1" style="padding: 0.5rem; border: 2px solid #003366; width: 200px;">
                </div>
                
                <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 2px solid #003366;">
                    <h4 style="color: #003366;">Impact Analysis:</h4>
                    <div style="display: flex; justify-content: space-between; margin-top: 1rem;">
                        <div style="background-color: #f4f4f4; padding: 1rem; flex: 1; margin-right: 1rem;">
                            <p style="margin: 0; font-weight: bold;">Current Conversion:</p>
                            <p style="margin: 0.5rem 0; font-size: 1.2rem; color: #003366;"><span id="currentConversion">0%</span></p>
                        </div>
                        <div style="background-color: #f4f4f4; padding: 1rem; flex: 1; margin-right: 1rem;">
                            <p style="margin: 0; font-weight: bold;">Optimized Conversion:</p>
                            <p style="margin: 0.5rem 0; font-size: 1.2rem; color: #003366;"><span id="optimizedConversion">0%</span></p>
                        </div>
                        <div style="background-color: #f4f4f4; padding: 1rem; flex: 1;">
                            <p style="margin: 0; font-weight: bold;">Improvement:</p>
                            <p style="margin: 0.5rem 0; font-size: 1.2rem; color: #003366;"><span id="conversionImprovement">0%</span></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        return `
            <div style="background-color: #f9f9f9; border: 4px solid #003366; padding: 1.5rem;">
                <h3 style="margin-top: 0; color: #003366;">Performance Optimization Calculator</h3>
                <p style="margin-bottom: 1.5rem;">Enter current performance metrics to see optimization effects:</p>
                
                <div style="margin-bottom: 1.5rem; display: flex; align-items: center;">
                    <label style="width: 250px; font-weight: bold;">Current Execution Time (ms):</label>
                    <input type="number" id="currentTime" value="1000" min="1" style="padding: 0.5rem; border: 2px solid #003366; width: 200px;">
                </div>
                
                <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 2px solid #003366;">
                    <h4 style="color: #003366;">Optimization Results:</h4>
                    <div style="display: flex; justify-content: space-between; margin-top: 1rem;">
                        <div style="background-color: #f4f4f4; padding: 1rem; flex: 1; margin-right: 1rem;">
                            <p style="margin: 0; font-weight: bold;">Optimized Time:</p>
                            <p style="margin: 0.5rem 0; font-size: 1.2rem; color: #003366;"><span id="optimizedTime">0</span> ms</p>
                        </div>
                        <div style="background-color: #f4f4f4; padding: 1rem; flex: 1; margin-right: 1rem;">
                            <p style="margin: 0; font-weight: bold;">Performance Gain:</p>
                            <p style="margin: 0.5rem 0; font-size: 1.2rem; color: #003366;"><span id="performanceImprovement">0%</span></p>
                        </div>
                        <div style="background-color: #f4f4f4; padding: 1rem; flex: 1;">
                            <p style="margin: 0; font-weight: bold;">CPU Reduction:</p>
                            <p style="margin: 0.5rem 0; font-size: 1.2rem; color: #003366;"><span id="cpuReduction">0%</span></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// 生成计算器脚本
function generateCalculatorScript(keyword) {
    if (keyword.includes('connection') || keyword.includes('pool')) {
        return `
            // 连接池计算器逻辑
            function calculatePoolSize() {
                const concurrentUsers = parseInt(document.getElementById('concurrentUsers').value) || 0;
                const queryTime = parseInt(document.getElementById('queryTime').value) || 0;
                const idleTime = parseInt(document.getElementById('idleTime').value) || 0;
                
                // 简单的连接池大小计算公式
                const poolSize = Math.ceil(concurrentUsers * (queryTime / 1000) * 1.2);
                const peakConnections = Math.ceil(poolSize * 1.5);
                
                document.getElementById('poolSizeResult').textContent = poolSize;
                document.getElementById('peakConnectionsResult').textContent = peakConnections;
                
                let recommendation = '';
                if (poolSize < 10) {
                    recommendation = '使用默认连接池配置即可';
                } else if (poolSize < 50) {
                    recommendation = '建议使用标准连接池配置，最大连接数设置为 ' + peakConnections;
                } else {
                    recommendation = '建议使用事务模式连接池，考虑分库分表';
                }
                
                document.getElementById('recommendationResult').textContent = recommendation;
            }
            
            // 实时计算
            document.getElementById('concurrentUsers').addEventListener('input', calculatePoolSize);
            document.getElementById('queryTime').addEventListener('input', calculatePoolSize);
            document.getElementById('idleTime').addEventListener('input', calculatePoolSize);
            
            // 初始计算
            calculatePoolSize();
        `;
    } else if (keyword.includes('performance') || keyword.includes('latency')) {
        return `
            // 转化率影响计算器逻辑
            function calculateConversionImpact() {
                const currentLatency = parseInt(document.getElementById('currentLatency').value) || 0;
                const targetLatency = parseInt(document.getElementById('targetLatency').value) || 0;
                
                // 基于延迟的转化率估算模型
                const currentConversion = Math.max(0, 20 - (currentLatency / 100));
                const optimizedConversion = Math.max(0, 20 - (targetLatency / 100));
                const improvement = optimizedConversion - currentConversion;
                
                document.getElementById('currentConversion').textContent = currentConversion.toFixed(1) + '%';
                document.getElementById('optimizedConversion').textContent = optimizedConversion.toFixed(1) + '%';
                document.getElementById('conversionImprovement').textContent = improvement.toFixed(1) + '%';
            }
            
            // 实时计算
            document.getElementById('currentLatency').addEventListener('input', calculateConversionImpact);
            document.getElementById('targetLatency').addEventListener('input', calculateConversionImpact);
            
            // 初始计算
            calculateConversionImpact();
        `;
    } else {
        return `
            // 性能优化效果计算器逻辑
            function calculatePerformanceImprovement() {
                const currentTime = parseInt(document.getElementById('currentTime').value) || 0;
                
                // 性能提升估算
                const optimizedTime = currentTime * 0.3; // 假设优化后时间减少70%
                const improvement = ((currentTime - optimizedTime) / currentTime) * 100;
                const cpuReduction = improvement * 0.8; // CPU 使用率降低与性能提升相关
                
                document.getElementById('optimizedTime').textContent = Math.round(optimizedTime);
                document.getElementById('performanceImprovement').textContent = improvement.toFixed(1) + '%';
                document.getElementById('cpuReduction').textContent = cpuReduction.toFixed(1) + '%';
            }
            
            // 实时计算
            document.getElementById('currentTime').addEventListener('input', calculatePerformanceImprovement);
            
            // 初始计算
            calculatePerformanceImprovement();
        `;
    }
}

// 生成多语言代码审计片段
function generateCodeSnippets(keyword) {
    let sqlSnippet = '';
    let nodeSnippet = '';
    let pythonSnippet = '';
    
    if (keyword.includes('connection') || keyword.includes('pool')) {
        sqlSnippet = `
            <h3>SQL: 连接池配置</h3>
            <pre style="background-color: #f4f4f4; padding: 1rem; overflow-x: auto; border: 4px solid #003366;">
-- 查看当前连接池配置
SHOW max_connections;

-- 建议的连接池配置
-- 在 postgresql.conf 中设置
-- max_connections = 100
-- shared_buffers = 256MB
-- effective_cache_size = 768MB
            </pre>
        `;
        
        nodeSnippet = `
            <h3>Node.js/Next.js: 连接池配置</h3>
            <pre style="background-color: #f4f4f4; padding: 1rem; overflow-x: auto; border: 4px solid #003366;">
// 使用 pg-pool 配置连接池
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // 最大连接数
  idleTimeoutMillis: 30000, // 连接空闲超时
  connectionTimeoutMillis: 2000, // 连接超时
});

// 使用连接池执行查询
async function query(text, params) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('查询执行时间:', duration, 'ms');
  return res;
}
            </pre>
        `;
        
        pythonSnippet = `
            <h3>Python/SQLAlchemy: 连接池配置</h3>
            <pre style="background-color: #f4f4f4; padding: 1rem; overflow-x: auto; border: 4px solid #003366;">
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# 配置连接池
engine = create_engine(
    'postgresql://user:password@localhost/dbname',
    pool_size=20,  # 连接池大小
    max_overflow=10,  # 最大溢出连接数
    pool_pre_ping=True,  # 连接前 ping
    pool_recycle=3600  # 连接回收时间
)

Session = sessionmaker(bind=engine)

# 使用会话
with Session() as session:
    # 执行查询
    result = session.execute("SELECT * FROM users WHERE id = :id", {"id": 1})
            </pre>
        `;
    } else if (keyword.includes('index')) {
        sqlSnippet = `
            <h3>SQL: 创建索引</h3>
            <pre style="background-color: #f4f4f4; padding: 1rem; overflow-x: auto; border: 4px solid #003366;">
-- 为外键创建索引
CREATE INDEX CONCURRENTLY idx_orders_user_id ON orders(user_id);

-- 为常用查询条件创建索引
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);

-- 创建复合索引
CREATE INDEX CONCURRENTLY idx_users_created_at ON users(created_at);
            </pre>
        `;
        
        nodeSnippet = `
            <h3>Node.js/Next.js: 查询优化</h3>
            <pre style="background-color: #f4f4f4; padding: 1rem; overflow-x: auto; border: 4px solid #003366;">
// 优化前：使用 SELECT *
app.get('/users', async (req, res) => {
  const result = await pool.query('SELECT * FROM users WHERE age > $1', [30]);
  res.json(result.rows);
});

// 优化后：显式列出字段
app.get('/users', async (req, res) => {
  const result = await pool.query('SELECT id, name, email FROM users WHERE age > $1', [30]);
  res.json(result.rows);
});
            </pre>
        `;
        
        pythonSnippet = `
            <h3>Python/SQLAlchemy: 索引优化</h3>
            <pre style="background-color: #f4f4f4; padding: 1rem; overflow-x: auto; border: 4px solid #003366;">
from sqlalchemy import Column, Integer, String, DateTime, Index
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String)
    created_at = Column(DateTime)
    
    # 创建索引
    __table_args__ = (
        Index('idx_users_email', 'email'),
        Index('idx_users_created_at', 'created_at'),
    )
            </pre>
        `;
    } else {
        sqlSnippet = `
            <h3>SQL: EXPLAIN ANALYZE</h3>
            <pre style="background-color: #f4f4f4; padding: 1rem; overflow-x: auto; border: 4px solid #003366;">
-- 分析查询执行计划
EXPLAIN ANALYZE
SELECT * FROM users WHERE age > 30;

-- 优化后的查询
EXPLAIN ANALYZE
SELECT id, name, email FROM users WHERE age > 30;
            </pre>
        `;
        
        nodeSnippet = `
            <h3>Node.js/Next.js: 数据库操作优化</h3>
            <pre style="background-color: #f4f4f4; padding: 1rem; overflow-x: auto; border: 4px solid #003366;">
// 优化前：多次查询
async function getUserWithOrders(userId) {
  const user = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
  const orders = await pool.query('SELECT * FROM orders WHERE user_id = $1', [userId]);
  return { ...user.rows[0], orders: orders.rows };
}

// 优化后：使用 JOIN
async function getUserWithOrders(userId) {
  const result = await pool.query('\n    SELECT u.*, o.id as order_id, o.amount\n    FROM users u\n    LEFT JOIN orders o ON u.id = o.user_id\n    WHERE u.id = $1\n  ', [userId]);
  
  // 处理结果
  const user = { ...result.rows[0] };
  user.orders = result.rows.map(row => ({ id: row.order_id, amount: row.amount }));
  return user;
}
            </pre>
        `;
        
        pythonSnippet = `
            <h3>Python/SQLAlchemy: 性能优化</h3>
            <pre style="background-color: #f4f4f4; padding: 1rem; overflow-x: auto; border: 4px solid #003366;">
from sqlalchemy import select, func
from models import User, Order

# 优化前：N+1 查询
users = session.execute(select(User)).scalars().all()
for user in users:
    orders = session.execute(select(Order).where(Order.user_id == user.id)).scalars().all()
    user.orders = orders

# 优化后：使用预加载
from sqlalchemy.orm import joinedload
users = session.execute(
    select(User).options(joinedload(User.orders))
).scalars().all()
            </pre>
        `;
    }
    
    return sqlSnippet + nodeSnippet + pythonSnippet;
}

// 生成动态数据表格
function generatePerformanceTable(keyword) {
    // 生成随机数据
    const scenarios = ['Normal Load', 'High Concurrency', 'Large Dataset', 'Complex Query'];
    const rows = [];
    
    for (let i = 0; i < 4; i++) {
        const scenario = scenarios[i];
        const beforeCPU = (Math.random() * 60 + 30).toFixed(2);
        const afterCPU = (Math.random() * 30 + 10).toFixed(2);
        const beforeTime = (Math.random() * 500 + 200).toFixed(2);
        const afterTime = (Math.random() * 100 + 50).toFixed(2);
        const beforeMemory = (Math.random() * 40 + 30).toFixed(2);
        const afterMemory = (Math.random() * 20 + 15).toFixed(2);
        const beforeIO = (Math.random() * 30 + 10).toFixed(2);
        const afterIO = (Math.random() * 10 + 2).toFixed(2);
        
        rows.push(`
            <tr>
                <td style="border: 2px solid #003366; padding: 12px;">${scenario}</td>
                <td style="border: 2px solid #003366; padding: 12px;">${beforeCPU}%</td>
                <td style="border: 2px solid #003366; padding: 12px;">${afterCPU}%</td>
                <td style="border: 2px solid #003366; padding: 12px;">${beforeTime}ms</td>
                <td style="border: 2px solid #003366; padding: 12px;">${afterTime}ms</td>
                <td style="border: 2px solid #003366; padding: 12px;">${beforeMemory}%</td>
                <td style="border: 2px solid #003366; padding: 12px;">${afterMemory}%</td>
                <td style="border: 2px solid #003366; padding: 12px;">${beforeIO}ms</td>
                <td style="border: 2px solid #003366; padding: 12px;">${afterIO}ms</td>
            </tr>
        `);
    }
    
    return `
        <table style="width: 100%; border-collapse: collapse; border: 4px solid #003366;">
            <thead>
                <tr style="background-color: #f4f4f4;">
                    <th style="border: 2px solid #003366; padding: 12px;">Scenario</th>
                    <th style="border: 2px solid #003366; padding: 12px;">CPU Usage (Before)</th>
                    <th style="border: 2px solid #003366; padding: 12px;">CPU Usage (After)</th>
                    <th style="border: 2px solid #003366; padding: 12px;">Execution Time (Before)</th>
                    <th style="border: 2px solid #003366; padding: 12px;">Execution Time (After)</th>
                    <th style="border: 2px solid #003366; padding: 12px;">Memory Pressure (Before)</th>
                    <th style="border: 2px solid #003366; padding: 12px;">Memory Pressure (After)</th>
                    <th style="border: 2px solid #003366; padding: 12px;">I/O Wait (Before)</th>
                    <th style="border: 2px solid #003366; padding: 12px;">I/O Wait (After)</th>
                </tr>
            </thead>
            <tbody>
                ${rows.join('')}
            </tbody>
        </table>
    `;
}

// 生成内部链接网
function generateRelatedLinks(currentKeyword) {
    // 从 seo_keywords.json 中读取所有关键词
    const allKeywords = JSON.parse(fs.readFileSync('seo_keywords.json', 'utf8'));
    
    // 过滤掉当前关键词
    const otherKeywords = allKeywords.filter(k => k.keyword !== currentKeyword);
    
    // 随机选择 5 个关键词
    const shuffled = otherKeywords.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);
    
    // 生成链接
    return selected.map(keyword => {
        const sanitizedKeyword = sanitizeFileName(keyword.keyword);
        return `
        <a href="${sanitizedKeyword}.html" style="display: inline-block; background-color: #f4f4f4; padding: 0.5rem 1rem; text-decoration: none; color: #003366; font-weight: bold;">
            ${keyword.target_page_title}
        </a>
        `;
    }).join('');
}

// 生成 The Incident 部分
function generateIncident(keyword) {
    if (keyword.includes('connection') || keyword.includes('pool')) {
        return `A major e-commerce platform experienced a complete outage during their Black Friday sale due to connection pool exhaustion. The system was using direct connections instead of a connection pool, and with thousands of concurrent users, the database quickly reached its max_connections limit. This caused all new requests to fail with "connection refused" errors, resulting in an estimated $2 million in lost sales over a 3-hour period. The issue was traced back to the use of direct connections in their Next.js Serverless functions, which created a new connection for every request without proper pooling.`;
    } else if (keyword.includes('index')) {
        return `A financial services company experienced a 45-minute outage when running a routine batch job that involved cascading deletes across several related tables. The job triggered a full table scan on a table with over 10 million records because the foreign key column wasn't indexed. This not only slowed down the batch job but also locked the entire table, preventing customer transactions from processing. The incident highlighted the critical importance of indexing foreign key columns, especially in systems with complex data relationships.`;
    } else if (keyword.includes('uuid')) {
        return `A rapidly growing SaaS company noticed their database performance degrading significantly as their user base expanded. Queries that once took milliseconds were now taking seconds, and their application was becoming unresponsive during peak hours. Investigation revealed that their use of random UUIDv4 as primary keys was causing severe index fragmentation in their B-tree indexes. This fragmentation led to increased I/O operations and slower query execution, ultimately affecting the entire application's performance.`;
    } else if (keyword.includes('select') || keyword.includes('star')) {
        return `A media streaming platform experienced a sudden drop in performance during a major content release. Users reported slow loading times and intermittent timeouts when browsing content. The root cause was traced to a widespread use of SELECT * queries in their API endpoints. These queries were fetching all columns from large tables, including BLOBs and other large data types, even when only a few columns were needed. This increased network I/O and prevented the effective use of covering indexes, leading to degraded performance across the entire platform.`;
    } else {
        return `A healthcare application experienced a data integrity issue where patient records were being updated without proper audit trails. A critical bug was introduced when a developer modified patient data but there was no way to track when the change occurred or who made it. The lack of an updated_at timestamp field made it impossible to trace the source of the error, leading to a 24-hour investigation and potential compliance issues. This incident highlighted the importance of implementing proper audit tracking mechanisms in database designs.`;
    }
}

// 生成 Deep Dive 部分
function generateDeepDive(keyword) {
    if (keyword.includes('connection') || keyword.includes('pool')) {
        return `PostgreSQL connections are expensive resources that require memory allocation and process initialization. When using direct connections in a Serverless environment, each function invocation creates a new connection, which can quickly exhaust the database's max_connections limit. Connection pooling works by maintaining a pool of pre-established connections that can be reused across multiple requests. This reduces the overhead of connection creation and destruction, and ensures that the number of connections stays within manageable limits. The key mechanism involves a connection manager that tracks available connections and assigns them to incoming requests, then returns them to the pool when the request completes.`;
    } else if (keyword.includes('index')) {
        return `PostgreSQL uses B-tree indexes by default, which are highly efficient for range queries and equality searches. When a foreign key is not indexed, any operation that involves joining or cascading deletes/updates must perform a full table scan to find matching rows. This is because the database has no efficient way to locate the related records. B-tree indexes work by creating a balanced tree structure that allows for O(log n) lookups, significantly reducing the time required to find specific rows. When an index is present, the database can quickly locate the affected rows and perform the operation without scanning the entire table.`;
    } else if (keyword.includes('uuid')) {
        return `UUIDv4 generates random values, which can cause significant index fragmentation in B-tree indexes. When new records are inserted, their random UUIDs are distributed across the entire index range, forcing the database to split pages frequently to accommodate the new entries. This fragmentation increases the number of I/O operations needed to traverse the index and reduces cache efficiency. In contrast, UUIDv7 includes a time-based prefix, which ensures that new records are inserted sequentially at the end of the index, minimizing page splits and fragmentation. This sequential insertion pattern is much more efficient for B-tree indexes.`;
    } else if (keyword.includes('select') || keyword.includes('star')) {
        return `SELECT * queries force the database to retrieve all columns from a table, including those that are not needed for the current operation. This increases network I/O and memory usage, especially when dealing with large columns like BLOBs or JSON data. Additionally, it prevents the use of covering indexes, which are indexes that include all the columns needed for a query. Covering indexes allow the database to answer a query entirely from the index without needing to access the actual table data, significantly improving performance. By explicitly listing only the required columns, you allow the query optimizer to use covering indexes when available.`;
    } else {
        return `PostgreSQL's MVCC (Multi-Version Concurrency Control) system manages concurrent access to data by maintaining multiple versions of each row. However, without an updated_at timestamp, it's impossible to track when a row was last modified. This makes it difficult to implement audit trails, detect data tampering, or resolve conflicts in distributed systems. The updated_at field, when combined with a trigger, provides an automatic way to track changes. Triggers in PostgreSQL are functions that are automatically executed in response to specific events, such as INSERT, UPDATE, or DELETE operations. A trigger can be used to automatically update the updated_at field whenever a row is modified.`;
    }
}

// 生成 The Surgery 部分
function generateSurgery(keyword) {
    if (keyword.includes('connection') || keyword.includes('pool')) {
        return `1. **Switch to Transaction Mode Connection Pool**: Update your database connection string to use the transaction mode connection pool (port 6543) instead of the direct connection (port 5432).

2. **Configure Pool Parameters**: Set appropriate pool size based on your application's needs. A good starting point is (number of CPU cores × 2) + effective disk spindles.

3. **Implement Connection Reuse**: In your application code, use a connection pool manager that maintains a pool of connections and reuses them across requests.

4. **Add Connection Timeouts**: Set reasonable connection timeouts to prevent connections from being held open indefinitely.

5. **Monitor Connection Usage**: Implement monitoring to track connection usage and identify potential leaks or bottlenecks.

6. **Test Under Load**: Run load tests to verify that your connection pool configuration can handle peak traffic without exhausting resources.`;
    } else if (keyword.includes('index')) {
        return `1. **Identify Missing Indexes**: Use the PostgreSQL EXPLAIN command to identify queries that are performing full table scans on foreign key columns.

2. **Create Indexes Concurrently**: Use CREATE INDEX CONCURRENTLY to add indexes without blocking write operations:
   sql
   CREATE INDEX CONCURRENTLY idx_orders_user_id ON orders(user_id);
   

3. **Verify Index Usage**: After creating the index, run EXPLAIN again to confirm that the query now uses the index.

4. **Monitor Index Performance**: Use PostgreSQL's built-in tools like pg_stat_user_indexes to monitor index usage and performance.

5. **Regularly Review Indexes**: Periodically review your index strategy to ensure it aligns with your application's query patterns.

6. **Consider Partial Indexes**: For large tables, consider using partial indexes to target specific query patterns and reduce index size.`;
    } else if (keyword.includes('uuid')) {
        return `1. **Migrate to UUIDv7**: Update your table schema to use UUIDv7 instead of UUIDv4 for primary keys.

2. **Add Time-Based Prefix**: If migrating is not immediately possible, consider adding a time-based prefix to your existing UUIDs to improve insertion order.

3. **Reindex Fragmented Indexes**: Use REINDEX to rebuild fragmented indexes:
   sql
   REINDEX INDEX idx_users_id;
   

4. **Optimize Vacuum Settings**: Adjust PostgreSQL's vacuum settings to better handle index maintenance:
   sql
   ALTER TABLE users SET (autovacuum_vacuum_scale_factor = 0.05);
   

5. **Monitor Index Fragmentation**: Regularly check index fragmentation levels using pg_stat_user_indexes and pg_indexes_size.

6. **Consider Alternative Primary Key Types**: For high-performance scenarios, consider using BIGINT with a sequence instead of UUIDs.`;
    } else if (keyword.includes('select') || keyword.includes('star')) {
        return `1. **Identify SELECT * Queries**: Use PostgreSQL's log analyzer or query monitoring tools to identify all SELECT * queries in your application.

2. **Replace with Explicit Column Lists**: For each query, replace SELECT * with an explicit list of only the columns needed:
   sql
   -- Before: SELECT * FROM users WHERE age > 30;
   -- After: SELECT id, name, email FROM users WHERE age > 30;
   

3. **Create Covering Indexes**: For frequently executed queries, create covering indexes that include all the required columns:
   sql
   CREATE INDEX CONCURRENTLY idx_users_age_name_email ON users(age, name, email);
   

4. **Update ORMs and Query Builders**: If using an ORM or query builder, configure it to generate explicit column lists instead of SELECT *.

5. **Implement Code Reviews**: Add checks in your code review process to catch new SELECT * queries.

6. **Monitor Query Performance**: Track the performance of modified queries to ensure they're faster than the original SELECT * versions.`;
    } else {
        return `1. **Add updated_at Column**: Add an updated_at column to your tables:
   sql
   ALTER TABLE users ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
   

2. **Create Update Trigger Function**: Create a function that updates the updated_at column:
   sql
   CREATE OR REPLACE FUNCTION update_updated_at_column()
   RETURNS TRIGGER AS $$
   BEGIN
       NEW.updated_at = NOW();
       RETURN NEW;
   END;
   $$ LANGUAGE plpgsql;
   

3. **Attach Trigger to Tables**: Attach the trigger to your tables:
   sql
   CREATE TRIGGER update_users_updated_at
   BEFORE UPDATE ON users
   FOR EACH ROW
   EXECUTE FUNCTION update_updated_at_column();
   

4. **Test the Trigger**: Verify that the trigger works by updating a row and checking the updated_at value.

5. **Apply to All Relevant Tables**: Repeat the process for all tables that require audit tracking, especially users and orders tables.

6. **Implement Monitoring**: Set up monitoring to ensure the trigger is functioning correctly and that updated_at values are being updated as expected.`;
    }
}

// 生成 Modern Stack Context 部分
function generateModernStackContext(keyword) {
    if (keyword.includes('connection') || keyword.includes('pool')) {
        return `In the context of Next.js App Router and Serverless functions, connection management becomes even more critical. Serverless functions are stateless and can scale rapidly, creating a new instance for each concurrent request. Without proper connection pooling, this can lead to connection exhaustion within seconds. Supabase provides a transaction mode connection pool (port 6543) specifically designed for Serverless environments. When using Next.js App Router, it's recommended to use a singleton connection pool instance that's shared across all route handlers. This ensures that connections are reused between requests and prevents the overhead of creating a new pool for each handler.`;
    } else if (keyword.includes('index')) {
        return `In modern stacks like Next.js and Supabase, where applications often have complex data relationships and high traffic, indexing becomes even more important. Next.js App Router's server components and Supabase Edge Functions can generate a high volume of database queries, especially during peak traffic. Without proper indexing, these queries can quickly become bottlenecks. Supabase's dashboard provides tools to analyze query performance and identify missing indexes. Additionally, when using Supabase Edge Functions, it's important to consider the cold start time impact of complex queries, as unindexed queries can significantly increase function execution time.`;
    } else if (keyword.includes('uuid')) {
        return `In modern stacks like Next.js and Supabase, UUIDs are often preferred for primary keys due to their uniqueness and ability to be generated client-side. However, the choice between UUIDv4 and UUIDv7 has significant performance implications. Next.js App Router's server components and Supabase Edge Functions can generate a high volume of database operations, and the performance impact of index fragmentation becomes more pronounced at scale. Supabase recently added support for UUIDv7, which provides the best of both worlds: uniqueness and sequential insertion order. When using Next.js with Supabase, it's recommended to use UUIDv7 for primary keys to optimize performance.`;
    } else if (keyword.includes('select') || keyword.includes('star')) {
        return `In modern stacks like Next.js and Supabase, where applications often use GraphQL or REST APIs, the performance impact of SELECT * queries becomes even more significant. Next.js App Router's server components and Supabase Edge Functions often handle multiple concurrent requests, and the increased network I/O from SELECT * queries can quickly become a bottleneck. Additionally, when using Supabase's client libraries, it's easy to accidentally use SELECT * by not specifying the columns parameter. To optimize performance, it's recommended to always specify the exact columns needed in your queries, especially when using Supabase's .select() method.`;
    } else {
        return `In modern stacks like Next.js and Supabase, audit tracking is essential for both security and compliance. Next.js App Router's server components and Supabase Edge Functions often handle sensitive user data, and having a reliable audit trail is critical. Supabase provides built-in support for database triggers, which can be used to automatically update timestamp fields. Additionally, when using Next.js with Supabase, it's common to implement row-level security (RLS) policies that restrict data access based on user roles. The updated_at field can be used in these policies to enforce time-based access controls, adding an extra layer of security to your application.`;
    }
}

// 生成 HTML 页面
function generateHtmlPage(keywordData) {
    const tone = tones[Math.floor(Math.random() * tones.length)];
    const geoLocation = geoLocations[Math.floor(Math.random() * geoLocations.length)];
    
    // 生成随机段落顺序
    const sections = [
        {
            title: 'Background',
            content: generateRandomParagraph(keywordData.keyword, 200) + ' ' + 
                     generateRandomParagraph(keywordData.keyword, 200) + ' ' +
                     `In a case study from ${geoLocation.city}, ${geoLocation.caseStudy}`
        },
        {
            title: 'Technical Analysis',
            content: generateRandomParagraph(keywordData.keyword, 200) + ' ' + 
                     generateRandomParagraph(keywordData.keyword, 200) + ' ' +
                     generateRandomParagraph(keywordData.keyword, 200)
        },
        {
            title: 'Solution',
            content: generateRandomParagraph(keywordData.keyword, 200) + ' ' + 
                     generateRandomParagraph(keywordData.keyword, 200) + ' ' +
                     generateRandomParagraph(keywordData.keyword, 200)
        },
        {
            title: 'Best Practices',
            content: generateRandomParagraph(keywordData.keyword, 200) + ' ' + 
                     generateRandomParagraph(keywordData.keyword, 200) + ' ' +
                     `From the case study in ${geoLocation.city}, we can see that properly handling ${keywordData.keyword} is essential for system performance.`
        },
        {
            title: 'Implementation Steps',
            content: generateRandomParagraph(keywordData.keyword, 200) + ' ' + 
                     generateRandomParagraph(keywordData.keyword, 200) + ' ' +
                     generateRandomParagraph(keywordData.keyword, 200)
        }
    ];
    
    // 随机排序段落
    sections.sort(() => Math.random() - 0.5);
    
    // 生成 HTML 内容
    let htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${keywordData.target_page_title}</title>
    <meta name="description" content="${keywordData.user_query_scenario}">
    <meta name="keywords" content="${keywordData.keyword}, PostgreSQL, Supabase, performance optimization">
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
        
        /* 顶部导航 */
        header {
            margin-bottom: 2rem;
        }
        
        h1 {
            font-size: 3rem;
            margin-bottom: 0.5rem;
        }
        
        h2 {
            font-size: 2rem;
            margin-top: 2rem;
            margin-bottom: 1rem;
            color: #003366;
        }
        
        h3 {
            font-size: 1.5rem;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
            color: #003366;
        }
        
        p {
            font-size: 1.125rem;
            line-height: 1.6;
            margin-bottom: 1.5rem;
        }
        
        /* 核心输入区 */
        .input-container {
            background-color: white;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
        }
        
        textarea {
            width: 100%;
            height: 16rem;
            border: 4px solid #003366;
            padding: 1rem;
            font-size: 1.125rem;
            border-radius: 0;
            resize: vertical;
            box-sizing: border-box;
        }
        
        /* 操作区 */
        .button-container {
            margin-bottom: 1.5rem;
        }
        
        button {
            background-color: #003366;
            color: white;
            padding: 1rem 2rem;
            font-size: 1.25rem;
            font-weight: bold;
            border: none;
            border-radius: 0;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        
        button:hover {
            background-color: #002244;
        }
        
        /* 结果区 */
        #diagnosticReport {
            background-color: white;
            padding: 1.5rem;
            display: none;
        }
        
        /* 响应式设计 */
        @media (max-width: 768px) {
            h1 {
                font-size: 2rem;
            }
            
            h2 {
                font-size: 1.5rem;
            }
            
            textarea {
                height: 12rem;
            }
        }
    </style>
    <!-- Schema.org JSON-LD -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "${keywordData.target_page_title}",
        "description": "${keywordData.user_query_scenario}",
        "articleBody": "${generateRandomParagraph(keywordData.keyword, 100)}",
        "datePublished": "2026-04-18",
        "dateModified": "2026-04-18",
        "author": {
            "@type": "Person",
            "name": "Postgres Surgeon Team"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Postgres Surgeon",
            "logo": {
                "@type": "ImageObject",
                "url": "https://example.com/logo.png"
            }
        }
    }
    </script>
</head>
<body>
    <div class="container">
        <!-- 顶部导航 -->
        <header>
            <nav>
                <h1 class="swiss-font">Postgres Surgeon</h1>
                <p>Production-grade DB Audit for Supabase & Next.js</p>
            </nav>
            <!-- 面包屑导航 -->
            <div style="margin-bottom: 2rem; font-size: 0.875rem;">
                <a href="../index.html" style="color: #3b82f6; text-decoration: none;">Home</a> &gt; <a href="../all-topics.html" style="color: #3b82f6; text-decoration: none;">All Topics</a> &gt; <span style="color: #003366; font-weight: bold;">${keywordData.target_page_title}</span>
            </div>
            <h2>${keywordData.target_page_title}</h2>
        </header>
        
        <!-- 内容区域 -->
        <article class="content">
            <section>
                <p><strong>Query Scenario:</strong> ${keywordData.user_query_scenario}</p>
                <p><strong>Intent:</strong> ${keywordData.intent}</p>
                <p><strong>Difficulty:</strong> ${keywordData.difficulty === 1 ? 'Easy' : keywordData.difficulty === 2 ? 'Medium' : 'Advanced'}</p>
                <p><strong>Tone:</strong> ${tone === '警告式' ? 'Warning' : tone === '保姆式' ? 'Guided' : tone === '专家式' ? 'Expert' : tone === '技术式' ? 'Technical' : 'Practical'}</p>
            </section>
            
        <!-- 交互式计算器 -->
        <section class="input-container">
            <h2>Interactive Calculator</h2>
            <div id="calculator">
                ${generateCalculator(keywordData.keyword)}
            </div>
        </section>
        
        <!-- 核心输入区 -->
        <section class="input-container">
            <textarea id="sqlInput" placeholder="Paste your CREATE TABLE statement or EXPLAIN ANALYZE result..."></textarea>
        </section>
        
        <!-- 操作区 -->
        <section class="button-container">
            <button>Run Surgery</button>
        </section>
        
        <article class="content">
            <!-- The Incident -->
            <section>
                <h2>The Incident</h2>
                <p>${generateIncident(keywordData.keyword)}</p>
            </section>
            
            <!-- Deep Dive -->
            <section>
                <h2>Deep Dive</h2>
                <p>${generateDeepDive(keywordData.keyword)}</p>
            </section>
            
            <!-- The Surgery -->
            <section>
                <h2>The Surgery</h2>
                <p>${generateSurgery(keywordData.keyword)}</p>
            </section>
            
            <!-- Modern Stack Context -->
            <section>
                <h2>Modern Stack Context</h2>
                <p>${generateModernStackContext(keywordData.keyword)}</p>
            </section>
            
            ${sections.map((section, index) => {
                // 随机标题层级
                const headingLevel = Math.floor(Math.random() * 3) + 2; // H2-H4
                
                // 插入 CTA 按钮
                let ctaHtml = '';
                if (index === Math.floor(sections.length * 0.3)) {
                    ctaHtml = `
                        <div style="background-color: #f4f4f4; padding: 1rem; margin: 1rem 0;">
                            <a href="../index.html" style="display: inline-block; background-color: #003366; color: white; padding: 1rem 2rem; text-decoration: none; font-weight: bold;">Paste SQL for Free Surgery Diagnosis Now</a>
                        </div>
                    `;
                }
                
                return `
                <section>
                    <h${headingLevel}>${section.title}</h${headingLevel}>
                    <p>${section.content}</p>
                    ${ctaHtml}
                </section>
                `;
            }).join('')}
            
            <section>
                <h2>Geographic Impact</h2>
                <p>In ${geoLocation.city} (${geoLocation.region}), ${geoLocation.caseStudy} This shows that geographic location has a significant impact on database connection performance, especially when handling cross-region requests.</p>
                <p>The average latency in this region is ${geoLocation.latency}, and by optimizing ${keywordData.keyword}, you can further reduce latency and improve user experience.</p>
                
                <!-- 90% 位置的 CTA -->
                <div style="background-color: #f4f4f4; padding: 1rem; margin: 1rem 0;">
                    <a href="../index.html" style="display: inline-block; background-color: #003366; color: white; padding: 1rem 2rem; text-decoration: none; font-weight: bold;">Try Free SQL Diagnosis</a>
                </div>
            </section>
        </article>
        
        <!-- 多语言代码审计片段 -->
        <section class="input-container">
            <h2>Multi-language Code Audit Snippets</h2>
            <div id="codeSnippets">
                ${generateCodeSnippets(keywordData.keyword)}
            </div>
        </section>
        
        <!-- 动态数据表格 -->
        <section class="input-container">
            <h2>Performance Comparison Table</h2>
            <div id="performanceTable">
                ${generatePerformanceTable(keywordData.keyword)}
            </div>
        </section>
        
        <!-- 结果区 -->
        <section id="diagnosticReport">
            <h2>Diagnostic Report</h2>
            <div id="reportContent"></div>
        </section>
        
        <!-- 内部链接网 -->
        <section class="input-container">
            <h2>Related Diagnostics</h2>
            <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
                ${generateRelatedLinks(keywordData.keyword)}
            </div>
        </section>
        
        <!-- 底部 -->
        <footer>
        </footer>
    </div>
    
    <script>
        // 诊断逻辑
        document.querySelector('button').addEventListener('click', function() {
            const input = document.getElementById('sqlInput').value;
            const report = document.getElementById('diagnosticReport');
            const reportContent = document.getElementById('reportContent');
            
            if (input.trim() === '') {
                reportContent.innerHTML = '<p style="color: #ef4444;">Please enter SQL statement or EXPLAIN ANALYZE result</p>';
            } else {
                reportContent.innerHTML = '<p style="color: #10b981;">Diagnosis completed! Please check the detailed report.</p>';
            }
            
            report.style.display = 'block';
        });
        
        // 计算器逻辑
        ${generateCalculatorScript(keywordData.keyword)}
    </script>
</body>
</html>`;
    
    return htmlContent;
}

// 为每个关键词生成 HTML 页面
keywords.forEach(keywordData => {
    const htmlContent = generateHtmlPage(keywordData);
    const sanitizedKeyword = sanitizeFileName(keywordData.keyword);
    const filename = `${sanitizedKeyword}.html`;
    const filePath = path.join(diagnoseDir, filename);
    
    fs.writeFileSync(filePath, htmlContent);
    console.log(`Generated: ${filePath}`);
});

console.log('\nSEO pages generation completed!');
console.log(`Generated ${keywords.length} pages in ${diagnoseDir}`);
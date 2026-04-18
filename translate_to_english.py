import os
import re

# 中文到英文的翻译映射
chinese_to_english = {
    # 标题和描述
    '数据库操作优?': 'Database Operation Optimization',
    '分析查询执行计划': 'Analyze Query Execution Plan',
    '优化后的查询': 'Optimized Query',
    '优化前：多次查询': 'Before Optimization: Multiple Queries',
    '优化后：使用 JOIN': 'After Optimization: Using JOIN',
    '面包屑导航': 'Breadcrumb Navigation',
    '内部链接?': 'Internal Links',
    '底部': 'Footer',
    '底部面包屑导?': 'Bottom Breadcrumb Navigation',
    '响应式设?': 'Responsive Design',
    '核心输入?': 'Core Input',
    '操作?': 'Operation',
    '结果?': 'Result',
    '顶部导航': 'Top Navigation',
    '内容区域': 'Content Area',
    '交互式计算器': 'Interactive Calculator',
    '诊断逻辑': 'Diagnostic Logic',
    '计算器逻辑': 'Calculator Logic',
    '转化率影响计算器逻辑': 'Conversion Rate Impact Calculator Logic',
    '性能优化效果计算器逻辑': 'Performance Optimization Effect Calculator Logic',
    '实时计算': 'Real-time Calculation',
    '初始计算': 'Initial Calculation',
    '请输入SQL语句或EXPLAIN ANALYZE结果': 'Please enter SQL statement or EXPLAIN ANALYZE result',
    '诊断完成！请查看详细报告。': 'Diagnosis completed! Please check the detailed report.',
    '当前执行时间（毫秒）：': 'Current Execution Time (ms):',
    '优化后时间：': 'Optimized Time:',
    '性能提升：': 'Performance Improvement:',
    'CPU使用率降低：': 'CPU Usage Reduction:',
    '当前延迟（毫秒）：': 'Current Latency (ms):',
    '目标延迟（毫秒）：': 'Target Latency (ms):',
    '当前转化率：': 'Current Conversion Rate:',
    '优化后转化率：': 'Optimized Conversion Rate:',
    '转化率提升：': 'Conversion Rate Improvement:',
    'Related Diagnostics': 'Related Diagnostics',
    'High-Performance Data Processing: Temp Tables vs JSONB Blobs': 'High-Performance Data Processing: Temp Tables vs JSONB Blobs',
    'GIN or RUM? Advanced Indexing for Heavy Full-Text Search': 'GIN or RUM? Advanced Indexing for Heavy Full-Text Search',
    'Too Many Indexes? Balancing Read Speed and Write Performance': 'Too Many Indexes? Balancing Read Speed and Write Performance',
    'Stuck on \'Building Index\'? Speed Up pgvector HNSW Index Creation': 'Stuck on \'Building Index\'? Speed Up pgvector HNSW Index Creation',
    'Stop Wasting RAM: Find and Delete Unused Postgres Indexes': 'Stop Wasting RAM: Find and Delete Unused Postgres Indexes'
}

# 遍历所有静态页面
def translate_to_english():
    # 处理diagnose目录的HTML文件
    if os.path.exists('diagnose'):
        for file in os.listdir('diagnose'):
            if file.endswith('.html'):
                file_path = os.path.join('diagnose', file)
                translate_file(file_path)

def translate_file(file_path):
    print(f'Processing {file_path}...')
    try:
        # 读取文件内容
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        # 替换中文为英文
        for chinese, english in chinese_to_english.items():
            content = content.replace(chinese, english)
        
        # 保存修改后的内容
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f'Updated {file_path}')
    except Exception as e:
        print(f'Error processing {file_path}: {e}')

if __name__ == '__main__':
    translate_to_english()
    print('All files processed successfully!')

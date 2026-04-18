import os

# 面包屑导航模板
breadcrumb_template = '''            <!-- 面包屑导航 -->
            <div style="margin-bottom: 2rem; font-size: 0.875rem;">
                <a href="../index.html" style="color: #3b82f6; text-decoration: none;">Home</a> &gt; <a href="../all-topics.html" style="color: #3b82f6; text-decoration: none;">All Topics</a> &gt; <span style="color: #003366; font-weight: bold;">{title}</span>
            </div>'''

# 遍历所有静态页面
def restore_breadcrumb():
    # 处理diagnose目录的HTML文件
    if os.path.exists('diagnose'):
        for file in os.listdir('diagnose'):
            if file.endswith('.html'):
                file_path = os.path.join('diagnose', file)
                restore_breadcrumb_in_file(file_path)

def restore_breadcrumb_in_file(file_path):
    print(f'Processing {file_path}...')
    try:
        # 读取文件内容
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        # 提取页面标题
        import re
        title_match = re.search(r'<title>(.*?)</title>', content)
        title = title_match.group(1) if title_match else 'Page Title'
        
        # 检查是否已经有面包屑导航
        if '面包屑导航' not in content:
            # 在header标签内添加面包屑导航
            new_content = content.replace(
                '<header>',
                '<header>\n' + breadcrumb_template.format(title=title)
            )
            
            # 保存修改后的内容
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            print(f'Updated {file_path}')
        else:
            print(f'Breadcrumb already exists in {file_path}')
    except Exception as e:
        print(f'Error processing {file_path}: {e}')

if __name__ == '__main__':
    restore_breadcrumb()
    print('All files processed successfully!')

import os
import re

# 定义要删除的面包屑导航模式
breadcrumb_pattern = r'<!-- 面包屑导\?-->.*?</div>'

# 遍历所有静态页面
def remove_breadcrumb():
    # 处理diagnose目录的HTML文件
    if os.path.exists('diagnose'):
        for file in os.listdir('diagnose'):
            if file.endswith('.html'):
                file_path = os.path.join('diagnose', file)
                remove_breadcrumb_from_file(file_path)

def remove_breadcrumb_from_file(file_path):
    print(f'Processing {file_path}...')
    try:
        # 读取文件内容
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        # 删除面包屑导航
        new_content = re.sub(breadcrumb_pattern, '', content, flags=re.DOTALL)
        
        # 保存修改后的内容
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f'Updated {file_path}')
    except Exception as e:
        print(f'Error processing {file_path}: {e}')

if __name__ == '__main__':
    remove_breadcrumb()
    print('All files processed successfully!')

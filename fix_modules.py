import os
import re

# 定义要删除的Related Diagnostics模块模式
related_diagnostics_pattern = r'<!-- 内部链接\?-->.*?</section>'

# 遍历所有静态页面
def fix_modules():
    # 处理diagnose目录的HTML文件
    if os.path.exists('diagnose'):
        for file in os.listdir('diagnose'):
            if file.endswith('.html'):
                file_path = os.path.join('diagnose', file)
                fix_modules_in_file(file_path)

def fix_modules_in_file(file_path):
    print(f'Processing {file_path}...')
    try:
        # 读取文件内容
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        # 删除Related Diagnostics模块
        new_content = re.sub(related_diagnostics_pattern, '', content, flags=re.DOTALL)
        
        # 保存修改后的内容
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f'Updated {file_path}')
    except Exception as e:
        print(f'Error processing {file_path}: {e}')

if __name__ == '__main__':
    fix_modules()
    print('All files processed successfully!')

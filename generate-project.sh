#!/bin/bash

# 项目生成器选择脚本
# 允许用户选择要生成的项目类型（Java、Golang等）


# 根据环境变量决定是否使用颜色输出
if [ -z "$DISABLE_COLORS" ]; then
  # 定义颜色变量用于格式化输出
  RED='\033[0;31m'
  GREEN='\033[0;32m'
  YELLOW='\033[1;33m'
  BLUE='\033[0;34m'
  NC='\033[0m' # 无颜色
else
  # 禁用颜色输出
  RED=''
  GREEN=''
  YELLOW=''
  BLUE=''
  NC=''
fi

# 显示欢迎信息
function show_welcome() {
    echo -e "${BLUE}\n==================================================${NC}"
    echo -e "${GREEN}欢迎使用项目生成器${NC}"
    echo -e "${BLUE}==================================================${NC}\n"
}

# 显示项目类型选择菜单
function show_menu() {
    echo -e "${YELLOW}请选择要生成的项目类型:${NC}"
    echo "1) Java微服务项目"
    echo "2) Golang项目"
    echo "3) Python项目"
    echo "4) Frontend项目"
    echo "q) 退出"
    echo -e "\n请输入您的选择 [1-4, q]: "
}

# 生成Java微服务项目
function generate_java_project() {
    echo -e "\n${GREEN}正在启动Java微服务项目生成器...${NC}\n"
    # 获取当前脚本所在目录
    SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
    
    # 检查是否能找到plop命令
    # 确保指定plopfile.js的完整路径
    PLOPFILE_PATH="$SCRIPT_DIR/plopfile.js"
    
    # 确保USER_WORKING_DIR存在并且是目录
    if [ ! -d "$USER_WORKING_DIR" ]; then
        echo -e "${RED}错误：目录 $USER_WORKING_DIR 不存在${NC}"
        exit 1
    fi
    
    if command -v plop &> /dev/null; then
        # 如果系统中有plop命令，直接使用并指定plopfile路径和目标目录
        cd "$USER_WORKING_DIR" 2>&1
        plop java-microservice --plopfile "$PLOPFILE_PATH"
    elif [ -f "$SCRIPT_DIR/node_modules/.bin/plop" ]; then
        # 如果项目本地有plop，使用项目本地的plop
        cd "$USER_WORKING_DIR" 2>&1
        "$SCRIPT_DIR/node_modules/.bin/plop" java-microservice --plopfile "$PLOPFILE_PATH"
    else
        # 尝试全局node_modules路径（适用于全局安装的情况）
        # 通常全局node_modules的位置
        NODE_MODULES_PATHS=("$(npm root -g)" "/usr/local/lib/node_modules" "/usr/lib/node_modules")
        found_plop=false
        
        for NODE_MODULES_PATH in "${NODE_MODULES_PATHS[@]}"; do
            if [ -f "$NODE_MODULES_PATH/plop-generator/node_modules/.bin/plop" ]; then
                cd "$USER_WORKING_DIR" 2>&1
                "$NODE_MODULES_PATH/plop-generator/node_modules/.bin/plop" java-microservice --plopfile "$NODE_MODULES_PATH/plop-generator/plopfile.js"
                found_plop=true
                break
            fi
        done
        
        # 如果都没找到，给出错误提示
        if [ "$found_plop" = false ]; then
            echo -e "\n${RED}错误: 找不到plop命令。请确保已正确安装plop-generator。${NC}\n"
            echo "您可以尝试以下命令安装:" 
            echo "  npm install -g plop-generator"
            return 1
        fi
    fi
}

# 生成Golang项目
function generate_golang_project() {
    echo -e "\n${YELLOW}Golang项目生成器正在开发中...${NC}\n"
    echo "功能即将上线，敬请期待！"
}

# 生成Python项目
function generate_python_project() {
    echo -e "\n${YELLOW}Python项目生成器正在开发中...${NC}\n"
    echo "功能即将上线，敬请期待！"
}

# 生成Frontend项目
function generate_frontend_project() {
    echo -e "\n${YELLOW}Frontend项目生成器正在开发中...${NC}\n"
    echo "功能即将上线，敬请期待！"
}

# 主函数
function main() {
    # 优先使用从环境变量传递的用户工作目录，如果不存在则使用pwd获取
    echo "generate-project.sh - 接收到的USER_WORKING_DIR: $USER_WORKING_DIR"
    if [ -z "$USER_WORKING_DIR" ]; then
        USER_WORKING_DIR="$(pwd)"
        echo "generate-project.sh - USER_WORKING_DIR为空，使用pwd: $USER_WORKING_DIR"
    fi
    
    show_welcome
    
    while true; do
        show_menu
        read choice
        
        case "$choice" in
            1) 
                generate_java_project
                break
                ;;
            2) 
                generate_golang_project
                break
                ;;
            3) 
                generate_python_project
                break
                ;;
            4) 
                generate_frontend_project
                break
                ;;
            q|Q) 
                echo -e "\n${RED}已退出项目生成器${NC}\n"
                exit 0
                ;;
            *) 
                echo -e "\n${RED}无效的选择，请重新输入${NC}\n"
                ;;
        esac
    done
    
    echo -e "\n${GREEN}项目生成过程已完成！${NC}\n"
}

# 执行主函数
main
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
    # 调用现有的Java微服务生成器
    npm run java
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
    
    echo "\n${GREEN}项目生成过程已完成！${NC}\n"
}

# 执行主函数
main
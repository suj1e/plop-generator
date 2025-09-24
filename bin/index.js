#!/usr/bin/env node

/**
 * 项目生成器入口脚本
 * 此脚本负责执行项目根目录下的generate-project.sh脚本
 * 提供交互式菜单让用户选择要生成的项目类型
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

// 获取项目根目录
const projectRoot = path.resolve(__dirname, '..');
const scriptPath = path.join(projectRoot, 'generate-project.sh');

// 检查终端是否支持颜色输出
function supportsColor() {
  // Windows 10+ 通常支持ANSI颜色
  if (os.platform() === 'win32') {
    return true;
  }
  
  // 检查是否在CI环境中
  const isCI = process.env.CI || process.env.CONTINUOUS_INTEGRATION || process.env.BUILD_NUMBER;
  if (isCI) {
    return false;
  }
  
  // 检查终端环境变量
  if (process.env.TERM && process.env.TERM !== 'dumb') {
    return true;
  }
  
  // 检查stdout是否是TTY
  return process.stdout.isTTY;
}

// 尝试设置脚本可执行权限
const trySetExecutablePermission = () => {
  try {
    // 尝试设置可执行权限
    fs.chmodSync(scriptPath, '755');
    console.log(`已成功为 ${scriptPath} 设置可执行权限`);
    return true;
  } catch (error) {
    // 如果设置权限失败，记录错误但继续尝试执行
    console.warn(`警告: 无法设置 ${scriptPath} 的可执行权限:`, error.message);
    return false;
  }
};

// 执行generate-project.sh脚本
const runShellScript = () => {
  // 检查是否支持颜色输出
  const colorSupport = supportsColor();
  
  // 准备环境变量，用于在shell脚本中控制颜色输出
  const env = {...process.env};
  if (!colorSupport) {
    env.DISABLE_COLORS = 'true';
  }
  
  // 显式传递用户的当前工作目录作为环境变量
  const userWorkingDir = process.cwd();
  
  // 确保USER_WORKING_DIR环境变量设置正确
  env.USER_WORKING_DIR = userWorkingDir;
  
  // 使用spawn执行shell脚本，并将标准输入、输出、错误流与父进程相连
  const shellScript = spawn('bash', [scriptPath], {
    stdio: 'inherit', // 继承父进程的stdio流，实现交互式输入输出
    cwd: userWorkingDir, // 在当前工作目录执行脚本
    env: env // 传递环境变量
  });

  // 处理脚本执行错误
  shellScript.on('error', (error) => {
    console.error('执行脚本时发生错误:', error);
    // 如果是权限错误，提供更详细的提示
    if (error.code === 'EACCES') {
      console.error('\n请手动设置脚本可执行权限:');
      console.error(`  chmod +x ${scriptPath}`);
      // 尝试给出全局安装路径的提示
      const globalInstallPath = path.resolve(process.execPath, '..', '..', 'lib', 'node_modules', 'plop-generator', 'generate-project.sh');
      console.error(`  或全局路径: chmod +x ${globalInstallPath}`);
    }
    process.exit(1);
  });

  // 处理脚本退出事件
  shellScript.on('close', (code) => {
    // 根据脚本的退出码决定父进程的退出码
    process.exit(code);
  });
};

// 主逻辑
if (fs.existsSync(scriptPath)) {
  // 首先检查是否有可执行权限
  try {
    fs.accessSync(scriptPath, fs.constants.X_OK);
    // 有可执行权限，直接执行
    runShellScript();
  } catch (error) {
    // 没有可执行权限，尝试设置权限后再执行
    console.warn(`检测到 ${scriptPath} 没有可执行权限，正在尝试设置...`);
    const permissionSet = trySetExecutablePermission();
    
    // 无论是否成功设置权限，都尝试执行脚本（使用bash显式调用可能会绕过部分权限问题）
    console.log('正在尝试执行脚本...');
    runShellScript();
  }
} else {
  console.error(`错误: 找不到 ${scriptPath} 文件`);
  process.exit(1);
}
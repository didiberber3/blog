@echo off
chcp 65001 >nul
echo ========================================
echo           一键推送到GitHub
echo ========================================
echo.

:: 检查是否在Git仓库中
git status >nul 2>&1
if errorlevel 1 (
    echo ❌ 错误：当前目录不是Git仓库！
    echo 请确保在正确的项目目录中运行此脚本。
    pause
    exit /b 1
)

:: 显示当前状态
echo 📊 当前Git状态：
git status --porcelain
echo.

:: 询问是否继续
set /p confirm="是否继续推送到GitHub？(y/n): "
if /i not "%confirm%"=="y" (
    echo 操作已取消。
    pause
    exit /b 0
)

echo.
echo 🚀 开始推送流程...
echo.

:: 1. 添加所有更改
echo 📝 步骤1: 添加所有更改...
git add -A
if errorlevel 1 (
    echo ❌ 添加文件失败！
    pause
    exit /b 1
)
echo ✅ 文件添加成功！

:: 2. 获取提交信息
echo.
echo 📝 步骤2: 输入提交信息...
set /p commit_msg="请输入提交信息 (直接回车使用默认信息): "
if "%commit_msg%"=="" (
    set commit_msg="自动提交 - %date% %time%"
)

:: 3. 提交更改
echo.
echo 📝 步骤3: 提交更改...
git commit -m "%commit_msg%"
if errorlevel 1 (
    echo ❌ 提交失败！
    pause
    exit /b 1
)
echo ✅ 提交成功！

:: 4. 推送到GitHub
echo.
echo 📝 步骤4: 推送到GitHub...
git push origin main
if errorlevel 1 (
    echo ❌ 推送失败！
    echo 可能的原因：
    echo - 网络连接问题
    echo - GitHub认证问题
    echo - 远程分支不存在
    pause
    exit /b 1
)

echo.
echo ========================================
echo            🎉 推送成功！
echo ========================================
echo.
echo 📊 推送统计：
git log --oneline -1
echo.
echo 🌐 你的博客已更新到GitHub！
echo.

pause

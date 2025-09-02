@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

:: 设置颜色代码
set "RED=[91m"
set "GREEN=[92m"
set "YELLOW=[93m"
set "BLUE=[94m"
set "MAGENTA=[95m"
set "CYAN=[96m"
set "WHITE=[97m"
set "RESET=[0m"

echo %CYAN%========================================%RESET%
echo %MAGENTA%         🚀 高级一键推送脚本%RESET%
echo %CYAN%========================================%RESET%
echo.

:: 检查Git是否安装
git --version >nul 2>&1
if errorlevel 1 (
    echo %RED%❌ 错误：Git未安装或不在PATH中！%RESET%
    echo 请先安装Git并确保在PATH中。
    pause
    exit /b 1
)

:: 检查是否在Git仓库中
git status >nul 2>&1
if errorlevel 1 (
    echo %RED%❌ 错误：当前目录不是Git仓库！%RESET%
    echo 请确保在正确的项目目录中运行此脚本。
    pause
    exit /b 1
)

:: 显示仓库信息
echo %BLUE%📁 当前仓库信息：%RESET%
git remote -v | findstr origin
echo.

:: 检查是否有未提交的更改
git status --porcelain | findstr . >nul
if errorlevel 1 (
    echo %YELLOW%⚠️  没有需要提交的更改！%RESET%
    echo 所有文件都已是最新状态。
    pause
    exit /b 0
)

:: 显示当前状态
echo %BLUE%📊 当前Git状态：%RESET%
git status --porcelain
echo.

:: 显示分支信息
echo %BLUE%🌿 当前分支：%RESET%
git branch --show-current
echo.

:: 询问是否继续
echo %YELLOW%是否继续推送到GitHub？%RESET%
set /p confirm="输入 'y' 继续，其他键取消: "
if /i not "!confirm!"=="y" (
    echo %YELLOW%操作已取消。%RESET%
    pause
    exit /b 0
)

echo.
echo %GREEN%🚀 开始推送流程...%RESET%
echo.

:: 1. 添加所有更改
echo %BLUE%📝 步骤1: 添加所有更改...%RESET%
git add -A
if errorlevel 1 (
    echo %RED%❌ 添加文件失败！%RESET%
    pause
    exit /b 1
)
echo %GREEN%✅ 文件添加成功！%RESET%

:: 2. 获取提交信息
echo.
echo %BLUE%📝 步骤2: 输入提交信息...%RESET%
echo %YELLOW%提示：直接回车将使用默认信息%RESET%
set /p commit_msg="请输入提交信息: "
if "!commit_msg!"=="" (
    set commit_msg="自动提交 - %date% %time%"
    echo %CYAN%使用默认提交信息: !commit_msg!%RESET%
)

:: 3. 提交更改
echo.
echo %BLUE%📝 步骤3: 提交更改...%RESET%
git commit -m "!commit_msg!"
if errorlevel 1 (
    echo %RED%❌ 提交失败！%RESET%
    pause
    exit /b 1
)
echo %GREEN%✅ 提交成功！%RESET%

:: 4. 推送到GitHub
echo.
echo %BLUE%📝 步骤4: 推送到GitHub...%RESET%
git push origin main
if errorlevel 1 (
    echo %RED%❌ 推送失败！%RESET%
    echo.
    echo %YELLOW%可能的原因：%RESET%
    echo - 网络连接问题
    echo - GitHub认证问题
    echo - 远程分支不存在
    echo - 需要先pull最新代码
    echo.
    echo %BLUE%尝试解决方案：%RESET%
    echo 1. 检查网络连接
    echo 2. 运行: git pull origin main
    echo 3. 重新运行此脚本
    pause
    exit /b 1
)

:: 5. 显示成功信息
echo.
echo %CYAN%========================================%RESET%
echo %GREEN%            🎉 推送成功！%RESET%
echo %CYAN%========================================%RESET%
echo.

:: 显示推送统计
echo %BLUE%📊 推送统计：%RESET%
git log --oneline -1
echo.

:: 显示远程状态
echo %BLUE%🌐 远程状态：%RESET%
git status -uno
echo.

echo %GREEN%🎯 你的博客已成功更新到GitHub！%RESET%
echo %CYAN%访问地址：https://didiberber3.github.io/blog/%RESET%
echo.

:: 询问是否打开GitHub
set /p open_github="是否打开GitHub仓库页面？(y/n): "
if /i "!open_github!"=="y" (
    start https://github.com/didiberber3/blog
)

pause

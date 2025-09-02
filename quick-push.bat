@echo off
chcp 65001 >nul

echo 🚀 快速推送到GitHub...
echo.

:: 快速添加所有文件
git add -A

:: 使用时间戳作为提交信息
set commit_msg="快速更新 - %date% %time%"
git commit -m %commit_msg%

:: 推送到GitHub
git push origin main

echo.
echo ✅ 推送完成！
echo 📅 提交时间: %date% %time%
echo.

pause

@echo off
echo 删除旧的构建文件...
if exist dist rmdir /s /q dist
echo 重新构建项目...
npm run build
echo 构建完成！
pause

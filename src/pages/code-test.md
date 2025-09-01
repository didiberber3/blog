---
title: 代码复制功能测试
date: 2024-01-15
author: Test Author
---

# 代码复制功能测试

这篇文章用于测试新的代码复制功能，包括语言显示和复制成功提示。

## JavaScript 示例

```javascript
function greet(name) {
  return `Hello, ${name}!`
}

console.log(greet('World'))
```

## Python 示例

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
```

## CSS 示例

```css
.button {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.button:hover {
  transform: translateY(-2px);
}
```

## HTML 示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>测试页面</title>
</head>
<body>
  <h1>欢迎使用</h1>
  <p>这是一个测试页面</p>
</body>
</html>
```

## TypeScript 示例

```typescript
interface User {
  id: number
  name: string
  email: string
}

class UserService {
  async getUser(id: number): Promise<User> {
    const response = await fetch(`/api/users/${id}`)
    return response.json()
  }
}
```

## JSON 示例

```json
{
  "name": "测试项目",
  "version": "1.0.0",
  "description": "这是一个测试项目",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.4.0",
    "vue-router": "^4.2.5"
  }
}
```

## 未指定语言的代码块

```
这是一个没有指定语言的代码块
复制时会显示 "Text"
```

## 总结

现在您可以测试以下功能：

1. **复制图标**：按钮默认显示复制图标 📋
2. **复制成功**：点击复制后显示 ✅ 图标
3. **弹窗提示**：复制成功时在鼠标位置显示对应的语言（如 JS、Python、CSS 等）
4. **自动恢复**：2秒后自动恢复到显示复制图标的状态

请尝试点击不同代码块的复制按钮来体验这些功能！

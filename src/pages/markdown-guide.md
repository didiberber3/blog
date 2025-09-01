---
title: Markdown 语法指南
date: 2024-01-14
author: GBlog Team
---

# Markdown 语法指南

本文介绍了在 GBlog 中支持的 Markdown 语法。

## 标题

```markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

## 文本格式

- **粗体文字** 使用 `**粗体**` 或 `__粗体__`
- *斜体文字* 使用 `*斜体*` 或 `_斜体_`
- ~~删除线~~ 使用 `~~删除线~~`
- `行内代码` 使用反引号包围

## 列表

### 无序列表

```markdown
- 项目一
- 项目二
  - 子项目
  - 另一个子项目
```

### 有序列表

```markdown
1. 第一项
2. 第二项
   1. 子项目
   2. 另一个子项目
```

## 链接和图片

### 链接

```markdown
[链接文字](https://example.com)
```

### 图片

```markdown
![alt 文字](image-url.jpg)
```

## 代码

### 行内代码

使用单个反引号：`console.log('Hello')`

### 代码块

使用三个反引号：

```javascript
function greet(name) {
  return `Hello, ${name}!`
}

console.log(greet('GBlog'))
```

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
```

## 引用

> 这是一个引用块。
> 
> 可以跨越多行。
> 
> > 这是嵌套引用。

## 表格

| 左对齐 | 居中对齐 | 右对齐 |
|:-------|:--------:|-------:|
| 内容1  | 内容2    | 内容3  |
| 较长的内容 | 内容 | 内容 |

## 分割线

使用三个或更多的连字符：

---

## 数学公式（未来支持）

行内公式：$E = mc^2$

块级公式：

$$
\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n
$$

## 任务列表

- [x] 已完成的任务
- [ ] 未完成的任务
- [ ] 另一个未完成的任务

## 脚注

这是一个脚注的例子[^1]。

[^1]: 这是脚注的内容。

---

以上就是 GBlog 支持的主要 Markdown 语法。开始创作您的精彩内容吧！

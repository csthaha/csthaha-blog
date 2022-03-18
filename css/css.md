# CSS

## css引入方式 以及 link、@import 的区别
#### 内联样式
> 内联样式也称行内样式，指的是直接在 HTML 标签中的 style 属性中添加 css。
```css
<div style="color: red">红色</div>
```
#### 嵌入样式
> 嵌入样式指的是在 HTML style标签中书写样式。
```css
<style>
    .container {
        color: red;
    }
</style>
```
#### 链接样式
> 链接方式指的是使用 HTML 头部的 标签引入外部的 CSS 文件
```css
<head>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
```
CSS 文件会在第一次加载时引入，以后切换页面时只需加载 HTML 文件即可。
#### 导入样式
> 导入方式指的是使用 CSS 规则引入外部 CSS 文件。
```css
<style>
    @import url(style.css);
</style>
/* 或者写在 css 的样式文件中 */
@import url(style.css);
*{ margin:0; padding:0;}
```

## **link 和 @import 的区别：**
- link 属于 html 标签，不仅可以加载 css，还可以定义 Rss 等其他事务; @import 属于 css 范畴，只能加载 css
> Rss: Real Simple Syndication 最能体现 RSS 的本意，是一种描述和同步网站内容的格式，是目前使用最广泛的XML应用。RSS搭建了信息迅速传播的一个技术平台，使得每个人都成为潜在信息的提供者。
- link 就是 html 标签，所以在加载页面时，同时会加载 link 引用的 css;    @import需要页面网页完全载入以后加载。所以会出现一开始没有 css 样式，闪烁一下出现样式后的页面（网慢）。
- link 是 xhtml 标签，无兼容问题；@import 是css2.1提出的，低版本的浏览器不支持。
- link 支持使用 Javascript 控制 DOM 去改变样式 而 @import 不支持。
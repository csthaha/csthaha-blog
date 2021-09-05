# html

## 移动端 1px 
> DPR(devicePixelRatio) 设备像素比： 设备物理像素 / css像素

> 一般前主流的屏幕DPR=2 （iPhone 8）,或者3 （iPhone 8 Plus）。拿2倍屏来说，设备的物理像素要实现1像素，而DPR=2，所以css 像素只能是 0.5。 一般设计稿是按照750来设计的，它上面的1px是以750来参照的，而我们写css样式是以设备375为参照的，所以我们应该写的0.5px就好了

`<div class="px border-1px"></div>`
### 1. 伪元素 transform: scale(0.5) 实现
```css
    .px {
        width: 100px;
        height: 100px;
        background-color: antiquewhite;
        position: relative;
    }
    .border-1px::after {
        content: '';
        position: absolute;
        /* box-sizing: border-box; */
        /* top: 0; */
        /* left: 0; */
        width: 200%;
        height: 200%;
        border: 1px solid #000;
        border-radius: 4px;
        /* -webkit-transform: scale(0.5); */
        transform: scale(0.5);
        -webkit-transform-origin: top left;
    }
```

### 2. border-image 图片实现
```css
.border-image-1px {
    border-width: 1px 0px;
    border-image: url("");
}
```

### 3. viewport+rem实现
```css
    <meta name="viewport" id="WebViewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1,user-scalable=no">
```
```javascript
    var viewport = document.querySelector("meta[name=viewport]");  
    // 下面是根据设备像素设置viewport  
    if (window.devicePixelRatio == 1) {  
        viewport.setAttribute('content', 'width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no');  
    }  
    if (window.devicePixelRatio == 2) {  
        viewport.setAttribute('content', 'width=device-width,initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no');  
    }  
    if (window.devicePixelRatio == 3) {  
        viewport.setAttribute('content', 'width=device-width,initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no');  
    }  
    var docEl = document.documentElement;  
    var fontsize = 10 * (docEl.clientWidth / 320) + 'px';  
    docEl.style.fontSize = fontsize;
```

### 4. backgroud-image实现
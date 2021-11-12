const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const request = require('request')
const async = require('async')

// 虎牙
const hy = {
    url: 'https://www.huya.com/g/xingxiu',
    className: ".game-live-item .video-info",   // img 父元素
    attr: 'data-original'
}

// 斗鱼
const dy = {
    url: 'https://www.douyu.com/g_yz',
    className: ".DyListCover-imgWrap .DyListCover-pic",
    attr: 'src'
}

async function getData(contentName) {
    let obj = contentName === 'hy' ? hy : contentName === 'dy' ? dy : ''
    if(!obj) return
    let {url, className, attr} = obj
    const res = await axios.get(url)
    const { status, data } = res
    let text = unescape(data.replace(/\\u/g, '%u')) //将unicode码转换成中文

    let $ = cheerio.load(text, {
        decodeEntities: false,
    });
    let imgList = []
    $(className).each(function (index) {
        var src = $(this).find("img").attr(attr)
        let name =  $(this).find("img").attr("title") ? $(this).find("img").attr("title").replace('的直播', '') : index
        index === 2 && console.log(src, '图片地址', name);
        if(index > 10) return   //我只下载十张
        imgList.push({
            src,
            name
        })  
    });
    
    mkDir(contentName)
    // 法医
    imgList.forEach((item, idx) => {
        downloadPic(contentName, item)
    })
    // downloadPic(contentName, imgList[0])

    // 法二
    // async.mapSeries(imgList, function(item, callback) {
    //     setTimeout(function() {
    //         downloadPic(contentName, item, function(err, data){});  
    //         callback(null, item);
    //     }, 100);
    // }, function(err, results) {});

}

function downloadPic(foldName, item, callback) {
    let {src, name} = item
    // return new Promise((resolve) => {
    //     request({
    //         url: src,
    //         encoding: 'binary'
    //     }, function(err, res, body) {
    //         resolve(body);
    //     })
    // }).then(function(body){
    //     fs.writeFileSync(name, body, 'binary', function() {
    //         console.log('保存图片成功'+name)
    //     });
    // })

    // 法医
    if(!src.includes('http')) return
    request(src).pipe(fs.createWriteStream(`${foldName}/${name}`))

    // 法儿
    // request.head(src, function() {
    //     if(!src.includes('http')) return
    //     request(src).pipe(fs.createWriteStream(`${foldName}/${name}`)).on('close', function() {
    //         callback(null);
    //     });
	// });
}

function mkDir(name) {

    fs.mkdir(name,function(error){
        if(error){
            console.log(error);
            return false;
        }
        console.log('创建目录成功');
    })
}

// 斗鱼
getData('dy')
// 虎牙
getData('hy')
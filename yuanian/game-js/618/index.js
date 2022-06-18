const scoreDom = Array.from(document.getElementsByClassName('game-score'))[0]
const gameDom = Array.from(document.getElementsByClassName('game-content'))[0]
const imgDom = document.getElementsByTagName('img')
let score = 0;
scoreDom.innerHTML = `恭喜您，您本局获取的分时是：${score}`
let chooseList = []
const backSrc = '1007/b0/db9039e58ddc22e9dc345031827997_4079_1652960734.jpg'
const winSrc = '1084/fa/f06d0d417ec8a829a8aee2d72278e5_2168_1650599049.jpg'
const imgUrlList1 = [
    '1025/fd/b5e25116a4eecab6d6e74df55c09ce_2168_1650026705.jpg',
    '1004/e9/7a4a08a30a598ab7985688dec424a4_2168_1652722024.jpg',
    '1029/f7/287e1f71029813345be23f18d514d7_2168_1648800305.jpg',
    '1031/18/98bc78bce4c2f8ad8c5480dd266552_2168_1650074165.jpg',
    '1020/b3/492c4f6333c822400c4270b73ced98_2168_1636533664.jpg',
    '1015/80/3baa3debe35ab20c0048bd2d762580_2168_1652668445.jpg'
]
const imgUrlList2 = [
    '1084/fa/f06d0d417ec8a829a8aee2d72278e5_2168_1650599049.jpg',
    '1062/c8/725ee72629b8e2abcfa03e4959f99c_2168_1654077364.jpg',
    '1016/b8/29830fb047f884cfb8e9953b0e3f0f_2168_1654510684.jpg',
    '1035/3f/1e4f300cf2da3b4f03b6f751607779_2168_1650851947.jpg',
    '1054/70/eafee3ac95131f65511ef8f94c6150_2168_1627553585.jpg',
    '1050/47/1ead6498212e2941f106f27ec71063_2168_1626181508.jpg',
]

// 生成随机数组
let allImags = [...imgUrlList1, ...imgUrlList1].sort(() => 0.5 - Math.random())
if(Math.random - 0.5 > 0) {
    console.log(1);
    allImags = [...imgUrlList2, ...imgUrlList2].sort(() => 0.5 - Math.random())
}

const srcBase = 'https://anchorpost.msstatic.com/cdnimage/anchorpost/'

function createImgTag(src, index) {
    const imgTag = document.createElement('img');
    const attrMap = {
        'src': `${srcBase}${backSrc}`,
        'id': index,
        'class': 'game-image'
    }
    Object.keys(attrMap).forEach(key => {
        imgTag.setAttribute(key, attrMap[key]);
    })
    imgTag.addEventListener('click', openFun)
    gameDom.appendChild(imgTag);
}

function openFun(e) {
    const index = e.target.id
    const realSrc = allImags[index]
    // console.log(imgDom.src); 
    if(imgDom[index].src !== `${srcBase}${backSrc}`) {
        alert('该美女已被您找出，请找其他的吧')
        return
    }
    chooseList.push(index)
    imgDom[index].setAttribute('src', `${srcBase}${realSrc}`)
    // 判断是否相等
    setTimeout(jugeGirl, 500)
}

function jugeGirl() {
    if(chooseList.length === 2) {
        if(imgDom[chooseList[0]].src === imgDom[chooseList[1]].src) {
            alert('恭喜你找到一组美女！')
            imgDom[chooseList[0]].setAttribute('src', `${srcBase}${winSrc}`)
            imgDom[chooseList[1]].setAttribute('src', `${srcBase}${winSrc}`)
            chooseList = []
            score++;
            scoreDom.innerHTML = `恭喜您，您本局获取的分时是：${score}`
        } else {
            alert('没有匹配哦！')
            imgDom[chooseList[1]].setAttribute('src', `${srcBase}${backSrc}`)
            chooseList.splice(1, 1)
        }
    }
}

allImags.forEach((item, index) => {
    createImgTag(item, index)
})
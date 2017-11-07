/**
 * Created by dandan on 17-9-5.
 */

//获取随机数
export function getRandomInt(min,max){
    return Math.floor(Math.random() * (max - min + 1 ) + min)
}

//把数组的数据打乱
export function shuffle(arr){
    let _arr = arr.slice()
    for(let i=0;i<_arr.length;i++){
        let j = getRandomInt(0,i)
        let t = _arr[i]
        _arr[i] = _arr[j]
        _arr[j] = t
    }
    return _arr
}

//input 请求的节流
export function debounce(func,delay) {
    let timer

    return function(...args){
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this,args)
        },delay)
    }
}

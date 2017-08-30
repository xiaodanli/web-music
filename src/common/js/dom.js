//添加className
export function addClass(el, className) {
    if (hasClass(el, className)) {
        return
    }

    let newClass = el.className.split(" ")
    newClass.push(className)
    el.className = newClass.join(" ")
}
//元素是否含有className
export function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}

//设置和获取元素的属性
export function getData(ele, name, val) {
    const prefix = 'data-'
    name = prefix + name
    if (val) {
        return ele.setAttribute(name, val)
    } else {
        return ele.getAttribute(name)
    }
}

let elementStyle = document.createElement('div').style

var vendor = (() => {
    let transformNames = {
        Moz:'MozTransform',
        webkit:'webkitTransform',
        O:'OTransform',
        ms:'msTransform',
        standard:'transform'
    }

    for(let key in transformNames){
        if(elementStyle[transformNames[key]] !== undefined){
            return key
        }
    }
    return false
})()

export function prefixStyle(style){
    if(vendor == false){
        return false
    }

    if(vendor == 'standard'){
        return style
    }

    return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

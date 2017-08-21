//推荐列表请求公共参数
export const commonParams = {
    g_tk:5381,
    inCharset:'utf-8',
    outCharset:'utf-8',
    notice:0,
    format:'jsonp'
}
//jsonp的回调函数
export const options = {
    param:'jsonpCallback'
}
//错误的code
export const ERR_OK = 0
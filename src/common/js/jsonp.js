/**
 * Created by dandan on 17-8-2.
 */
import originJSONP from "jsonp";

/**
 * @param url    基本url
 * @param data   需要拼在url后面的query对象
 * @param option 回调函数的key
 */
export default function jsonp(url, data, option) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
    return new Promise((resolve, reject) => {
        originJSONP(url, option, (err, data) => {
            if (!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
}
/**
 * @param data 需要拼接在URL后面的query参数
 */
function param(data) {
    let url = ''
    for (var k in data) {
        let value = data[k] !== undefined ? data[k] : ''
        url += `&${k}=${encodeURIComponent(value)}`
    }
    return url ? url.substring(1) : ''
}
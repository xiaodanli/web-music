import jsonp from "common/js/jsonp";
import {commonParams, options} from "./config";

export function getTopList() {
    let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
    let data = Object.assign({}, commonParams, {
        platform: 'h5',
        uni: 0,
        needNewCode: 1
    })
    return jsonp(url, data, options)
}

export function getMusicList(topid) {
    let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
    let data = Object.assign({}, commonParams, {
        platform: 'h5',
        needNewCode: 1,
        tpl: 3,
        page: 'detail',
        type: 'top',
        topid
    })
    return jsonp(url, data, options)
}
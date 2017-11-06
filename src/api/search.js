import jsonp from "common/js/jsonp";
import {commonParams, options} from "./config";

export function getHotKey() {
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
    const data = Object.assign({}, commonParams, {
        platform: 'yqq',
        needNewCode: 0,
        loginUin: 0,
        hostUin: 0
    })
    return jsonp(url, data, options)
}

//page 搜索的关键词 是否检索歌手字段
export function search(query, page, zhida, perpage) {
    const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
    const data = Object.assign({}, commonParams, {
        w: query,
        catZhida: zhida,
        p: page,
        perpage,
        n: perpage,
        uin: 0,
        platform: 'h5',
        needNewCode: 1,
        zhidaqu: 1,
        t: 0,
        flag: 1,
        ie: 'utf-8',
        sem: 1,
        aggr: 0,
        remoteplace: 'txt.mqq.all'
    })
    return jsonp(url, data, options)
}
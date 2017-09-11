/**
 * Created by dandan on 17-9-8.
 */
import {commonParams} from "./config";
import axios from "axios";

export function getLyric(mid) {
    let url = '/api/getLyric'
    let data = Object.assign({}, commonParams, {
        pcachetime: +new Date(),
        songmid: mid,
        loginUin: 0,
        hostUin: 0,
        format: 'json',
        platform: 'yqq',
        needNewCode: 0
    })
    return axios.get(url, {params: data}).then((res) => {
        return Promise.resolve(res.data)
    })
}

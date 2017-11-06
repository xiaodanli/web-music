import jsonp from 'common/js/jsonp'
import {commonParams,options} from './config'
import axios from 'axios'

export function getRecommend(){
    let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
    let data = Object.assign({},commonParams,{
        platform:'h5',
        uni:0,
        needNewCode:1
    })
    return jsonp(url,data,options)
}

export function getDiscList(){
    let url = '/api/getDiscList'
    let data = Object.assign({},commonParams,{
        rnd: Math.random(),
        loginUin: 0,
        hostUin: 0,
        platform: 'yqq',
        needNewCode: 0,
        categoryId: 10000000,
        sortId: 5,
        sin: 0,
        ein: 29,
        format:'json'
    })
    return axios.get(url,{params:data}).then((res)=>{
        return Promise.resolve(res.data)
    })
}

export function getSongList(disstid){
    let url = '/api//getCdInfo'
    let data = Object.assign({},commonParams,{
        disstid,
        type:1,
        json:1,
        utf8:1,
        onlysong:0,
        loginUin:0,
        hostUin:0,
        platform:'yqq',
        needNewCode:0
    })
    return axios.get(url,{params:data}).then((res) => {
        return Promise.resolve(res.data)
    })
}
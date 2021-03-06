import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

export function getRecommend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';

    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    })

    return jsonp(url, data, options);
}

export function getDiscList(){
    const url = '/api/getDiscList'
    // https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg?picmid=1&rnd=0.5157713178143508&g_tk=1878043153&jsonpCallback=getPlaylist&loginUin=466368084&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&categoryId=10000000&sortId=5&sin=0&ein=29
    const data = Object.assign({}, commonParams, {
        picmid: 1,
        rnd: Math.random(),
        platform: 'yqq',
        hostUin: 0,
        needNewCode: 0,
        categoryId: 10000000,
        sortId: 5,
        sin: 0,
        ein: 29,
        format: 'json'
    })

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

export function getDisc(disstid) {
    const url = '/api/getDisc'

    const data = Object.assign({}, commonParams, {
        type:1,
        json:1,
        utf8:1,
        onlysong:0,
        disstid:disstid,
        hostUin:0,
        notice:0,
        format:'json',
        platform:'yqq',
        needNewCode:0
    })

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}
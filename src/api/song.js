import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

export function getLyric(mid) {
    const url = '/api/getLyric'

    const data = Object.assign({}, commonParams, {
        songmid: mid,
        pcachetime: +new Date(),
        rnd: Math.random(),
        platform: 'yqq',
        hostUin: 0,
        needNewCode: 0,
        format: 'json'
    })

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}
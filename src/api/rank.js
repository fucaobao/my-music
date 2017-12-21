import jsonp from 'common/js/jsonp'
import { commonParams,options } from './config'

export function getTopList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
//   const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'

  const data = Object.assign({}, commonParams, {
    format: 'jsonp',
    platform: 'h5',
    hostUin: 0,
    needNewCode: 0,
  })

   return jsonp(url, data, options)
}

export function getMusicList(topid) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

    const data = Object.assign({}, commonParams, {
        format:'json',
        notice:0,
        platform:'h5',
        needNewCode:1,
        tpl:3,
        page:'detail',
        type:'top',
        topid:topid
    })

    return jsonp(url, data, options)
}

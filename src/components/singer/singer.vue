<template>
  <div class="singer" ref="singer">
      <list-view @select="selectSinger" :data="singers" ref="list"></list-view>
      <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Singer from 'common/js/singer'
  import {playlistMixin} from 'common/js/mixin'
  import ListView from 'base/listview/listview'
  import {getSingerList} from 'api/singer';
  import {ERR_OK} from 'api/config'
  import {mapMutations} from 'vuex'

  const HOT_NAME = '热门'
  const HOT_SINGER_LEN = 10

  export default {
    mixins: [playlistMixin],
    data() {
      return {
        singers: []
      }
    },
    created () {
      this._getSingerList()
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length ? '60px' : ''
        this.$refs.singer.style.bottom = bottom
        this.$refs.list.refresh()
      },
      selectSinger(singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        this.setSinger(singer)
      },
      _getSingerList() {
        getSingerList().then((res) => {
          if(res.code === ERR_OK) {
            // console.log(res.data.list)
            this.singers = this._normalizeSingerList(res.data.list);
          }
        })
      },
      _normalizeSingerList(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if(index < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }
          const key = item.Findex
          if(!map[key]){
            map[key] = {
              title: item.Findex,
              items: []
            }
          }
          map[key].items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
          }))
        })
        // 为了得到有序列表，需要处理map
        let hot = []
        let retNum = []
        let ret = []
        for(let key in map){
          let val = map[key]
          if(val.title.match(/^[a-zA-Z]$/)){
            ret.push(val)
          } else if(val.title.match(/^\d$/)){
            retNum.push(val)
          } else {
            hot.push(val)
          }
        }
        retNum.sort((a,b) => {
          return a.title - b.title
        })
        ret.sort((a,b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(retNum).concat(ret)
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components: {
      ListView
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%

</style>

<template>
    <transition name="slide">
        <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
    </transition>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex'
    import {getSingerDetail} from 'api/singer';
    import {ERR_OK} from 'api/config'
    import {createSong} from 'common/js/song'
    import MusicList from 'components/music-list/music-list'

    export default {
        data () {
            return {
                songs: []
            }
        },
        computed: {
            title() {
                return this.singer.name
            },
            bgImage() {
                console.log(this.singer)
                return this.singer.avatar
            },
            ...mapGetters([
                'singer'
            ])
        },
        created() {
            this._getSingerDetail()
            console.log(this.singer)
        },
        methods: {
            _getSingerDetail() {
                // 如果没有id的话，则跳转到上一页
                if(!this.singer.id){
                    this.$router.push('/singer')
                    return
                }
                getSingerDetail(this.singer.id).then((res) => {
                    if(res.code === ERR_OK) {
                        this.songs = this._normalizeSongs(res.data.list)
                        // console.log(this.songs)
                    }
                })
            },
            _normalizeSongs(list) {
                let ret = []
                list.forEach((item) => {
                    let {musicData} = item
                    if(musicData.songid && musicData.albummid){
                        ret.push(createSong(musicData))
                    }
                })
                return ret
            }
        },
        components: {
            MusicList
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  // vue-html-loader and css-loader translates non-root URLs to relative paths. In order to treat it like a module path, prefix it with ~
  //~就是告诉加载器它是一个模块，而不是相对路径
  @import "~common/stylus/variable"
    // https://cn.vuejs.org/v2/guide/transitions.html#
    // 在进入/离开的过渡中，会有 6 个 class 切换。
    // v-enter：定义进入过渡的开始状态。在元素被插入时生效，在下一个帧移除。
    // v-enter-active：定义过渡的状态。在元素整个过渡过程中作用，在元素被插入时生效，在 transition/animation 完成之后移除。这个类可以被用来定义过渡的过程时间，延迟和曲线函数。
    // v-enter-to: 2.1.8版及以上 定义进入过渡的结束状态。在元素被插入一帧后生效 (于此同时 v-enter 被删除)，在 transition/animation 完成之后移除。
    // v-leave: 定义离开过渡的开始状态。在离开过渡被触发时生效，在下一个帧移除。
    // v-leave-active：定义过渡的状态。在元素整个过渡过程中作用，在离开过渡被触发后立即生效，在 transition/animation 完成之后移除。这个类可以被用来定义过渡的过程时间，延迟和曲线函数。
    // v-leave-to: 2.1.8版及以上 定义离开过渡的结束状态。在离开过渡被触发一帧后生效 (于此同时 v-leave 被删除)，在 transition/animation 完成之后移除。
  .slide-enter-active,.slide-leave-active
    transition: all 0.3s
  .slide-enter,.slide-leave-to
    transform: translate3d(100%,0,0)
</style>

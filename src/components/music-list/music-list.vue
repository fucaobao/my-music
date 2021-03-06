<template>
    <div class="music-list">
        <div class="back" @click="back">
            <i class="icon-back"></i>
        </div>
        <h1 class="title" v-html="title"></h1>
        <div class="bg-image" :style="bgStyle" ref="bgImage">
            <div class="play-wrapper" v-show="songs.length" ref="playBtn" @click="random">
                <div class="play">
                    <i class="icon-play"></i>
                    <span class="text">随机播放全部</span>
                </div>
            </div>
            <div class="filter" ref="filter"></div>
        </div>
        <div class="bg-layer" ref="layer"></div>
        <scroll :probeType="probeType" :listen-scroll="listenScroll" @scroll="scroll" :data="songs" class="list" ref="list">
            <div class="song-list-wrapper">
                <song-list :songs="songs" @select="selectItem" :rank="rank"></song-list>
            </div>
            <div v-show="!songs.length" class="loading-container">
                <loading></loading>
            </div>
        </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
    import {prefixStyle} from 'common/js/dom'
    import {playlistMixin} from 'common/js/mixin'
    import Scroll from 'base/scroll/scroll'
    import Loading from 'base/loading/loading'
    import SongList from 'base/song-list/song-list'
    import {mapActions} from 'vuex'

    const RESERVED_HEIGHT = 40
    const transform = prefixStyle('transform')
    const filter = prefixStyle('filter')
    const backdrop = prefixStyle('backdrop-filter')

    export default {
        mixins: [playlistMixin],
        data () {
            return {
                scrollY: 0
            }
        },
        props: {
            bgImage: {
                type: String,
                default: ''
            },
            songs: {
                type: Array,
                default: []
            },
            title: {
                type: String,
                default: ''
            },
            rank: {
                type: Boolean,
                default: false
            }
        },
        created () {
            this.probeType = 3
            this.listenScroll = true
        },
        mounted () {//mounted在整个生命周期只执行一次
            console.log(this.$router)
            this.imageHeight = this.$refs.bgImage.clientHeight
            // console.log(this.imageHeight)
            this.minTranslateY = - this.imageHeight + RESERVED_HEIGHT
            this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`;
        },
        computed: {
            bgStyle() {
                return `background-image:url(${this.bgImage})`
            }
        },
        methods: {
            handlePlaylist(playlist) {
                const bottom = playlist.length ? '60px' : ''
                this.$refs.list.$el.style.bottom = bottom
                this.$refs.list.refresh()
            },
            scroll(pos) {
                this.scrollY = pos.y;
            },
            back() {
                this.$router.back()
            },
            selectItem(item, index) {
                this.selectPlay({
                    list: this.songs,
                    index
                })
            },
            random() {
                this.randomPlay({
                    list: this.songs
                })
            },
            ...mapActions([
                'selectPlay',
                'randomPlay'
            ])
        },
        watch: {
            handlePlaylist(playlist) {
                const bottom = playlist.length ? '60px' : ''
                this.$refs.list.$el.style.bottom = bottom
                this.$refs.list.refresh()
            },
            scrollY(newY) {
                let translateY = Math.max(this.minTranslateY, newY)
                let zIndex = 0
                let scale = 1
                this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
                const percent = Math.abs(newY / this.imageHeight)
                if(newY > 0) {//下拉的时候newY才会大于0
                    scale = 1 + percent
                    zIndex = 10
                } else {
                    blur = Math.min(20 * percent, 20)
                }
                // 用于IOS下图片的高斯模糊
                this.$refs.filter.style[filter] = `blur(${blur}px)`
                this.$refs.filter.style[backdrop] = `blur(${blur}px)`
                // 滑倒顶部的时候
                if(newY < this.minTranslateY){
                    zIndex = 10
                    this.$refs.bgImage.style.paddingTop = 0
                    this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
                    this.$refs.playBtn.style.display = 'none'
                } else {
                    this.$refs.bgImage.style.paddingTop = '70%'
                    this.$refs.bgImage.style.height = 0
                    this.$refs.playBtn.style.display = ''
                }
                this.$refs.bgImage.style.zIndex = zIndex
                this.$refs.bgImage.style[transform] = `scale(${scale})`
            }
        },
        components: {
            Scroll,
            SongList,
            Loading
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    // transform-origin: top以顶部为基准变换
    // x-axis
    // 定义视图被置于 X 轴的何处。可能的值：
    // left
    // center
    // right
    // length
    // %
    // y-axis
    // 定义视图被置于 Y 轴的何处。可能的值：
    // top
    // center
    // bottom
    // length
    // %
    // z-axis
    // 定义视图被置于 Z 轴的何处。可能的值：
    // length
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>

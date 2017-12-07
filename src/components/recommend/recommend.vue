<template>
  <div class="recommend">
    <!-- mounted的时候，初始化的dom，这个时候数据(异步的)可能还没有获取到，就会导致scroll无法滚动，这个时候就需要当获取到数据的时候，重新计算一次 -->
    <scroll class="recommend-content" :data="discList" ref="scroll">
        <div>
          <div v-if="recommends.length" class="slider-wrapper">
            <slider>
              <div v-for="item in recommends">
                <a :href="item.linkUrl">
                  <!-- loadImage解决discList比recommends后获取到的时候，滚动不能到底的BUG -->
                  <!-- 据说这个可以解决不能点击的BUG，但是我并没有出现不能点击的问题，暂时隐藏class="needsclick"  -->
                  <img @load="loadImage" :src="item.picUrl" />
                </a>
              </div>
            </slider>
          </div>
          <div class="recommend-list">
            <h1 class="list-title">热门歌单推荐</h1>
            <ul>
              <li v-for="item in discList" class="item">
                <div class="icon">
                  <img v-lazy="item.imgurl" width="60" height="60"/>
                </div>
                <div class="text">
                  <h2 class="name" v-html="item.creator.name"></h2>
                  <p class="desc" v-html="item.dissname"></p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="loading-container" v-show="!discList.length">
          <loading></loading>
        </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
    import Loading from 'base/loading/loading'
    import Scroll from 'base/scroll/scroll'
    import Slider from 'base/slider/slider'
    import {getRecommend,getDiscList} from 'api/recommend'
    import {ERR_OK} from 'api/config'

    export default {
      data() {
        return {
          recommends: [],
          discList: []
        }
      },
      created() {
        this._getRecommend()
        this._getDiscList()
      },
      methods: {
        _getRecommend() {
          getRecommend().then((res) => {
            if(res.code === ERR_OK) {
              // console.log(res.data.slider)
              this.recommends = res.data.slider;
            }
          })
        },
        _getDiscList() {
          getDiscList().then((res) => {
            if(res.code === ERR_OK) {
              // console.log(res.data.list)
              this.discList = res.data.list;
            }
          })
        },
        loadImage() {
          if(!this.checkLoaded){
            this.$refs.scroll.refresh()
            this.checkLoaded = true
          }
        }
      },
      components: {
        Slider,
        Scroll,
        Loading
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            display: flex
            height: 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
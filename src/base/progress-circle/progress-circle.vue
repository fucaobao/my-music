<template>
  <div class="progress-circle">
    <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
      <!-- stroke-dasharray:描边的距离 -->
      <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="strokeDashArray" :stroke-dashoffset="strokeDashOffset"/>
    </svg>
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
      props: {
          radius: {
              type: Number,
              default: 100
          },
          percent: {
              type: Number,
              default: 0
          }
      },
      data() {
          return {
              strokeDashArray: Math.PI * 100
          }
      },
      computed: {
          //   为0的时候，表示播放完成，为100%的时候，表示未开始播放
          strokeDashOffset() {
              return (1 - this.percent) * Math.PI * 100
          }
      }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  // 圆默认以最右边那个点开始dashoffset，逆时针转90°，即可以最上面那个点开始转  
  @import "~common/stylus/variable"

  .progress-circle
    position: relative
    circle
      stroke-width: 8px
      transform-origin: center
      &.progress-background
        transform: scale(0.9)
        stroke: $color-theme-d
      &.progress-bar
        transform: scale(0.9) rotate(-90deg)
        stroke: $color-theme
</style>
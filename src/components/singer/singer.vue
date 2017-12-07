<template>
  <div class="single">
  </div>
</template>

<script type="text/ecmascript-6">
  import { getSingerList } from 'api/singer';
  import {ERR_OK} from 'api/config'
  export default {
    data() {
      return {
        singers: []
      }
    },
    created () {
      this._getSingerList()
    },
    methods: {
      _getSingerList() {
        getSingerList().then((res) => {
          if(res.code === ERR_OK) {
            console.log(res)
          }
        })
      }
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .single
    position: fixed
    top: 88px
    botton: 0
    width: 100%
</style>

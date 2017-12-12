<template>
   <div ref="wrapper">
       <slot></slot>
   </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll'

    export default {
        props: {
            // probeType: 1：滚动的时候会派发scroll事件，会截流。2：滚动的时候实时派发scroll事件，不会截流。 3：除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
            // 截流就是在滚动的过程中，不要实时派发，这样会让派发的 scorll 事件变少。如果不截流的话，在整个滚动过程中会实时派发 scroll 事件。
            probeType:{
                type: Number,
                default: 1
            },
            click: {
                type: Boolean,
                default: true //表示列表可以被点击
            },
            data: {
                type: Array,
                default: null
            },
            listenScroll :{
                type: Boolean,
                default: false
            }
        },
        data () {
            return {

            }
        },
        mounted () {
            setTimeout(() => {
                this._initScroll()
            }, 20);
        },
        methods: {
            _initScroll() {
                if(!this.$refs.wrapper){
                    return
                }
                this.scroll = new BScroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click
                })
                if(this.listenScroll){
                    let me = this
                    me.scroll.on('scroll', (pos) => {
                        me.$emit('scroll', pos)
                    })
                }
            },
            enable() {
                this.scroll && this.scroll.enable()
            },
            disable() {
                this.scroll && this.scroll.disable()
            },
            refresh() {
                this.scroll && this.scroll.refresh()
            },
            scrollTo() {
                this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
            },
            scrollToElement() {
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
            }
        },
        watch: {
            data () {
                setTimeout(() => {
                    this.refresh()
                }, 20);
            }
        },
        components: {
            BScroll
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">


</style>

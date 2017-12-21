import {mapGetters} from 'vuex'

export const playlistMixin = {
    computed: {
        ...mapGetters([
            'playlist'
        ])
    },
    // dom-ready的时候
    mounted () {
        this.handlePlaylist(this.playlist)
    },
    // keep-alive切换的时候
    activated () {
        this.handlePlaylist(this.playlist)
    },
    watch: {
        playlist(newVal) {
            this.handlePlaylist(newVal)
        }
    },
    methods: {
        handlePlaylist() {
            // 如果组件没有实现handlePlaylist方法，则抛出异常
            throw new Error('component must implement handlePlaylist method')
        }
    }
}
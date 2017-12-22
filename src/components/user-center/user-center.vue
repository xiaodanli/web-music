<template>
    <transition name="slider">
        <div class="user-center">
            <div class="back" @click="back">
                <i class="icon-back"></i>
            </div>
            <div class="switches-wrapper">
                <switches @switch="switchItem" :switches="switches" :currentIndex="currentIndex"></switches>
            </div>
            <div class="play-btn" @click="randomFun">
                <i class="icon-play"></i>
                <span class="text">随机播放全部</span>
            </div>
            <div class="list-wrapper" ref="listWrapper" v-if="currentIndex === 0">
                <scroll ref="favouriteList" class="list-scroll" :data="favouriteList">
                    <div class="list-inner">
                        <song-list :songs="favouriteList" @select="selectSong"></song-list>
                    </div>
                </scroll>
            </div>
            <div class="list-wrapper" v-if="currentIndex === 1">
                <scroll ref="songList" class="list-scroll" :data="playList">
                    <div class="list-inner">
                        <song-list :songs="playList" @select="selectSong"></song-list>
                    </div>
                </scroll>
            </div>
            <div class="no-result-wrapper" v-show="noResult">
                <no-result :title="noResultDesc"></no-result>
            </div>
        </div>
    </transition>
</template>
<script>
    import Switches from 'base/switches/switches'
    import Scroll from 'base/scroll/scroll'
    import SongList from 'base/song-list/song-list'
    import NoResult from 'base/no-result/no-result'

    import {mapGetters, mapActions} from 'vuex'
    import {playerMixin,playlistMixin} from 'common/js/mixin'
    import Song from 'common/js/song'


    export default {
        mixins: [playerMixin,playlistMixin],
        components: {
            Switches,
            Scroll,
            SongList,
            NoResult
        },
        computed: {
            ...mapGetters([
                'favouriteList'
            ]),
            noResult(){
                if (this.currentIndex === 0) {
                    return !this.favouriteList.length
                } else {
                    return !this.playList.length
                }
            },
            noResultDesc(){
                if (this.currentIndex === 0) {
                    return '暂无收藏歌曲'
                } else {
                    return '您还没有通过歌曲'
                }
            }
        },
        data(){
            return {
                switches: [
                    {name: '我喜欢的'},
                    {name: '最近听的'}
                ],
                currentIndex: 0
            }
        },
        methods: {
            ...mapActions([
                'insertSong',
                'randomPlay'
            ]),
            back(){
                this.$router.back()
            },
            handlePlaylist(playlist){
                const bottom = playlist.length > 0 ? '60px' : ''
                this.$refs.listWrapper.style.bottom = bottom
                this.$refs.favouriteList && this.$refs.favouriteList.refresh()
                this.$refs.playList && this.$refs.playList.refresh()
            },
            switchItem(index){
                this.currentIndex = index
                setTimeout(() => {
                    if (this.currentIndex === 0) {
                        this.$refs.favouriteList.refresh()
                    } else {
                        this.$refs.songList.refresh()
                    }
                }, 20)
            },
            selectSong(song){
                this.insertSong(new Song(song))
            },
            randomFun(){
                let list = this.currentIndex == 0 ? this.favouriteList : this.playList
                if(!list.length){
                    return
                }
                list = list.map((item) => {
                    return new Song(item)
                })
                this.randomPlay({list})
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '~common/stylus/variable'
    @import '~common/stylus/mixin'

    .user-center
        width: 100%
        position: absolute
        top: 0
        bottom: 0
        z-index: 100
        background-color: $color-background
        &.slider-enter-active, &.slider-leave-active
            transition: all .5s
        &.slider-enter, &.slider-leave-to
            transform: translate3d(100%, 0, 0)
        .back
            position: absolute
            top: 0
            left: 10px
            z-index: 15
            .icon-back
                display: block
                font-size: $font-size-large-x
                color: $color-theme
                padding: 10px
        .switches-wrapper
            margin: 10px 0 30px 0
        .play-btn
            box-sizing: border-box
            width: 135px
            padding: 7px 0
            margin: 0 auto
            text-align: center
            border: 1px solid $color-text-l
            color: $color-text-l
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
        .list-wrapper
            position: absolute
            top: 110px
            bottom: 0
            width: 100%
            .list-scroll
                height: 100%
                overflow: hidden
                .list-inner
                    padding: 20px 30px
        .no-result-wrapper
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
</style>
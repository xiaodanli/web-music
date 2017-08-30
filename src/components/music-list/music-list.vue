<template>
    <div class="music-list">
        <div class="back" @click="back">
            <i class="icon-back"></i>
        </div>
        <h2 class="title">{{title}}</h2>
        <div class="bg-image" :style="bgStyle" ref="bgImg">
            <div class="play-wrapper" ref="play">
                <div class="play">
                    <i class="icon-play"></i>
                    <div class="text">随机播放全部</div>
                </div>
            </div>
            <div class="filter" ref="filter"></div>
        </div>
        <div class="bg-layer" ref="layer"></div>
        <scroll :data="songs" class="list" ref="songList"
                :listen-scroll="listenScroll"
                :probe-type="probeType"
                @scroll="scroll">
            <div class="song-list-wrapper">
                <song-list :songs="songs"></song-list>
            </div>
        </scroll>
    </div>
</template>
<script>
    import Scroll from 'base/scroll/scroll'
    import SongList from 'base/song-list/song-list'
    import {prefixStyle} from 'common/js/dom'

    const RESERVED_HEIGHT = 40
    const transform = prefixStyle('transform')
    const backdrop = prefixStyle('backdrop-filter')

    export default {
        components: {
            Scroll,
            SongList
        },
        data(){
            return {
                scrollY: 0
            }
        },
        props: {
            title: {
                type: String,
                default: ''
            },
            bgImage: {
                type: String,
                default: ''
            },
            songs: {
                type: Array,
                default: []
            }
        },
        created(){
            this.listenScroll = true
            this.probeType = 3
        },
        mounted(){
            this.imgHeight = this.$refs.bgImg.clientHeight
            this.$refs.songList.$el.style.top = `${this.imgHeight}px`
            this.minTranslateY =  -this.imgHeight + RESERVED_HEIGHT
        },
        computed: {
            bgStyle(){
                return `background-image:url(${this.bgImage})`
            }
        },
        methods: {
            scroll(pos){
                this.scrollY = pos.y
            },
            back(){
                this.$router.back()
            }
        },
        watch: {
            scrollY(newVal){
                let translateY = Math.max(this.minTranslateY,newVal)
                let scale = 1
                let zIndex = 0
                let blur = 0

                const percent = Math.abs(newVal/this.imgHeight)

                if(newVal > 0){
                    scale = 1 + percent
                    zIndex = 10
                    this.$refs.bgImg.style[transform] = `scale(${scale})`
                }else{
                    blur = Math.min(20,percent * 20)
                }

                this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
                this.$refs.filter.style[backdrop] = `blur(${blur}px)`  //高斯模糊在安卓手机不支持

                if (newVal < this.minTranslateY) {
                    zIndex = 10
                    this.$refs.bgImg.style.height = `${RESERVED_HEIGHT}px`
                    this.$refs.bgImg.style.paddingTop = 0
                    this.$refs.play.style.display = "none"
                } else {
                    this.$refs.bgImg.style.height = 0
                    this.$refs.bgImg.style.paddingTop = '70%'
                    this.$refs.play.style.display = "block"
                }
                this.$refs.bgImg.style.zIndex = zIndex
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '~common/stylus/variable'
    @import '~common/stylus/mixin'
    .music-list
        position: fixed
        z-index: 100
        top: 0
        left: 0
        bottom: 0
        right: 0
        background: $color-background
        .back
            position: absolute
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
            line-height 40px
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
                    border-radius 100px
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
            background rgba(7, 17, 27, 0.4)
        .bg-layer
            position: relative
            height: 100%
            background: $color-background
        .list
            position: absolute
            top: 0
            bottom: 0
            width: 100%
            background $color-background
            .song-list-wrapper
                padding: 20px 30px
            .loading-container
                position: absolute
                width: 100%
                top: 50%
                transform: translateY(-50%)


</style>
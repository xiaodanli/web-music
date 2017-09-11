<template>
    <div class="recommend" ref="recommendList">
        <scroll class="recommend-content" :data="discList" ref="scroll">
            <div>
                <div class="slider-wrap" v-if="recommends.length">
                    <slider>
                        <div v-for="(item,index) in recommends">
                            <a :href="item.linkUrl">
                                <img :src="item.picUrl" @load="loadImage">
                            </a>
                        </div>
                    </slider>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul v-if="discList.length">
                        <li v-for="item in discList" class="item">
                            <div class="icon">
                                <img v-lazy="item.imgurl" width="60" height="60">
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
    import {getRecommend, getDiscList} from 'api/recommend'
    import {ERR_OK} from 'api/config'
    import Slider from 'base/slider/slider'
    import Scroll from 'base/scroll/scroll'
    import Loading from 'base/loading/loading'
    import {playlistMixin} from 'common/js/mixin'

    export default{
        mixins:[playlistMixin],
        components: {
            Slider,
            Scroll,
            Loading
        },
        data(){
            return {
                recommends: [],
                discList: [],
                isCheckLoaded: false
            }
        },
        created () {
            this._getRecommends()
            this._getDiscList()
        },
        methods: {
            _getRecommends(){
                getRecommend().then((res) => {
                    if (res.code == ERR_OK) {
                        this.recommends = res.data.slider
                    }
                })
            },
            _getDiscList(){
                getDiscList().then((res) => {
                    if (res.code == ERR_OK) {
                        this.discList = res.data.list
                    }
                })
            },
            loadImage(){
                if (!this.isCheckLoaded) {
                    this.$refs.scroll.refresh()
                }
                this.isCheckLoaded = true
            },
            handlePlaylist(playlist){
                const bottom = playlist.length > 0 ? '60px' :''
                this.$refs.recommendList.style.bottom = bottom
                this.$refs.scroll.refresh()
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~common/stylus/variable'

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
            width:100%
            position:absolute
            top:50%
            transform:translateY(-50%)

</style>
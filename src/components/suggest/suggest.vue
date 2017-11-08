<template>
    <scroll class="suggest"
            :data="result"
            :pullup="pullup"
            @scrollToEnd="searchMore"
            ref="suggest"
            :beforeScroll="beforeScroll"
            @beforeScroll="listScroll"
    >
        <ul class="suggest-list">
            <li class="suggest-item" v-for="item in result" @click="selectItem(item)">
                <div class="icon">
                    <i :class="getIconCls(item)"></i>
                </div>
                <div class="name">
                    <p class="text" v-html="getDisplayText(item)"></p>
                </div>
            </li>
            <loading v-show="hasMore" title=""></loading>
        </ul>
        <div class="no-result-wrap" v-show="!hasMore && !result.length">
            <no-result title="抱歉，暂无搜索结果"></no-result>
        </div>
    </scroll>
</template>
<script type="text/ecmascript-6">
    import {search} from 'api/search'
    import {createSong} from 'common/js/song'
    import Scroll from 'base/scroll/scroll'
    import Loading from 'base/loading/loading'
    import NoResult from 'base/no-result/no-result'
    import Singer from 'common/js/singer'
    import {mapMutations,mapActions} from 'vuex'

    const TYPE_SINGER = 'singer'
    const perpage = 20


    export default {
        components: {
            Scroll,
            Loading,
            NoResult
        },
        props: {
            query: {
                type: String,
                default: ''
            },
            showSinger: {
                type: Boolean,
                default: true
            }
        },
        data(){
            return {
                page: 1,          //当前加载页数
                result: [],       //搜索结果
                pullup: true,     //上拉加载更多
                hasMore: false,   //是否还有更多
                beforeScroll: true
            }
        },
        methods: {
            ...mapMutations({
                setSinger:'SET_SINGER'
            }),
            ...mapActions([
                'insertSong'
            ]),
            search(){
                this.page = 1
                this.hasMore = true
                this.$refs.suggest.scrollTo(0, 0)
                search(this.query, this.page, this.showSinger, perpage).then((resp) => {
                    this.result = this._genResult(resp.data)
                    this._checkMore(resp.data)
                }).catch((error) => {
                    console.log(error)
                })
            },
            searchMore(){
                if (!this.hasMore) {
                    return
                }
                this.page++
                search(this.query, this.page, this.showSinger, perpage).then((resp) => {
                    this.result = this.result.concat(this._genResult(resp.data))
                    this._checkMore(resp.data)
                }).catch((error) => {
                    console.log(error)
                })
            },
            getIconCls(item){
                if (item.type == TYPE_SINGER) {
                    return 'icon-mine'
                } else {
                    return 'icon-music'
                }
            },
            getDisplayText(item){
                if (item.type == TYPE_SINGER) {
                    return item.singername
                } else {
                    return `${item.name}-${item.singer}`
                }
            },
            listScroll(){
                this.$emit('listScroll')
            },
            selectItem(item){
                if (item.type == TYPE_SINGER) {
                    const singer = new Singer({
                        id: item.singermid,
                        name: item.singername
                    })
                    this.setSinger(singer)
                    this.$router.push({
                        path: `/search/${singer.id}`
                    })
                }else{
                    this.insertSong(item)
                }
                this.$emit('select')
            },
            _checkMore(data){
                let song = data.song
                if (!song.list.length || (song.curnum + (song.curpage - 1) * perpage) >= song.totalnum) {
                    this.hasMore = false
                }
            },
            _genResult(data){
                let ret = []
                if (data.zhida && data.zhida.singerid) {
                    ret.push({...data.zhida, ...{type: TYPE_SINGER}})
                }
                if (data.song) {
                    ret = ret.concat(this._normalizeSongs(data.song.list))
                }
                return ret
            },
            _normalizeSongs(list){
                let ret = []
                list.forEach((musicData) => {
                    if (musicData.songid && musicData.albummid) {
                        ret.push(createSong(musicData))
                    }
                })
                return ret
            }
        },
        watch: {
            query(){
                this.search()
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '~common/stylus/variable'
    @import '~common/stylus/mixin'

    .suggest
        height: 100%
        overflow: hidden
        .suggest-list
            padding: 0 30px
            .suggest-item
                display: flex
                align-items: center
                padding-bottom: 20px
            .icon
                flex: 0 0 30px
                width: 30px
                [class^='icon-']
                    font-size: 14px
                    color: $color-text-d
            .name
                flex: 1
                font-size: $font-size-medium
                color: $color-text-d
                overflow: hidden
                .text
                    no-wrap()
        .no-result-wrap
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
</style>

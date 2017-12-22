<template>
    <div class="search">
        <div class="search-box-wrapper">
            <search-box ref="searchBox" @query="onQueryChange"></search-box>
        </div>
        <!--热门搜索-->
        <div class="shortcut-wrapper" v-show="!query" ref="shortcutWrapper">
            <scroll class="shortcut" :data="shortcut" ref="shortcut">
                <div>
                    <div class="hot-key">
                        <h1 class="title">热门搜索</h1>
                        <ul>
                            <li class="item" v-for="item in hotKey" @click="addQuery(item.k)">
                                <span>{{item.k}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="search-history" v-show="searchHistory.length">
                        <h1 class="title">
                            <span class="text">搜索历史</span>
                            <span class="clear" @click="showConfirm">
                                <i class="icon-clear"></i>
                            </span>
                        </h1>
                        <search-list :searches="searchHistory" @delete="deleteSearchHistory" @select="addQuery"></search-list>
                    </div>
                    <confirm ref="confirm" confirm-btn-text="清除" title="是否确认删除所有的搜索记录" @confirm="clearSearchHistory"></confirm>
                </div>
            </scroll>
        </div>
        <!--搜索结果列表-->
        <div class="search-result" v-show="query" ref="searchResult">
            <suggest ref="suggest" :query="query" @listScroll="blurInput" @select="saveSearch"></suggest>
        </div>
        <router-view></router-view>
    </div>
</template>
<script type="text/ecmascript-6">
    import SearchBox from 'base/search-box/search-box'
    import {getHotKey, search} from 'api/search'
    import {ERR_OK} from 'api/config'
    import Suggest from 'components/suggest/suggest'
    import SearchList from 'base/search-list/search-list'
    import {mapActions} from 'vuex'
    import Confirm from 'base/confirm/confirm'
    import Scroll from 'base/scroll/scroll'
    import {playlistMixin,searchMixin} from 'common/js/mixin'

    export default{
        mixins:[playlistMixin,searchMixin],
        components: {
            SearchBox,
            Suggest,
            SearchList,
            Confirm,
            Scroll
        },
        data(){
            return {
                hotKey: []
            }
        },
        computed:{
            shortcut(){
                return this.hotKey.concat(this.searchHistory)
            }
        },
        created(){
            this._getHotKey()
        },
        methods: {
            ...mapActions([
                'clearSearchHistory'
            ]),
            handlePlaylist(playlist){
                const bottom = playlist.length > 0 ? '60px' : ''
                this.$refs.shortcutWrapper.style.bottom = bottom
                this.$refs.shortcut.refresh()
                this.$refs.searchResult.style.bottom = bottom
                this.$refs.suggest.refresh()
            },
            showConfirm(){
                this.$refs.confirm.show()
            },
            _getHotKey(){
                getHotKey().then((resp) => {
                    if (resp.code === ERR_OK) {
                        this.hotKey = resp.data.hotkey.slice(0, 10)
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }
        },
        watch:{
            query(newQuery){
                if(!newQuery){
                    setTimeout(() => {
                        this.$refs.shortcut.refresh()
                    },20)
                }
            }
        }
    }
</script>
<style scoped rel="stylesheet/stylus" lang="stylus">
    @import '~common/stylus/variable'
    @import '~common/stylus/mixin'

    .search
        .search-box-wrapper
            margin: 20px
        .shortcut-wrapper
            position: fixed
            top: 178px
            bottom: 0
            width: 100%
            .shortcut
                height: 100%
                overflow: hidden
            .hot-key
                margin: 0 20px 20px 20px
                .title
                    margin-bottom: 20px
                    font-size: $font-size-medium
                    color: $color-text-l
                .item
                    display: inline-block
                    padding: 5px 10px
                    margin: 0 20px 10px 0
                    border-radius: 6px
                    background: $color-highlight-background
                    font-size: $font-size-medium
                    color: $color-text-d
            .search-history
                position: relative
                margin: 0 20px
                .title
                    display: flex
                    align-items: center
                    height: 40px
                    font-size: $font-size-medium
                    color: $color-text-l
                    .text
                        flex: 1

                    .clear
                        extend-click()
                        .icon-clear
                            font-size: $font-size-medium
                            color: $color-text-d
        .search-result
            position: fixed
            width: 100%
            top: 178px
            bottom: 0
</style>
<template>
    <div class="search">
        <div class="search-box-wrapper">
            <search-box ref="searchBox"></search-box>
        </div>
        <!--热门搜索-->
        <div class="shortcut-wrapper">
            <div class="shortcut">
                <div>
                    <div class="hot-key">
                        <h1 class="title">热门搜索</h1>
                        <ul>
                            <li class="item" v-for="item in hotKey" @click="addQuery(item.k)">
                                <span>{{item.k}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!--搜索结果列表-->
        <div class="search-result">
            <suggest></suggest>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import SearchBox from 'base/search-box/search-box'
    import {getHotKey,search} from 'api/search'
    import {ERR_OK} from 'api/config'
    import Suggest from 'components/suggest/suggest'
    export default{
        components: {
            SearchBox,
            Suggest
        },
        data(){
            return {
                hotKey: []
            }
        },
        created(){
            this._getHotKey()
        },
        methods: {
            addQuery(value){
                this.$refs.searchBox.setQuery(value)
            },
            _getHotKey(){
                getHotKey().then((resp) => {
                    if(resp.code === ERR_OK){
                        this.hotKey = resp.data.hotkey.slice(0,10)
                    }
                }).catch((error) => {
                    console.log(error)
                })
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

</style>
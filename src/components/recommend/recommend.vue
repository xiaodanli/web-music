<template>
    <div class="test">
        <div class="recommend-wrap">
            {{recommends}}
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import BScroll from 'better-scroll'
    import {getRecommend} from 'api/recommend'
    export default{
        data(){
            return {
                recommends:[]
            }
        },
        methods:{
            _getRecommends(){
                getRecommend().then((res) => {
                    this.recommends = res.data.slider
                })
            }
        },
        created () {
            this._getRecommends()
        }
    }
</script>
<style lang="styl">
    @import '~stylus/aa.styl';
</style>
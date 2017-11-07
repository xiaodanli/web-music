<template>
    <transition name="slider">
        <music-list :bg-image="bgImage" :title="title" :songs="songs"></music-list>
    </transition>
</template>

<script>
    import MusicList from 'components/music-list/music-list'
    import {mapGetters} from 'vuex'
    import {getSingerDetail} from 'api/singer'
    import {createSong} from 'common/js/song'
    import {ERR_OK} from 'api/config'

    export default {
        components:{
            MusicList
        },
        computed:{
            ...mapGetters([
                'singer'
            ]),
            bgImage(){
                return this.singer.avatar
            },
            title(){
                return this.singer.name
            }
        },
        data(){
            return {
                songs:[]
            }
        },
        created(){
            this._getSingerDetail()
        },
        methods:{
            _getSingerDetail(){
                console.log(this.singer)
                if(!this.singer.id){
                    this.$router.push({path:'/singer'})
                    return
                }
                getSingerDetail(this.singer.id).then((res) => {
                    if(res.code === ERR_OK){
                        this.songs = this._normalizeSong(res.data.list)
                    }
                })
            },
            _normalizeSong(list){
                let ret = []
                list.forEach((item) => {
                    let {musicData} = item
                    if(musicData.songid && musicData.songmid){
                        ret.push(createSong(musicData))
                    }
                })
                return ret
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '~common/stylus/variable';
    .singer-detail
        position:fixed
        top:0
        left:0
        bottom:0
        right:0
        z-index:9999
        background-color:$color-background
    .slider-enter-active, .slider-leave-active
        transition: all .5s
    .slider-enter, .slider-leave-to
        transform: translate3d(100%,0,0);
</style>
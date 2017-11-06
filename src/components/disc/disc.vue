<template>
    <transition name="slider">
        <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script>
    import MusicList from 'components/music-list/music-list'
    import {mapGetters} from 'vuex'
    import {getSongList} from 'api/recommend'
    import {ERR_OK} from 'api/config'
    import {createSong} from 'common/js/song'
    export default {
        components:{
            MusicList
        },
        data(){
            return {
                songs:[]
            }
        },
        created(){
            this._getSongList()
        },
        computed:{
            title(){
                return this.disc.dissname
            },
            bgImage(){
                return this.disc.imgurl
            },
            ...mapGetters([
                'disc'
            ])
        },
        methods:{
            _getSongList(){
                if(!this.disc.dissid){
                    this.$router.push('/recommend')
                    return
                }
                getSongList(this.disc.dissid).then((resp) => {
                    if(resp.code === ERR_OK){
                        this.songs = this._normalizeSongs(resp.cdlist[0].songlist)
                    }
                }).catch((error) => {
                    console.warn(error)
                })
            },
            _normalizeSongs(list){
                let ret = []
                list.forEach((musicData) => {
                    if(musicData.songid && musicData.albummid){
                        ret.push(createSong(musicData))
                    }
                })
                return ret
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .slider-enter-active,slider-leave-active{
        transition:all 0.3s
    }
    .slider-enter,.slider-leave-to{
        transform:translate3d(100%,0,0)
    }
</style>
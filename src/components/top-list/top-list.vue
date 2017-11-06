<template>
    <transition name="slider">
        <music-list :title="title" :bg-image="bgImage" :songs="songs" :rank="rank"></music-list>
    </transition>
</template>
<script>
    import MusicList from 'components/music-list/music-list'
    import {mapGetters} from 'vuex'
    import {getMusicList} from 'api/rank'
    import {ERR_OK} from 'api/config'
    import {createSong} from 'common/js/song'
    export default {
        components: {
            MusicList
        },
        data(){
            return {
                songs: [],
                rank: true
            }
        },
        created(){
            this._getMusicList()
        },
        computed: {
            ...mapGetters([
                'topList'
            ]),
            title(){
                return this.topList.topTitle
            },
            bgImage(){
                return this.songs.length > 0 ? this.songs[0].image : this.topList.picUrl
            }
        },
        methods: {
            _getMusicList(){
                if(!this.topList.id){
                    this.$router.push('/rank')
                }
                getMusicList(this.topList.id).then((resp) => {
                    if (resp.code === ERR_OK) {
                        this.songs = this._normalizeSongs(resp.songlist)
                    }
                }).catch((error) => {
                    console.log(error)
                })
            },
            _normalizeSongs(list){
                let ret = []
                list.forEach((item) => {
                    let musicData = item.data
                    ret.push(createSong(musicData))
                })
                return ret
            }
        }
    }
</script>
<style lang="stylus" scoped rel="stylesheet/less">
    .slider-enter-active, .slider-leave-active {
        transition: all 0.3s
    }

    .slider-enter, .slider-leave-to {
        transform: translate3d(100%, 0, 0)
    }
</style>
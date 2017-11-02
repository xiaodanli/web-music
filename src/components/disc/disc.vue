<template>
    <transition name="slider">
        <music-list :title="title" :bg-image="bgImage"></music-list>
    </transition>
</template>

<script>
    import MusicList from 'components/music-list/music-list'
    import {mapGetters} from 'vuex'
    import {getSongList} from 'api/recommend'
    export default {
        components:{
            MusicList
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
                getSongList(this.disc.dissid).then((resp) => {
                    console.log(resp)
                }).catch((error) => {
                    console.warn(error)
                })
            }
        },
        created(){
            this._getSongList()
        }
    }
</script>
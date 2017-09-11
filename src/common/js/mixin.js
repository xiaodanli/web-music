/**
 * Created by dandan on 17-9-11.
 */
import {mapGetters} from 'vuex'
export const playlistMixin = {
    computed:{
        ...mapGetters([
            'playList'
        ])
    },
    mounted(){
        this.handlePlaylist(this.playList)
    },
    activated(){
        this.handlePlaylist(this.playList)
    },
    methods:{
        handlePlaylist(){
            throw new Error('component must implement handlePlaylist method')
        }
    },
    watch:{
        playList(newVal){
            this.handlePlaylist(newVal)
        }
    }
}
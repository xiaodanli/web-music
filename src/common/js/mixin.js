/**
 * Created by dandan on 17-9-11.
 */
import {playMode} from 'common/js/config'
import {mapMutations,mapGetters,mapActions} from 'vuex'
import {shuffle} from 'common/js/util'


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

export const playerMixin = {
    computed:{
        ...mapGetters([
            'playList',
            'currentSong',
            'sequenceList',
            'mode'
        ]),
        iconMode(){
            return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
        }
    },
    methods:{
        ...mapMutations({
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setPlayMode: 'SET_PLAY_MODE',
            setPlaylist: 'SET_PLAYLIST'
        }),
        changeMode(){
            let mode = (this.mode + 1) % 3
            this.setPlayMode(mode)
            let list = null
            if (mode === playMode.random) {
                list = shuffle(this.sequenceList)
            } else {
                list = this.sequenceList
            }
            this.resetCurrentIndex(list)
            this.setPlaylist(list)
        },
        resetCurrentIndex(list){
            let index = list.findIndex((item) => {
                return item.id == this.currentSong.id
            })
            this.setCurrentIndex(index)
        }
    }
}

export const searchMixin = {
    data(){
        return {
            query: ''
        }
    },
    computed:{
        ...mapGetters([
            'searchHistory'
        ]),
    },
    methods:{
        ...mapActions([
            'insertSearch',
            'deleteSearchHistory'
        ]),
        onQueryChange(query){
            this.query = query
        },
        saveSearch(){
            this.insertSearch(this.query)
        },
        blurInput(){
            this.$refs.searchBox.blur()
        },
        addQuery(value){
            this.$refs.searchBox.setQuery(value)
        }
    }
}
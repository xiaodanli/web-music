/**
 * Created by dandan on 17-8-29.
 */
import * as types from "./mutation-types";
import {playMode} from "common/js/config";
import {shuffle} from "common/js/util";
import {saveSearch,deleteSearch,clearAll,savePlay} from 'common/js/cache'

function findIndex(list, song) {
    return list.findIndex((item) => {
        return item.id === song.id
    })
}

export const selectPlay = function ({commit, state}, {list, index}) {
    commit(types.SET_SEQUENCE_LIST, list)
    if (state.mode == playMode.random) {
        let randomList = shuffle(list)
        commit(types.SET_PLAYLIST, randomList)
        index = findIndex(randomList, list[index])
    } else {
        commit(types.SET_PLAYLIST, list)
    }
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function ({commit}, {list}) {
    commit(types.SET_PLAY_MODE, playMode.random)
    commit(types.SET_SEQUENCE_LIST, list)
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    commit(types.SET_CURRENT_INDEX, 0)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}

//在搜索结果点击添加歌曲
export const insertSong = function ({commit, state}, song) {
    let playlist = state.playList.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex

    let currentSong = playlist[currentIndex]
    //查找播放的index
    let fpIndex = findIndex(playlist, song)

    currentIndex++

    playlist.splice(currentIndex, 0, song)

    if (fpIndex > -1) {
        if (fpIndex > currentIndex) {
            playlist.splice(fpIndex + 1, 1)
        } else {
            playlist.splice(fpIndex, 1)
            currentIndex--
        }
    }

    let currentSIndex = findIndex(sequenceList, currentSong) + 1

    let fsIndex = findIndex(sequenceList, song)

    sequenceList.splice(currentSIndex, 0, song)

    if (fsIndex > -1) {
        if (fsIndex > currentSIndex) {
            sequenceList.splice(fsIndex + 1, 1)
        } else {
            sequenceList.splice(fsIndex, 1)
        }
    }

    commit(types.SET_PLAYLIST,playlist)
    commit(types.SET_SEQUENCE_LIST,sequenceList)
    commit(types.SET_CURRENT_INDEX,currentIndex)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}

//插入搜索历史记录
export const insertSearch = function ({commit},query) {
    commit(types.SET_SEARCH_HISTORY,saveSearch(query))
}
//删除一条历史记录
export const deleteSearchHistory = function({commit},query){
    commit(types.SET_SEARCH_HISTORY,deleteSearch(query))
}
//删除搜索的历史记录
export const clearSearchHistory = function ({commit}) {
    commit(types.SET_SEARCH_HISTORY,clearAll())
}

//删除某一首歌曲
export const deleteSong = function({commit,state},song){
    let playlist = state.playList.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex

    let pIndex = findIndex(playlist,song)
    playlist.splice(pIndex,1)
    let sIndex = findIndex(sequenceList,song)
    sequenceList.splice(sIndex,1)

    if(currentIndex > pIndex || currentIndex === playlist.length){
        currentIndex--
    }

    commit(types.SET_PLAYLIST,playlist)
    commit(types.SET_SEQUENCE_LIST,sequenceList)
    commit(types.SET_CURRENT_INDEX,currentIndex)

    const playState = playlist.length > 0
    commit(types.SET_PLAYING_STATE,playState)
}

//清空播放列表

export const deleteSongList = function({commit}){
    commit(types.SET_SEQUENCE_LIST,[])
    commit(types.SET_PLAYLIST,[])
    commit(types.SET_CURRENT_INDEX,-1)
    commit(types.SET_PLAYING_STATE,false)
}

//保存播放历史列表
export const savePlayHistory = function({commit},song){
    commit(types.SET_PLAY_HISTORY,savePlay(song))
}



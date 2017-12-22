import storage from "good-storage";

const SEARCH_KEY = '__search__'    //搜索历史保存的key
const SEARCH_MAX_LEN = 15          //最多保存的数量


const PLAY_KEY = '__play__'     //播放列表保存的key
const PLAY_MAX_LENGTH = 200

//插入搜索历史
function insertArray(arr, val, compare, maxLen) {
    const index = arr.findIndex(compare)

    if (index === 0) {
        return
    }

    if (index > 0) {
        arr.splice(index, 1)
    }

    arr.unshift(val)

    if (maxLen && arr.length > maxLen) {
        arr.pop()
    }
}

function deleteFromArray(arr,compare){
    const index = arr.findIndex(compare)
    if(index > -1){
        arr.splice(index,1)
    }
}

//保存搜索历史
export function saveSearch(query) {

    let searches = storage.get(SEARCH_KEY, [])
    insertArray(searches,query,(item) => {
        return item === query
    },SEARCH_MAX_LEN)

    storage.set(SEARCH_KEY,searches)

    return searches
}

//刷新时获取搜索历史
export function loadSearch(){
    return storage.get(SEARCH_KEY, [])
}

//删除一条历史记录
export function deleteSearch(query) {
    let searches = storage.get(SEARCH_KEY, [])
    deleteFromArray(searches,(item) => {
        return item === query
    })
    storage.set(SEARCH_KEY,searches)

    return searches
}

//删除所有的历史记录
export function clearAll() {
    storage.remove(SEARCH_KEY)
    return []
}

//存储播放历史列表
export function savePlay(song){
    let songs = storage.get(PLAY_KEY,[])
    insertArray(songs,song,(item) => {
        return item.id === song.id
    },PLAY_MAX_LENGTH)
    storage.set(PLAY_KEY,songs)
    return songs
}

//从缓存中获取播放历史列表
export function loadPlay(){
    return storage.get(PLAY_KEY,[])
}

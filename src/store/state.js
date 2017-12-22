/**
 * Created by dandan on 17-8-29.
 */
import {playMode} from "common/js/config";
import {loadSearch, loadPlay,loadFavourite} from "common/js/cache";

const state = {
    singer: {}, //歌手的信息

    playing: false, //播放状态
    fullScreen: false, //播放器全屏和收起状态
    playList: [], //播放列表 包括循环播放  随机播放  单曲循环
    sequenceList: [], //原始列表
    mode: playMode.sequence, //播放模式：顺序播放  循环播放  随机播放
    currentIndex: -1, //当前播放的音乐index
    lyric: [], //当前歌曲的歌词
    disc: {}, //歌单详情
    topList: {}, //排行榜列表
    searchHistory: loadSearch(), //搜索历史
    playHistory: loadPlay(),       //播放历史列表
    favouriteList:loadFavourite()    //最爱歌单列表
}
export default state

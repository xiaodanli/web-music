/**
 * Created by dandan on 17-8-29.
 */
import {playMode} from "common/js/config";

const state = {
    singer: {},                     //歌曲的信息

    playing: false,                 //播放状态
    fullScreen: false,              //播放器全屏和收起状态
    playList: [],                   //播放列表 包括循环播放  随机播放  单曲循环
    sequenceList: [],               //原始列表
    mode: playMode.sequence,        //播放模式：顺序播放  循环播放  随机播放
    currentIndex: -1,               //当前播放的音乐index
    lyric: [],                      //当前歌曲的歌词
    disc: {},                       //歌单详情
    topList : {}                    //排行榜列表
}
export default state
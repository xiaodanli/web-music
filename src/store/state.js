/**
 * Created by dandan on 17-8-29.
 */
import {playMode} from "common/js/config";

const state = {
    singer: {},                     //歌曲的信息

    playing: false,                 //播放状态
    fullScreen: false,              //播放器全屏和收起状态
    playList: [],                   //播放列表
    sequenceList: [],               //播放的有序列表，播放模式不是顺序播放时和playList就不一样
    mode: playMode.sequence,        //播放模式：顺序播放  循环播放  随机播放
    currentIndex: -1                //当前播放的音乐index
}
export default state
/**
 * Created by dandan on 17-8-29.
 */
import { playMode } from "common/js/config";
import { loadSearch } from 'common/js/cache'

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
  test: [{
    album: "MADE SERIES 《A》",
    duration: 195,
    id: 102629054,
    image: "https://y.gtimg.cn/music/photo_new/T002R300x300M000003UYgaO2wuwht.jpg?max_age=2592000",
    mid: "001O6lhv2pBoyZ",
    name: "WE LIKE 2 PARTY",
    singer: "BIGBANG (빅뱅)",
    url: "http://ws.stream.qqmusic.qq.com/102629054.m4a?fromtag=46"
  },
  {
    album: "MADE SERIES 《A》",
    duration: 194,
    id: 102629054,
    image: "https://y.gtimg.cn/music/photo_new/T002R300x300M000003UYgaO2wuwht.jpg?max_age=2592000",
    mid: "001O6lhv2pBoyZ",
    name: "WE LIKE 2 PARTY",
    singer: "BIGBANG (빅뱅)",
    url: "http://ws.stream.qqmusic.qq.com/102629054.m4a?fromtag=46"
  }]
}
export default state

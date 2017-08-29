/**
 * Created by dandan on 17-8-29.
 */
export default class Song {
    /**
     * id:歌曲id
     * mid:歌曲mid
     * singer:演唱歌曲歌手列表
     * name:歌曲名字
     * album:专辑名称
     * duration:歌曲总长度
     * image:歌曲图片
     * url:歌曲url
     */

    constructor({id, mid, singer, name, album, duration, image, url}) {
        this.id = id
        this.mid = mid
        this.singer = singer
        this.name = name
        this.album = album
        this.duration = duration
        this.image = image
        this.url = url
    }
}

export function createSong(musicData) {
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: musicData.singer,
        name: musicData.songname,
        album: musicData.albumname,
        duration:musicData.interval,
        image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url:`http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?formtag=46`
    })
}

function filterSinger(singer) {
    let ret = []
    if (!singer) {
        return ''
    }
    singer.forEach((s) => {
        ret.push(s.name)
    })
    return ret.join("/")
}
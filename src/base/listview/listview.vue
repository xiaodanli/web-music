<template>
    <scroll :data="data"
            class="listview"
            ref="listview"
            :probeType="probeType"
            :listen-scroll="listenScroll"
            @scroll="scroll"
    >
        <ul>
            <li v-for="group in data" class="list-group" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li v-for="item in group.items" class="list-group-item">
                        <img v-lazy="item.avatar" class="avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut"
             @touchstart.stop.prevent='onShortcutTouchStart'
             @touchmove.stop.prevent="onShortcutTouchMove"
             @touchend.stop.prevent
        >
            <ul>
                <li class="item" v-for="(item,index) in shortcut"
                    :data-index="index"
                    :class="{current:currentIndex === index}"
                >{{item}}
                </li>
            </ul>
        </div>
        <div class="list-fixed" v-show="fixedTitle" ref="fixed">
            <h2 class="fixed-title">{{fixedTitle}}</h2>
        </div>
    </scroll>
</template>
<script>
    import Scroll from 'base/scroll/scroll'
    import {getData} from 'common/js/dom'

    const ANCHOR_HEIGHT = 18  //每个锚点的高度
    const TITLE_HEIGHT = 30

    export default {
        components: {
            Scroll
        },
        created(){
            this.touch = {}
            this.probeType = 3
            this.listenScroll = true
            this.listHeight = []
        },
        data(){
            return {
                scrollY: -1,
                currentIndex: 0,
                diff:0
            }
        },
        props: {
            data: {
                type: Array,
                default: []
            }
        },
        computed: {
            shortcut(){
                return this.data.map((item) => {
                    return item.title.substr(0, 1)
                })
            },
            fixedTitle(){
                if(this.scrollY > 0){
                    return ''
                }
                return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
            }
        },
        methods: {
            onShortcutTouchStart(e){
                let anchorIndex = getData(e.target, 'index')
                if (!anchorIndex) {
                    return
                }
                let firstTouch = e.touches[0]
                this.touch.y1 = firstTouch.pageY
                this.touch.anchorIndex = anchorIndex
                this._scrollTo(anchorIndex)
            },
            onShortcutTouchMove(e){
                let firstTouch = e.touches[0]
                this.touch.y2 = firstTouch.pageY
                let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0  //相当于Math.floor() 向下取整
                let anchorIndex = parseInt(this.touch.anchorIndex) + delta
                this._scrollTo(anchorIndex)
            },
            scroll(pos){
                this.scrollY = pos.y
            },
            _scrollTo(index){
                if (!index && index!==0) {
                    index = 0
                }
                if(index < 0){
                    index=0
                }else if(index > this.listHeight.length - 2){
                    index = this.listHeight.length - 2
                }
                this.scrollY = -this.listHeight[index]
                this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
            },
            //计算每个字母类型的高度
            _calculateHeight(){
                this.listHeight = []
                let height = 0
                this.listHeight.push(height)
                const list = this.$refs.listGroup
                for (var i = 0; i < list.length; i++) {
                    let item = list[i]
                    height += item.clientHeight
                    this.listHeight.push(height)
                }
            }
        },
        watch: {
            data(){
                setTimeout(() => { //数据变化到dom的变化有一个延迟，通常在nextTick后执行，为兼容所有的设备，设置20秒的延迟
                    this._calculateHeight()
                }, 20)
            },
            scrollY(newVal){
                let list = this.listHeight
                //当页面滚动到顶部，且newY > 0
                if(newVal > 0){
                    this.currentIndex = 0
                    return
                }
                //在列表中间滚动
                for (var i = 0; i < list.length - 1; i++) {
                    let height1 = list[i]
                    let height2 = list[i + 1]
                    if(-newVal >= height1 && -newVal < height2){
                        this.diff = height2 + newVal
                        this.currentIndex = i
                        return
                    }
                }
                //当页面滚动到底部，且-newY大于height2
                this.currentIndex = list.length - 2
            },
            diff(newVal){
                console.log(newVal)
                let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? (newVal-TITLE_HEIGHT) : 0
                if(this.fixedTop === fixedTop){
                    return
                }
                this.fixedTop = fixedTop
                this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import '~common/stylus/variable'

    .listview
        position: relative
        width: 100%
        height: 100%
        overflow: hidden
        background: $color-background
        .list-group
            padding-bottom: 30px
            .list-group-title
                height: 30px
                line-height: 30px
                padding-left: 20px
                font-size: $font-size-small
                color: $color-text-l
                background $color-highlight-background
            .list-group-item
                display: flex
                align-items: center
                padding: 20px 0 0 30px
                .avatar
                    width: 50px
                    height: 50px
                    border-radius: 50%
                .name
                    margin-left: 20px
                    color: $color-text-l
                    font-size $font-size-medium
        .list-shortcut
            position: absolute
            z-index: 30
            right: 30
            top: 50%
            right: 0
            transform: translateY(-50%)
            width: 20px
            padding: 20px 0
            border-radius: 10px
            text-align: center
            background: $color-background-d
            font-family: Helvetica
            .item
                padding: 3px
                line-height: 1
                color: $color-text-l
                font-size: $font-size-small
                &.current
                    color: $color-theme
        .list-fixed
            position: absolute
            top: 0
            left: 0
            width: 100%
            .fixed-title
                height: 30px
                line-height: 30px
                padding-left: 20px
                font-size: $font-size-small
                color: $color-text-l
                background: $color-highlight-background
        .loading-container
            position: absolute
            width: 100%
            top: 50%
            transform translateY(-50%)
</style>
<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
        <div class="dots">
            <div class="dot"
                 v-for="(item,index) in dots"
                 :key="index"
                 :class="{active:currentPageIndex === index}"
            ></div>
        </div>
    </div>
</template>
<script>
    import { addClass } from 'common/js/dom'
    import BScroll from 'better-scroll'
    export default {
        data(){
            return {
                dots:[],
                currentPageIndex:0
            }
        },
        props:{
            loop:{
                type:Boolean,
                default:true
            },
            autoPlay:{
                type:Boolean,
                default:true
            },
            interval:{
                type:Number,
                default:4000
            },
            showDot:{
                type:Boolean,
                default:true
            }
        },
        mounted(){
            setTimeout(() => {
                this._setSliderWhite()
                this._initDots()
                this._initSlider()
                if(this.autoPlay){
                    this._play()
                }
            }, 20)
            window.addEventListener('resize',()=>{
                this._setSliderWhite(true)
                this.slider.refresh()
            })
        },
        methods: {
            // 设置sliderGroup和slider的宽度
            _setSliderWhite(isResize){
                this.children = this.$refs.sliderGroup.children
                let white = 0
                let sliderWhite = this.$refs.slider.clientWidth
                for (let i = 0; i < this.children.length; i++){
                    let child = this.children[i]
                    white += sliderWhite
                    addClass(child,'slide-item')
                    child.style.width = sliderWhite + 'px'
                }
                if(this.loop){
                    white += 2 * sliderWhite
                }
                this.$refs.sliderGroup.style.width = white + 'px'
            },
            //初始化dots
            _initDots(){
                this.dots = new Array(this.children.length)
            },
            //初始化slider
            _initSlider(){
                this.slider = new BScroll(this.$refs.slider,{
                    scrollX:true,
                    scrollY:false,
                    snap:{
                        loop:this.loop,
                        threshold:0.3,
                        speed:400
                    },
                    threshold: 0.3,
                    momentum:false
                })

                this.slider.on("scrollEnd",() => {
                    let pageIndex = this.slider.getCurrentPage().pageX
                    if(this.loop){
                        pageIndex -= 1
                    }
                    this.currentPageIndex = pageIndex
                    if(this.autoPlay){
                        clearTimeout(this.timer)
                        this._play()
                    }
                })
            },
            _play(){
                let nextPage = this.currentPageIndex + 1
                if(this.loop){
                    nextPage += 1
                }
                this.timer = setTimeout(() => {
                    this.slider.goToPage(nextPage,0,400)
                },this.interval)
            }
        },
        destroyed(){
           clearTimeout(this.timer)
        }
    }
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
    @import '~common/stylus/variable'

    .slider
        min-height: 1px
        overflow:hidden
        position: relative
        .slider-group
            overflow: hidden
            write-space: nowrap
            .slide-item
                float: left
                box-sizing: border-box
                overflow: hidden
                text-align: center
                a
                    display: block
                    width: 100%
                    overflow: hidden
                    text-decoration: none
                img
                    display: block
                    width: 100%
        .dots
            position: absolute
            right: 0
            left: 0
            bottom: 12px
            transform: translateZ(1px)
            text-align: center
            font-size: 0
            .dot
                display: inline-block
                margin: 0 4px
                width: 8px
                height: 8px
                border-radius 50%
                background: $color-text-l
                &.active
                    width: 20px
                    border-radius: 5px
                    background: $color-text-ll


</style>

<!--需要注意：better-scroll库的参数click设置为true时，better-scroll内部会阻止浏览器默认事件，
    然后自己派发一个click事件，这个click事件会被fastclick.js阻止掉，所以就不会起作用

    解决办法：不传click参数，利用a标签的默认行为即可实现跳转

    如果设置click:true,可以给需要点击的元素加上needsclick这个class
-->
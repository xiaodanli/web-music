<template>
    <transition name="drop">
        <div class="top-tip" v-show="showFlag" @click.stop="hide">
            <slot></slot>
        </div>
    </transition>
</template>
<script>
    export default {
        props: {
            delay: {
                type: Number,
                default: 2000
            }
        },
        data(){
            return {
                showFlag: false
            }
        },
        methods: {
            show(){
                this.showFlag = true
                if(this.timer){
                    clearTimeout(this.timer)
                }
                this.timer = setTimeout(() => {
                    this.showFlag = false
                },this.delay)
            },
            hide(){
                this.showFlag = false
            }
        }
    }
</script>
<style scoped rel="stylesheet/stylus" lang="stylus">
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"

    .top-tip
        position: fixed
        top: 0
        left: 0
        width: 100%
        text-align: center
        background-color: $color-dialog-background
        z-index: 500
        &.drop-enter-active,&.drop-leave-active
            transition:all 0.3s
        &.drop-enter,&.drop-leave-to
            transform:translate3d(0,-100%,0)

</style>
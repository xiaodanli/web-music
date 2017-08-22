<template>
    <div class="recommend">
        <div class="recommend-content">
            <div class="slider-wrap" v-if="recommends.length">
                <slider>
                    <div v-for="(item,index) in recommends">
                        <a :href="item.linkUrl">
                            <img :src="item.picUrl">
                        </a>
                    </div>
                </slider>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { getRecommend } from 'api/recommend'
    import Slider from 'base/slider/slider'

    export default{
        components:{
            Slider
        },
        data(){
            return {
                recommends: []
            }
        },
        methods: {
            _getRecommends(){
                getRecommend().then((res) => {
                    this.recommends = res.data.slider
                })
            }
        },
        created () {
            this._getRecommends()
        }
    }
</script>
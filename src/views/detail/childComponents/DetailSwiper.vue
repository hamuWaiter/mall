<template>
    <div class="detail-swiper">
        <Swipe>
            <swipe-item v-for="(item,index) in images" :key="index">
                <img :src="item" alt="">
            </swipe-item>
        </Swipe>
    </div>
</template>
<script>
    import { Swipe, SwipeItem } from "mint-ui";

    export default {
        name: "DetailSwiper",
        data() {
            return {
            }
        },
        props: {
            images: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        components: {
            Swipe,
            SwipeItem
        },
    }
</script>
<style scoped>
.detail-swiper{
    height: 300px;
    overflow: hidden;
}
.detail-swiper img{
    width: 100%;
}
.detail-swiper /deep/ .mint-swipe-indicator{
    opacity: 0.6;
}
.detail-swiper /deep/ .mint-swipe-indicator.is-active{
    background-color: red;
    opacity: 0.6;
}
</style>
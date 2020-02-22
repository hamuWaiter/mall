<template>
    <div class="detail">
        <detail-nav-bar/>
        <detail-swiper :images="topImages"/>
        <detail-goods-info :goods-info="goodsInfo"/>
        <detail-shop-info :shop-info="shopInfo"/>
        <div>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
        </div>
    </div>
</template>
<script>
    import DetailNavBar from "./childComponents/DetailNavBar"
    import DetailSwiper from "./childComponents/DetailSwiper"
    import DetailGoodsInfo from "./childComponents/DetailGoodsInfo"
    import DetailShopInfo from "./childComponents/DetailShopInfo"

    import {getDetail, GoodsInfo, Shop} from "network/detail"
    export default {
        name: "Detail",
        data() {
            return {
                iid: this.$route.params.id,
                topImages: [],
                goodsInfo: {},
                shopInfo: {}
            }
        },
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailGoodsInfo,
            DetailShopInfo
        },
        created() {
            getDetail(this.iid).then(res => {
                // 1.获取商品详情页的顶部轮播图数据()
                this.topImages = res.result.itemInfo.topImages
                // 2.通过new的方式将整合好的数据保存到组件goodsinfo上
                this.goodsInfo = new GoodsInfo(res.result.itemInfo, res.result.columns, res.result.shopInfo.services)
                // 3.获取商家信息（通过已整合好的商家信息类）
                console.log(res.result)
                this.shopInfo = new Shop(res.result.shopInfo)
            })
        }
    }
</script>
<style scoped>
</style>
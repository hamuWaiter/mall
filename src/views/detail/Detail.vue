<template>
    <div class="detail">
        <detail-nav-bar class="detail-top-bar"/>
        <scroll 
        class="detail-scroll"
        :scrollMode="3"
        ref="detailScroll">
            <detail-swiper :images="topImages"/>
            <detail-goods-info :goods-info="goodsInfo"/>
            <detail-shop-info :shop-info="shopInfo"/>
            <detail-info :detail-info="detailInfo"
            @loadOver="loadOver"/>
            <detail-params :detail-params="detailParams"/>
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
            </div>
        </scroll>
    </div>
</template>
<script>
    import DetailNavBar from "./childComponents/DetailNavBar"
    import DetailSwiper from "./childComponents/DetailSwiper"
    import DetailGoodsInfo from "./childComponents/DetailGoodsInfo"
    import DetailShopInfo from "./childComponents/DetailShopInfo"
    import DetailInfo from "./childComponents/DetailInfo"
    import DetailParams from "./childComponents/DetailParams"

    import Scroll from "components/common/scroll/Scroll"

    import {getDetail, GoodsInfo, Shop} from "network/detail"
    export default {
        name: "Detail",
        data() {
            return {
                iid: this.$route.params.id,
                topImages: [],
                goodsInfo: {},
                shopInfo: {},
                detailInfo: {},
                detailParams: {}
            }
        },
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailGoodsInfo,
            DetailShopInfo,
            DetailInfo,
            DetailParams,
            Scroll
        },
        created() {
            getDetail(this.iid).then(res => {
                // 1.获取商品详情页的顶部轮播图数据()
                this.topImages = res.result.itemInfo.topImages
                // 2.通过new的方式将整合好的数据保存到组件goodsinfo上
                this.goodsInfo = new GoodsInfo(res.result.itemInfo, res.result.columns, res.result.shopInfo.services)
                // 3.获取商家信息（通过已整合好的商家信息类）
                this.shopInfo = new Shop(res.result.shopInfo)

                // 4.获取商品详情的图片展示：
                this.detailInfo = res.result.detailInfo

                // 5.获取商品属性
                this.detailParams = res.result.itemParams
                console.log(res.result)
            })
        },
        methods: {
            loadOver() {
                // 图片加载完成刷新bscroll重新计算滚动内容高度
                this.$refs.detailScroll.refresh()
            }
        }
    }
</script>
<style scoped>
.detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
    overflow: hidden;
}
 .detail-top-bar{
     position: relative;
     z-index: 10;
     background-color: #fff;
 }

/* .detail-top-bar{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
    background-color: #fff;
} */
.detail-scroll{
    height: calc(100% - 44px);
}
</style>
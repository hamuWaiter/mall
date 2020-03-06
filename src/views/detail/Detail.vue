<template>
    <div class="detail">
        <detail-nav-bar 
        class="detail-top-bar" 
        ref="detailTopBar"
        @viewNavItem="viewNavItem"/>
        <scroll 
        class="detail-scroll"
        :scrollMode="3"
        @areaScroll="detailScroll"
        ref="detailScroll">
            <detail-swiper :images="topImages"/>
            <detail-goods-info :goods-info="goodsInfo"/>
            <detail-shop-info :shop-info="shopInfo"/>
            <detail-info :detail-info="detailInfo"
            @loadOver="loadOver"/>
            <detail-params :detail-params="detailParams" ref="detailParams"/>
            <detail-comment :comment-data="commentData" ref="detailComment"/>
            <detail-goods-list :detail-goods="goodsRecommand" ref="detailRecommand"/>
        </scroll>
        <go-top @click.native="goTopClick" v-show="goTopShow"></go-top>
        <shop-car @addShopCar="addItem"/>
    </div>
</template>
<script>
    import DetailNavBar from "./childComponents/DetailNavBar"
    import DetailSwiper from "./childComponents/DetailSwiper"
    import DetailGoodsInfo from "./childComponents/DetailGoodsInfo"
    import DetailShopInfo from "./childComponents/DetailShopInfo"
    import DetailInfo from "./childComponents/DetailInfo"
    import DetailParams from "./childComponents/DetailParams"
    import DetailComment from "./childComponents/DetailComment"
    import DetailGoodsList from "./childComponents/DetailGoodsList"

    import Scroll from "components/common/scroll/Scroll"
    import ShopCar from "components/common/addshopcar/AddShopCar"
    import GoTop from "components/content/gotop/GoTop";


    import {getDetail, getRecommand, GoodsInfo, Shop} from "network/detail"
    import { Toast } from 'mint-ui';

    export default {
        name: "Detail",
        data() {
            return {
                iid: this.$route.params.id,
                topImages: [],
                goodsInfo: {},
                shopInfo: {},
                detailInfo: {},
                detailParams: {},
                commentData: {},
                goodsRecommand: [],

                // 用于记录状态的变量：
                currentImgIdx: 0,
                currentNavIdx: 0,
                // 用于记录topBar item对应距离顶部的offset
                offsetY: [],
                goTopShow: false,//回到顶部相关
            }
        },
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailGoodsInfo,
            DetailShopInfo,
            DetailInfo,
            DetailParams,
            DetailComment,
            DetailGoodsList,
            Scroll,
            ShopCar,
            GoTop
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

                // 6.获取商品评论
                this.commentData = res.result.rate
            })

            getRecommand().then(res => {
                // 获取产品推荐数据
                this.goodsRecommand = res.data.list
            })
        },
        mounted() {
            //1. 监听详情商品推荐图片加载完成
            this.$bus.$on("detailImgOver", () => {
                // 更新图片加载状态
                this.currentImgIdx += 1
                // 所有图片加载完成刷新一下bscroll
                if(this.currentImgIdx === this.goodsRecommand.length) {
                    this.$refs.detailScroll.refresh()

                    //2.图片加载完后获取“商品”，“参数”，“评论”，“推荐”的offsetTop
                    this.offsetY.push(0)
                    this.offsetY.push(this.$refs.detailParams.$el.offsetTop)
                    this.offsetY.push(this.$refs.detailComment.$el.offsetTop)
                    this.offsetY.push(this.$refs.detailRecommand.$el.offsetTop)
                }
            })
            //在这儿通过 this.$refs.detailParams.$el.offsetTop的方式获取距离页面
            // 高度是不行的，获取到的值是undefined，mounted中只适合注册事件，与如
            // 距离顶部距离等不适合直接在这儿做,获取高度最好在如图片加载完成后做

        },
        methods: {
            loadOver() {
                // 图片加载完成刷新bscroll重新计算滚动内容高度
                this.$refs.detailScroll.refresh()
            },
            detailScroll(position) {
            // 1.详情页navBar联动效果
                // ture为向下滑，false为向上
                let currentY = Math.abs(position.y)
                if(currentY > this.offsetY[this.currentNavIdx + 1]) {
                    // 当currentY超过下一个item的offsetY时将index加一
                    this.currentNavIdx += 1
                }else if(currentY < this.offsetY[this.currentNavIdx]) {
                    // 当前currentY小于当前item的offsetY时，index减一
                    this.currentNavIdx -= 1
                }
                this.$refs.detailTopBar.currentIndex = this.currentNavIdx


            // 2.回到顶部显示隐藏切换
                this.goTopShow = Math.abs(position.y) > 1000

            },
            viewNavItem(curIdx) {
                this.currentNavIdx = curIdx
                this.$refs.detailScroll.scrollTo(0, -this.offsetY[curIdx],0)
            },
            goTopClick() {
                // 回到顶部（调用scroll组件的ScrollTo方法）：
                this.$refs.detailScroll.scrollTo(0,0,500)
            },
            addItem() {
                // 添加购物车

                let goodsItem = {}  //收集商品信息
                goodsItem.image = this.topImages[0];
                goodsItem.title = this.goodsInfo.title;
                goodsItem.desc = this.goodsInfo.desc;
                goodsItem.price = this.goodsInfo.realPrice;
                goodsItem.iid = this.iid;

                // 提交mutaions
                this.$store.commit("addGoodsItem", goodsItem)
                // 弹窗
                Toast({
                    message: "添加商品成功！",
                    duration: 1500
                })
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
    height: calc(100% - 44px - 49px);
}
</style>
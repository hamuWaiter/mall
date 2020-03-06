<template>
    <div class="shop-info">
        <div class="shop-icon">
            <img :src="shopInfo.logo" alt="">
            <span>{{shopInfo.name}}</span>
        </div>
        <div class="shop-data">
            <div class="left">
                <div class="sells">
                    <p>{{shopInfo.sells}}</p>
                    <p>总销量</p>
                </div>
                <div class="goods-num">
                    <div>
                        <p>{{shopInfo.goodsCount}}</p>
                        <p>全部宝贝</p>
                    </div>
                </div>
            </div>
            <span class="center"></span>
            <div class="right">
                <div v-for="(item, index) in shopInfo.score" :key="index" class="shop-score">
                    <span>{{item.name}}</span>
                    <span>{{item.score}}</span>
                    <div class="show-score">
                        <span class="low-score" v-if="!item.isBetter">低</span>
                        <span class="high-score" v-else>高</span>
                    </div>
                    <!-- isbetter用于决定显示登记高低 -->
                </div>
            </div>
        </div>
        <div class="visit-shop">
            <button>
                进店逛逛
            </button>
        </div>
    </div>
</template>
<script>
    export default {
        name: "DetailShopInfo",
        props: {
            shopInfo: {
                type: Object,
                default() {
                    return {
                        isLoadOver: false
                    }
                }
            }
        },
    }
</script>
<style scoped>
    .shop-info{
        padding: 10px 4px;
        border-bottom: 6px solid #f4f4fb;
    }
    .shop-icon{
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }
    .shop-icon img{
        margin-right: 10px;
        width: 60px;
        border-radius: 50%;
    }
    .shop-data{
        display: flex;
        align-items: center;
        font-size: 12px;
        padding: 0 4px;
    }
    .shop-data .left{
        flex: 5;
    }
    .shop-data .right{
        flex: 5;
    }
    .shop-data .center{
        display: block;
        height: 40px;
        margin: 0 20px;
        border-left: 2px solid darkgray;
    }
    .shop-data .left{
        display: flex;
        text-align: center;
        font-size: 14px;
    }
    .sells{
        flex: 4;
        text-align: left;
    }
    .goods-num{
        flex: 6;
        overflow: hidden;
    }
    .goods-num div{
        float: right;
    }
    .shop-data .right{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .shop-score{
        width: 100%;
        line-height: 1.5em;
        margin: 2px 0;
        display: flex;
    }
    .shop-score span{
        flex: 4;
        text-align: center;
    }
    .shop-score span:first-child{
        text-align: left;
    }
    .show-score{
        flex: 2;
        overflow: hidden;
    }
    .show-score span{
        float: right;
    }
    .low-score,
    .high-score{
        color: #fff;
        padding: 2px;
        border-radius: 4px;
    }
    .low-score{
        background-color: chartreuse;
    }
    .high-score{
        background-color: var(--highlight);
    }
    .visit-shop{
        width: 100%;
        display: flex;
        justify-content: center;
        margin: 20px 0 10px 0;
    }
    .visit-shop button{
        width: 40%;
        border-radius: 8px;
        border: none;
        background-color: #f4f4fa;
        line-height: 2em;
    }
</style>
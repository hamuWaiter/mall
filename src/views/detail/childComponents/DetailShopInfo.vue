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
                    <p>{{shopInfo.goodsCount}}</p>
                <p>全部宝贝</p>
                </div>
            </div>
            <div class="right">
                <div v-for="(item, index) in shopInfo.score" :key="index" class="shop-score">
                    <span>{{item.name}}</span>
                    <span>{{item.score}}</span>
                    <span class="low-score" v-if="!item.isBetter">低</span>
                    <span class="high-score" v-else>高</span>
                    <!-- isbetter用于决定显示登记高低 -->
                </div>
            </div>
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
                    return {}
                }
            }
        },
        created() {
            console.log(this.shopInfo)
        }
    }
</script>
<style scoped>
    .shop-info{
        padding: 10px 4px;
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
    }
    .shop-data .left,
    .shop-data .right{
        width: 50%;
        font-size: 14px;
    }
    .shop-data .left{
        padding: 0 10px;
        display: flex;
        text-align: center;
        border-right: 3px solid #f2f2f2;
    }
    .shop-data .left>div{
        flex: 1;
    }
    .shop-data .right{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .shop-score{
        line-height: 1.5em;
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
</style>
<template>
    <div class="shop-car">
        <div class="left-part">
            <div class="seriver">
                <img src="~assets/img/detail/shopcar/seriver.svg" alt="">
                <p>客服</p>
            </div>
            <div class="shop">
                <img src="~assets/img/detail/shopcar/shop.svg" alt="">
                <p>店铺</p>
            </div>
            <div class="star">
                <img src="~assets/img/detail/shopcar/star.svg" alt="">
                <p>收藏</p>
            </div>
        </div>
        <div class="right-part">
            <div class="add-to-shopcar" @click="addGoods">加入购物车</div>
            <div class="buy">购买</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "AddShopCar",
        methods: {
            addGoods() {
                this.$emit("addShopCar")
            }
        }
    }
</script>
<style scoped>
.shop-car{
    position: relative;
    z-index: 10;
    height: 49px;
    background-color: red;
    display: flex;
}
.left-part,
.right-part{
    flex: 1;
}
.left-part{
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 14px;
    background-color: #fdfdfd;
}
.left-part>div{
    text-align: center;
}
.right-part{
    display: flex;
    text-align: center;
    font-size: 14px;
}
.right-part>div{
    flex: 1;
    line-height: 49px;
}
.add-to-shopcar{
    background-color: #fdda12;
}
.buy{
    color: #fff;
    background-color: #fc7699;
}

</style>
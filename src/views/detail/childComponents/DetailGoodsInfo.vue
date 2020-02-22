<template>
    <div class="detail-goods-info">
        <p class="title">{{goodsInfo.title}}</p>
        <div class="price">
            <span class="c-price">{{goodsInfo.newPrice}}</span>
            <del class="o-price">{{goodsInfo.oldPrice}}</del>
            <span class="discount">{{goodsInfo.discount}}</span>
        </div>

        <!--有问题。。。 -->
        <div class="sale">
            <span v-for="(item, index) in goodsInfo.columns" :key="index">
                {{item}}
            </span>
        </div>
        <div class="service">
            <div class="serive-item" 
            v-for="(item,index) in goodsInfo.services" :key="index">
                <img :src="item.icon" alt="">
                <span>{{item.name}}</span>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        name: "DetailGoodsInfo",
        data() {
            return {
            }
        },
        props: {
            goodsInfo: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        components: {
        },
    }
</script>
<style scoped>
.detail-goods-info{
    padding: 0 4px;
    padding-bottom: 20px;
    border-bottom: 6px solid #f2f2f2;
}
.title{
    margin: 10px 0;
    font-size: 16px;
    font-weight: bold;
}
.c-price{
    color: var(--highlight);
    font-size: 17px;
}
.o-price{
    font-size: 14px;
    margin: 0 6px;
}
.discount{
    background-color: var(--highlight);
    border-radius: 10px;
    padding: 4px 8px;
    color: #fff;
    font-size: 12px;
}
.sale{
    display: flex;
    margin: 20px 0;
    font-size: 12px;
    font-weight: blod;
}
.sale span{
    flex: 1;
}
.sale span:nth-child(2){
    text-align: center;
}
.sale span:nth-child(3){
    text-align: right;
}

.service{
    display: flex;
    font-size: 12px;
}
.service .serive-item{
    flex: 1;
    display: flex;
    justify-content: center;
}
.service .serive-item:first-child{
    justify-content: flex-start;
}
.service .serive-item:last-child{
    justify-content: flex-end;
}
.serive-item img{
    width: 14px;
}
.serive-item span{
    font-size: 12px;
}
</style>
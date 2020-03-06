<template>
    <div class="goods-item" ref="goodsItem">
        <div class="select-icon" @click="selectItem">
            <span
            class="unselect"
            v-if="!isSelected" 
            :class="{select: !isSelected}"></span>
            <img class="select" v-else src="~assets/img/shopcar/select.svg" alt="">
        </div>
        <div class="goods-info">
            <div class="img">
                <img :src="item.image" alt="">
            </div>
            <div class="info" ref="info">
                <p class="title">{{item.title}}</p>
                <p class="desc">{{item.desc}}</p>
                <div class="price-and-number">
                    <span class="price">¥{{item.price}}</span>
                    <span class="number">×{{item.count}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "GoodsItem",
        data() {
            return {
                isSelected: false,//商品选中相关
                itemPrice: this.item.count*this.item.price//该商品总价
            }
        },
        props: {
            item: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        methods: {
            selectItem() {
                // 1.切换icon
                this.isSelected = !this.isSelected
                // 2.发送点击事件并将勾选状态传给父组件执行相应操作
                this.$emit("choicedCurItem", {
                    isSelected: this.isSelected,//选中状态
                    price: this.itemPrice//商品总价
                })
            }
        }
    }
</script>
<style scoped>
.goods-item{
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 4px solid #eeedee;
}
.select-icon{
    position: relative;
    width: 24px;
    margin: 8px;
}
.select-icon select,
.select-icon .unselect{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.select-icon .unselect{
    width: 20px;
    height: 20px;
    border: 1px solid #fc8b99;
    border-radius: 2px;
}
.goods-info{
    width: calc(100% - 40px);
    display: flex;
}
.goods-info img{
    width: 90px;
    border-radius: 10px;
}
.info{
    width: calc(100% - 120px);
    position: relative;
    margin: 0 10px;
}
.info .title,
.info .desc{
    width:100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-top: 10px;
}
.info .title{
    font-weight: 600;
}
.price-and-number{
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: space-between;
    bottom: 0.5em;
}
.price{
    color: #fc8b99;
}
</style>
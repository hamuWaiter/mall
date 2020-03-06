<template>
    <div class="total-price">
        <div class="left-part">
            <span class="select-all" @click="selectAll"></span>
            <span :class="{hidden: isShow}">全选</span>
            <span :class="{hidden: !isShow}">反选</span>
            <span class="total">合计:</span>
            <span class="price">¥{{totalPrice.toFixed(2)}}</span>
        </div>
        <div class="right-part">
            <span class="settlement">去结算</span>
            <span class="number">({{selectedNumber}})</span>
        </div>
    </div>
</template>
<script>
     export default {
        name: "TotalPrice",
        data() {
            return {
                isShow: false,//用于“全/反选”文字显示隐藏
            }
        },
        props: {
            selectedNumber: {
                type: Number,
                default: 0
            },
            totalPrice: {
                type: Number,
                default: 0
            }
        },
        methods: {
            selectAll() {
                // 发出事件
                this.$emit("selectAllGoods",this.isShow)
                // 切换选项的文字
                this.isShow = !this.isShow
            }
        }
     }
</script>
<style scoped>
.total-price{
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #eeedef;
}
.left-part{
    font-size: 14px;
    display: flex;
    align-items: center;
}
.select-all{
    margin-left: 10px;
    margin-right: 8px;
    width: 20px;
    height: 20px;
    border: 1px solid green;
    border-radius: 50%;
}
.total{
    margin-left: 20px;
}
.price{
    color: #ff5777;
    font-weight: 600;
}
.right-part{
    height: 100%;
    background-color: #ff5100;
    line-height: 40px;
    color: #fff;
    padding: 0 6px;
    font-size: 16px;
}
.number{
    font-size: 14px;
}
.hidden{
    display: none;
}
</style>
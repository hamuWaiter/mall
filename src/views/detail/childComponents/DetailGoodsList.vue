<template>
    <div class="detail-goods-list">
        <goods-list :goods="detailGoods"/>
    </div>
</template>
<script>
import GoodsList from "components/content/goodslist/GoodsList"
export default {
    name: "DetailGoodsList",
    props: {
        detailGoods: {
            type: Array,
            default() {
                return []
            }
        }
    },
    components: {
        GoodsList
    }
}
</script>
<style scoped></style>
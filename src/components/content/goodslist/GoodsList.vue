<template>
  <div class="goods-list">
      <goods-item v-for="(item,index) in goods" :key="index" :goodsItem="item"></goods-item>
  </div>
</template>
<script>
import GoodsItem from "./GoodsItem"
export default {
  name: "GoodsList",
  data() {
      return {

      }
  },
  props: {
    goods: {
        type: Array,
        default() {
            return []
        }
    },
  },
  components: {
      GoodsItem
  },
  methods: {
  }
};
</script>
<style scoped>
    .goods-list{
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }
</style>
<template>
  <div class="goods-item" @click="itemClick">
      <a href="javascript:;">
          <img :src="goodsItem.show.img" @load="imgLoadOver">
      </a>
      <div class="goods-info">
          <p class="title">{{goodsItem.title|filtTitle}}</p>
          <span class="price">¥{{goodsItem.price}}</span>
          <span class="star">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>
<script>

export default {
  name: "GoodsItem",
  props: {
      goodsItem: {
          type: Object,
          default() {
              return {}
          }
      }
  },
  methods: {
      imgLoadOver() {
        //   console.log("loadover");
        // 发射时间到事件总线，进而跨层级在home组件中监听，
        // 再在回调中访问home子组件scroll的new BScroll实例的refresh
        // 方法
          this.$bus.$emit("curentImgOver");
      },
      itemClick() {
        //点击跳转到详情页(并将商品id(对应goodsitem中的iid)
        // 传出去用于发送详情页的数据请求)
        this.$router.push("/detail/" + this.goodsItem.iid)
        console.log("click");
      }
  },
  filters: {
      filtTitle(msg) {
          return msg.substr(0,20) + "..."
      }
  }
};
</script>
<style scoped>
    .goods-item{
        width: 48%;
        position: relative;
        padding-bottom: 60px;
    }
    .goods-item img{
        width: 100%;
    }
    .goods-info{
        font-size: 14px;
        text-align: center;
        position:absolute;
        bottom: 2px;
    }
    .goods-info .title{
        margin-bottom: 6px;
    }
    .goods-info .price{
        margin-right: 8px;
        color: var(--highlight);
    }
    .goods-info .star::before {
        content: "";
        padding: 6px;
        background: url(~assets/img/common/goodslist/star.svg) center center no-repeat;
    }
</style>
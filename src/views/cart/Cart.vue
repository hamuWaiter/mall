<template>
  <div class="cart">
    <nav-bar class="shop-car">
      <h4 slot="center">购物车({{shopCarLength}})</h4>
    </nav-bar>
    <scroll class="shop-car-scroll">
      <goods-item
        v-for="(item, index) in goodsList"
        :item="item"
        :key="index"
        ref="goodsItem"
        @choicedCurItem="changeNum"
      />
    </scroll>
    <total-price
      class="price-aboult"
      @selectAllGoods="selectAll"
      :total-price="totalPrice"
      :selected-number="goodsItemNumber"
    />
  </div>
</template>
<script>
import goodsItem from "./childComponents/GoodsItem";
import TotalPrice from "./childComponents/TotalPrice";

import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import { mapGetters } from "vuex";
export default {
  name: "Cart",
  data() {
    return {
      goodsList: this.$store.state.shopCar,
      goodsItemNumber: 0,
      totalPrice: 0
    };
  },
  components: {
    goodsItem,
    TotalPrice,
    NavBar,
    Scroll
  },
  computed: {
    // 获取getters中的方法（使用时更简单，
    // 不用this.$store.getters.shopCarLength而是直接shopCarLength使用即可）
    ...mapGetters(["shopCarLength"])
  },
  methods: {
    /*
    **子组件发出的
    **
    **/
    changeNum(para) {
      if (para.isSelected) {
        // 选中加一
        this.goodsItemNumber += 1;
        this.totalPrice += para.price;
      } else {
        // 取消减一
        this.goodsItemNumber -= 1;
        this.totalPrice -= para.price;
      }
    },
    selectAll(curOpt) {

      if (this.$refs.goodsItem) {
        //1. 初始化数量与价格
          this.goodsItemNumber = 0
          this.totalPrice = 0
        // 2. 遍历所有goodsItem组件
        this.$refs.goodsItem.forEach(item => {
        
        // 3.根据curOpt判断是全选还是反选修改组件的isSelected属性控制是否选中
        if(!curOpt){
            // 全选
            item.isSelected = true;
        }else {
            // 反选
            item.isSelected = !item.isSelected;
        }

        //4. 更新总价格与总数量
          if (item.isSelected) {
            this.goodsItemNumber += 1; //算选中的总数
            this.totalPrice += item.itemPrice;
          } 
        });
      }
    },
    
    /*
    **本组件的事件方法
    **
    **/
  }
};
</script>
<style scoped>
.cart {
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  position: relative;
}
.shop-car {
  background-color: #ff5777;
  color: #fff;
}
.shop-car-scroll {
    /* bgScroll高度：全屏高减去 navbar 组件高减去 tabbar 组件高减去 全选/结算 组件高 */
  /* height: calc(100% - 44px - 44px -40px); */
  height: calc(100% - 128px);
  overflow: hidden;
}
.price-aboult {
  position: absolute;
  bottom: 49px;
}
</style>
<template>
  <div class="home">
    <!-- 使用组件时给个class来给样式
        不在组件内写样式，因为有可能不同的页面使用
    该组件时背景色之类的样式可能不一样-->
    <nav-bar class="home-nav"><h4 slot="center">购物街</h4></nav-bar>
    <tab-control
        class="tab-control-copy"
        :class="{fixed: isTabFixed}"
        ref="tabControlCopy"
        :titles="['流行','新款','精选']"
        :goods-types="['pop','new','sell']"
        @goodsType="changeGoodsType"
      ></tab-control>
    <scroll 
    class="content" 
    ref="scroll" 
    :scrollMode="3" 
    @areaScroll="scroll"
    @loadImg="loadImg">
      <!-- better-scroll重构项目：（移动端滑动卡顿问题解决方案） -->
      <home-swiper :banners="banners" class="home-swiper" @swipeLoadOver="getOffetTop"></home-swiper>
      <recommand :recommands="recommands"></recommand>
      <feature-view></feature-view>
      <tab-control
        ref="tabControl"
        :titles="['流行','新款','精选']"
        :goods-types="['pop','new','sell']"
        @goodsType="changeGoodsType"
      ></tab-control>
      <goods-list :goods="goods[goodsType].list"></goods-list>
    </scroll>
    <go-top @click.native="goTopClick" v-show="goTopShow"></go-top>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goodslist/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import GoTop from "components/content/gotop/GoTop";

import {debounce} from "common/utils"

import HomeSwiper from "views/home/homecomponents/HomeSwiper";
import Recommand from "views/home/homecomponents/Recommend";
import FeatureView from "views/home/homecomponents/FeatureView";
import { homeMultidata, homeGoods } from "network/home.js";
export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommands: [],
      goods: {
        pop: { page: 0, list: [] },
        sell: { page: 0, list: [] },
        new: { page: 0, list: [] }
      },
      goodsType: "pop",
      goTopShow: false,
      topDistance: 0,
      isTabFixed: false,
      bscrollY: 0
    }
  },
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    GoTop,

    HomeSwiper,
    Recommand,
    FeatureView
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop"); //获取“流行”数据
    // this.getHomeGoods("pop");//获取“流行”数据+30
    this.getHomeGoods("new"); //获取“新款”数据
    this.getHomeGoods("sell"); //获取“精选”数据
  },
  activated() {
    // 进入首页时将滚动区域与的内容位置设置到上一次离开时
    // 的状态
    this.$refs.scroll.scrollTo(0, this.bscrollY, 0)
    this.$refs.scroll.refresh() // 刷新一下（避免滚动出现莫名其妙问题）
  },
  deactivated() {
    // 记录离开时滚动到的位置
    this.bscrollY =this.$refs.scroll.scrollY()
  },
  mounted() {
// 1.上拉加载更多的性能优化：

    // 防抖函数，用于处理过于频繁的refresh，
    // 这里使用了debounce，在这儿使用所以debounce中return的
    // 函数this的指向与这儿的this一致都是vue实例
    const dbounceRefresh = debounce(this.$refs.scroll.refresh,100)

    // 监听跨层级组件中图片是否加载完成，、
    // 加载完后调用scroll得出refresh方法刷新一下才能流畅滚动
    this.$bus.$on("curentImgOver",() => {
      dbounceRefresh()
      // this.$refs.scroll.refresh()
    })
  },
  methods: {
/*
*业务相关方法：
*/
    changeGoodsType(data,index) {
      // 1.用于在点击tabcontrol时改变home组件的商品类型来更改当前显示。
      this.goodsType = data;
      // 2.统一两个使用tabcontrol组件的地方的显示
      this.$refs.tabControl.currentIndex = index
      this.$refs.tabControlCopy.currentIndex = index
    },
    goTopClick() {
      // 回到顶部（调用scroll组件的ScrollTo方法）：
     this.$refs.scroll.scrollTo(0,0,500)
    },
    scroll(position) {
      // 1.判断滚动高度是否大于1000，从而改变gotop组件的显示隐藏
      this.goTopShow = Math.abs(position.y) > 1000
      // 2.看是否tabCtrol即将滚出页面,better-scroll做固定定位非常难，
      //   所以拖过在scroll区域外copy一份scroll内的tabcontrol组件，
      //   一开始隐藏,当大于某个值时使其显示即可通过障眼法实现固定定位的效果---------------
      this.isTabFixed = Math.abs(position.y) > this.topDistance ? true : false
    },
    loadImg() {
      // 上拉加载一批数据
      this.getHomeGoods(this.goodsType)
    },
    getOffetTop() {
      // 1.当轮播图加载完成，轮播图组件发射时间给home组件
      //   ，获取tabCtrol距离顶部的距离并记录.
      this.topDistance = this.$refs.tabControl.$el.offsetTop
      // 2.  再拿到滚动参数（本组件方法scroll中已经拿到了）
      //     再判断是否大于此高度，如果大于就将tabControl的
      //     position改为fixed
    },
/*
*数据获取相关方法：
*/
    getHomeMultidata() {
      //获取首页简单的数据
      homeMultidata().then(res => {
        // 数据请求：
        this.banners = res.data.banner.list;
        this.recommands = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      //传入需要请求的数据类型（需要传参）
      let page = this.goods[type].page + 1;
      // 每次执行此函数都自动将page加一（30条数据下拉完后再请求30条数据）
      homeGoods(type, page).then(res => {
        // concat方法会返回一个新数组不会改变原数组
        // 往原数组中新增30条数据
        this.goods[type].list = this.goods[type].list.concat(res.data.list);
        // 更新现有page的值
        this.goods[type].page = page;
      });
    },
  }
};
</script>
<style scoped>
.home{
  height: 100vh;
}
.home-nav {
  /* background-color: transparent; */
  background-color: var(--highlight);
  color: #fff;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.tab-control-copy{
  position: absolute;
  z-index: 10;
  display: none;
}
.content{
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.fixed{
  display: flex;
  /* position: fixed;
  top: 634px;
  left: 0px;
  right: 0px;
  z-index: 10; */
}
</style>
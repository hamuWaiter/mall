<template>
    <div>
        <tab-bar>
      <tab-bar-item path="/home">
        <img src="~assets/img/common/tabbar/home.svg" alt="" slot="item-icon">
        <img src="~assets/img/common/tabbar/home_active.svg" alt="" slot="item-active-icon">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img src="~assets/img/common/tabbar/category.svg" alt="" slot="item-icon">
        <img src="~assets/img/common/tabbar/category_active.svg" alt="" slot="item-active-icon">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/shopcart">
        <img src="~assets/img/common/tabbar/shopcart.svg" alt="" slot="item-icon">
        <img src="~assets/img/common/tabbar/shopcart_active.svg" alt="" slot="item-active-icon">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <img src="~assets/img/common/tabbar/profile.svg" alt="" slot="item-icon">
        <img src="~assets/img/common/tabbar/profile_active.svg" alt="" slot="item-active-icon">
        <div slot="item-text">个人</div>
      </tab-bar-item>
    </tab-bar>
    </div>
</template>
<script>
import TabBar from "components/common/tabbar/TabBar"
import TabBarItem from "components/common/tabbar/TabBarItem"
export default {
    name: "MainTabBar",
    data() {
        return {

        }
    },
    components: {
      TabBar,
      TabBarItem
    }
}
</script>
<style scoped>

</style>
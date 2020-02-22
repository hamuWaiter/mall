<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/content/maintabbar/MainTabBar"
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
/* 引用base.css */
@import "./assets/css/base.css";
</style>

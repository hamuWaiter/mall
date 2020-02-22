<template>
  <div class="swiper">
    <swipe :auto="4000" :continuous="true" class="home-swiper">
      <swipe-item v-for="item in banners" :key="item.acm">
        <a :href="item.link">
          <img :src="item.image" @load="swipeLoad" />
        </a>
      </swipe-item>
    </swipe>
  </div>
</template>
<script>
import { Swipe, SwipeItem } from "mint-ui";
export default {
  name: "HomeSwiper",
  data() {
    return {
      isLoaded: false
    }
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
      Swipe,
      SwipeItem
  },
  methods: {
    swipeLoad() {
      if(!this.isLoad) {
        this.$emit("swipeLoadOver")
        this.isLoad = !this.isLoad
      }
    }
  }
};
</script>
<style scoped>
.home-swiper {
  height: 166px;
}
.home-swiper img {
  display: block;
  width: 100%;
}
.home-swiper /deep/ .mint-swipe-indicator{
    opacity: 0.6;
}
.home-swiper /deep/ .mint-swipe-indicator.is-active{
    background-color: red;
    opacity: 0.6;
}
</style>
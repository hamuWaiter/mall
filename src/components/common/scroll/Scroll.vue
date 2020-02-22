<template>
  <!-- better-scroll封装：
        可以降低因直接使用better-scroll而产生的依赖性问题
        ，只有scroll组件依赖了better-scroll，其他组件通过scroll组件动态传入内容显示即可，
        传入的区域都是可滚动的，使用时给scroll加一个class给一个高度即可，如果后面要替换框架
  直接在这儿替换就行，不用到每一个使用better-scroll的地方都替换-->
  <div class="wrapper" ref="wrapper">
    <div>
        <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    }
  },
  props:{
      scrollMode: Number,
      default: 0//默认不监听滚动
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
    //   可能再使用时只需要滚动，不需要实时监听滚动时间，这样会
    // 消耗性能，所以使用时应该传入模式（即probeType的属性值
    // 0/1不会监听，2不监听手离开后的惯性滑动过程，3只要滚动就监听）
      probeType: this.scrollMode,
      pullUpLoad: true
    })

    this.scroll.on("scroll", position => {
    //   console.log(position);
        this.$emit("homeScroll",position)
        //将滚动过程中的位置参数传给home组件使用，
        // 用于决定回到顶部组件的显示隐藏
    })

    this.scroll.on("pullingUp", () => {
      // 每次上拉时发送事件到home组件执行home组件的getHomeGoods方法
      // 请求更多的数据
        this.$emit("loadImg")
        // 表示当前上拉动作完成，调用此方法才能在下一次上拉时进入此回调
        this.scroll.finishPullUp()
    })
  },
  methods: {
    //封装思想
    scrollTo(x, y, time) {
      this.scroll.scrollTo(x, y, time);
    },
    refresh() {
      this.scroll.refresh();
    },
    scrollY() {
      return this.scroll.y
    }
  }
};
</script>
<style scoped>
</style>
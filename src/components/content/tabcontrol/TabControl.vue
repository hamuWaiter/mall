<template>
  <div class="tab-control">
    <div
      v-for="(item,index) in titles"
      :key="item"
      class="tab-control-item"
      @click="itemClick(index)"
      :class="{active: currentIndex === index}"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0
    };
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    },
    goodsTypes: {
      type: Array,
      dafault() {
        return [];
      }
    }
  },
  computed: {
    typeChange() {
      return;
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      // currentIndex用于解决两个使用tab-control组件的地方显示不一致的问题
      this.$emit("goodsType", this.goodsTypes[index],this.currentIndex);
    }
  }
};
</script>
<style scoped>
.tab-control {
  width: 100%;
  display: flex;
  text-align: center;
  height: 44px;
  line-height: 44px;
  font-size: 15px;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span {
  display: inline;
  padding-bottom: 5px;
}
.active {
  color: var(--highlight);
}
.active span {
  border-bottom: 2px solid red;
}
</style>
<template>
  <div class="recommend">
    <div v-for="item in recommands" :key="item.acm" class="recommend-item">
        <a :href="item.link">
            <img :src="item.image" alt="">
            <p>{{item.title}}</p>
        </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "Recommend",
  data() {
    return {

    }
  },
  props: {
      recommands: {
          type: Array,
          default() {
              return []
          }
      }
  },
  components: {
  },
};
</script>
<style scoped>
    .recommend{
        display: flex;
        text-align: center;
        font-size: var(--font-size);
        border-bottom: 8px solid rgba(100, 100, 100, .1);
        padding-bottom: 10px;
    }
    .recommend-item{
        flex: 1;
    }
    .recommend img{
        width: 65px;margin: 10px 0px 4px 0px;
    }
</style>
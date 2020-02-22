<template>
    <div class="tab-bar-item" @click="itemClick">
        <div v-if="!isActive">
            <slot name="item-icon"></slot>
        </div>
        <div v-else>
            <slot name="item-active-icon"></slot>
        </div>
        <div :style="colorStyle" class="text">
            <slot name="item-text"></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: "TabBar",
        data() {
            return {
            }
        },
        props:{
            path: {
                type: String
            },
            color: {
                type: String,
                default: "red"
            }
        },
        computed: {
            isActive() {
                return this.$route.path.indexOf(this.path) !== -1;
            },
            colorStyle() {
                // 可传入颜色控制文字颜色，默认红
                return this.$route.path.indexOf(this.path) !== -1 ? {color:this.color}:{};
            }
        },
        methods: {
            itemClick() {
                this.$router.push(this.path)
                // console.log(this.$route.path)
            }
        }
    }
</script>
<style scoped>
.tab-bar-item{
    padding-top: 2px;
    flex: 1;
    text-align: center;
    height: 49px;
    /* background-color: #f2f2f2; */
    background-color: var(--bgc);
}
.tab-bar-item img{
    height:24px;
    margin: 0 auto;
}
.text{
    font-size: 14px;
}
</style>
<template>
    <div class="detail-nav-bar">
        <nav-bar>
            <div slot="left" @click="back">
                <img src="~assets/img/detail/back/back.svg" class="back-img">
            </div>
            <div slot="center" class="item-box">
                <div class="title-item"
                :class="{active: index === currentIndex}" 
                v-for="(item,index) in titles" 
                :key="index"
                @click="itemClick(index)">
                {{item}}</div>
            </div>
        </nav-bar>
    </div>
</template>
<script>
    import NavBar from "components/common/navbar/NavBar"
    export default {
        name: "DetailNavBar",
        data() {
            return {
                titles: ['商品','参数','评论','推荐'],
                currentIndex: 0
            }
        },
        components: {
            NavBar
        },
        methods: {
            itemClick(index) {
                this.currentIndex = index
                // 将当前的index传给父组件进行跳转相关操作
                this.$emit("viewNavItem",this.currentIndex)
            },
            back() {
                this.$router.back()
            }
        }
    }
</script>
<style scoped>
.back-img{
    margin-top: 10px;
    height: 20px;
}
.item-box{
    display: flex;
    font-size: 14px;
}
.title-item{
    flex: 1;
}
.active{
    color: var(--highlight);
}
</style>
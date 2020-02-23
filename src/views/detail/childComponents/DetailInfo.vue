<template>
    <div class="detail-info">
        <p class="title">{{detailInfo.desc}}</p>
        <div class="images">
            <img v-for="(item, index) in detailInfo.detailImage[0].list"
             :key="index" :src="item" @load="imgLoad">
        </div>
    </div>
</template>
<script>
    export default {
        name: "DetailInfo",
        data() {
            return {
                currentImg: 0
            }
        },
        props: {
            detailInfo: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        methods: {
            imgLoad() {
                this.currentImg += 1;
                if(this.currentImg === this.detailInfo.detailImage[0].list.length) {
                    this.$emit("loadOver");
                }
            }
        }
    }
</script>
<style scoped>
.detail-info{
    padding: 0 6px;
    padding-top: 20px;
}
.title{
    font-weight: blod;
}
.images{
    width: 100%;
}
img{
    width: 100%;
}
</style>
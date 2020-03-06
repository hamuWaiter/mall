<template>
    <div class="detail-comment" v-if="isLoadOver">
        <div class="title">
            <span>用户评论</span>
            <span>更多</span>
        </div>
        <div class="comment-box">
            <div class="user-data">
                <img :src="commentData.list[0].user.avatar" alt="">
                <span>{{commentData.list[0].user.uname}}</span>
            </div>
            <div class="content">
                <p>{{commentData.list[0].content}}</p>
            </div>
            <div class="public-time">
                <span>{{commentData.list[0].created | showDate}}</span>
                <span class="goods-style">{{commentData.list[0].style}}</span>
            </div>
            <div class="images">
                <img v-for="(item, index) in commentData.list[0].images" 
                :src="item" :key="index" alt="">
            </div>
        </div>
    </div>
</template>
<script>
 export default {
     name: "DetailComment",
     data() {
         return {
             isLoadOver: false
         }
     },
     props: {
         commentData: {
             type: Object,
             default() {
                 return {}
             }
         }
     },
     watch: {
         commentData() {
             if(Object.keys(this.commentData).length !==0) {
                 this.isLoadOver = !this.isLoadOver
             }
         }
     }
 }
</script>
<style scoped>
.detail-comment{
    padding: 20px 6px;
}
.title{
    overflow: hidden;
    font-size: 14px;
    padding-bottom: 20px;
    border-bottom: 6px solid #f4f4fb;
}
.title span:first-child{
    float: left;
}
.title span:last-child{
    float: right;
}
.user-data{
    padding: 6px 0;
    display: flex;
    align-items: center;
}
.user-data img{
    width: 40px;
    margin-right: 6px;
}
.content{
    font-size: 14px;
    line-height: 1.5em;
    color: #666666;
}
.public-time{
    font-size: 14px;
    line-height: 2em;
    color: #bebdbe;
}
.goods-style{
    margin-left: 8px;
}
.images{
    display: flex;
    align-items: flex-start;
}
.images img{
    width: 30%;
    margin-right: 4px;
}
</style>
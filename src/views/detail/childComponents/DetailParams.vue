<template>
    <div class="detail-prams" v-if="isLoadOver">
        <div class="size-aboult">
            <table class="table">
                <tr v-for="(item, index) in detailParams.rule.tables[0]"
                :key="index">
                    <td v-for="(cItem, cIndex) in item" :key="cIndex">{{cItem}}</td>
                </tr>
            </table>
        </div>
        <div class="other-aboult">
            <table class="table">
                <tr v-for="(item, index) in detailParams.info.set"
                :key="index">
                <td class="name">{{item.key}}</td>
                <td class="value">{{item.value}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
 export default {
     name: "DetailParams",
     data() {
         return {
             isLoadOver: false
         }
     },
     props: {
         detailParams: {
             type: Object,
             default() {
                 return {}
             }
         }
     },
     watch: {
         detailParams() {
             if(Object.keys(this.detailParams).length !==0) {
                 this.isLoadOver = !this.isLoadOver
             }
         }
     }
 }
</script>
<style scoped>
.detail-prams{
    padding: 20px 6px;
    font-size: 14px;
    border-bottom: 6px solid #f4f4fb;
}
table,
tr,
td{
    display: inline-block;
}
table{
    width: 100%;
}
table tr{
    width: 100%;
    line-height: 2.5em;
    border-bottom: 2px solid #f7f6f7;
    display: flex;
}
table td{
    flex: 1;
}

.other-aboult .name{
    flex: 2;
}
.other-aboult .value{
    padding-left: 10%;
    flex: 8;
    color: var(--highlight);
}
</style>
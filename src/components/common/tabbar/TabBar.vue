<template>
    <div class="tab-bar">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: "TabBar",
        data() {
            return {

            }
        },
    }
</script>
<style scoped>
.tab-bar{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    box-shadow: 0px -2px 2px rgba(100,100,100,.1);
}
</style>
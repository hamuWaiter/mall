<template>
    <div>
        <h1>Category</h1>
        <p>{{category}}</p>
    </div>
</template>
<script>
    import {getCategroy} from "network/category.js";
    export default {
        name: "Category",
        data() {
            return {
                category: null
            }
        },
        created() {
            getCategroy().then(res => {
                this.category = res
            })
        }
    }
</script>
<style scoped>
</style>
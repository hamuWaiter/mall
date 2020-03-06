// 1.引包
import Vue from "vue"
import Vuex from "vuex"

// 2.安装插件
Vue.use(Vuex)

// 3.创建store对象
const store = new Vuex.Store({
    state: {
        shopCar: [],//购物车商品列表
    },
    mutations: {
        addGoodsItem(state, payload) {
            let goodsItem = payload  //用一个临时变量来存储当前的商品

            // 在购物车中查找是否有该商品，find函数在有该商品时返回该商品，没有则返回undefined
            let isExsist = state.shopCar.find(item => {
                if (item.iid == payload.iid) {
                    return true  //返回true表示找到了该商品，
                }
            })

            if (isExsist) {
                isExsist.count += 1  //如果有这个商品，只将商品的数量加一
            } else {
                goodsItem.count = 1
                state.shopCar.push(goodsItem)  //将商品push到购物车中
            }
        },
    },
    getters: {
        shopCarLength(state) {
            return state.shopCar.length
        },
    }
})
// 4.暴露出store对象
export default store
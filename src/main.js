import Vue from 'vue'
import App from './App.vue'
import router from "./router/index"
import store from "./store/index"

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()


// 全局过滤器
Vue.filter("showDate", function(origin) {
  // let fmt = "yyyy-mm-dd hh:mm:ss";
  let da = new Date(origin*1000);  //用自时间元年到现在的秒数新建Date对象
  let daFmt = {
    "year": da.getFullYear(),
    "month": (da.getMonth() + 1).toString().padStart(2, "0"),
    "day": da.getDay().toString().padStart(2, "0")
  }
  return daFmt.year+"-"+daFmt.month+"-"+daFmt.day
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

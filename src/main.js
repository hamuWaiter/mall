import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App.vue'
import router from "./router/index"

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.use(MintUI)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

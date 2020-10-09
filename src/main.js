import Vue from 'vue'
import App from './App.vue'
import { MdButton, MdContent, MdTabs, MdIcon } from 'vue-material/dist/components'

import router from './router'
import VueMaterial from 'vue-material'

Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)
Vue.use(MdIcon)
Vue.use(VueMaterial)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

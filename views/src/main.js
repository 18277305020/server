import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './util/http/axios'

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.use(ViewUI);

Vue.prototype.$http = http
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

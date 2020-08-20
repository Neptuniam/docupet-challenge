import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

// Key Vuejs libraries
import store from './plugins/store'
import routes from './plugins/routes'

// Import UIkit (CSS framework) css and Js
import css from 'uikit/dist/css/uikit.min.css';
import Icons from 'uikit/dist/js/uikit-icons.min.js';
import UIkit from 'uikit/dist/js/uikit.min.js'

// Import Flexbox (grid system)
import flexbox from 'flexboxgrid/dist/flexboxgrid.min.css'


Vue.use(VueRouter)

Vue.use(css)
UIkit.use(Icons);

Vue.use(flexbox)

window.UIkit = UIkit;

const router = new VueRouter({routes});

Vue.config.productionTip = false

Vue.component('CustomInput', require('./components/CustomInput.vue').default);

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')

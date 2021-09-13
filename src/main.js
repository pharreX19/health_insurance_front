import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { router } from './router/router';
// import Vuex from 'vuex';
import {store} from './store/index';
import moment from 'moment';
import Loader from './components/common/Loader.vue'
import Auth from './js/auth';
import Vuelidate from 'vuelidate'

// import { can } from './directive/permissions';
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vuelidate)

Vue.prototype.moment = moment;
// Vue.use(Vuex);

Vue.component('loader', Loader)
let auth = new Auth();

Vue.prototype.$auth = auth;

Vue.filter('capitalize', function(value){
  return (value.charAt(0).toUpperCase() + value.slice(1)).replaceAll('_', ' ')
})

new Vue({
  vuetify,
  router: router,
  store,
  render: h => h(App)
}).$mount('#app')

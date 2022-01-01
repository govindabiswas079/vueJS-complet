import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import VueSweetalert2 from 'vue-sweetalert2';
import VueQrcodeReader from "vue-qrcode-reader";
import VueQrcode from '@chenfengyuan/vue-qrcode';
import VueMask from 'v-mask'
import device from 'vue-device-detector-js'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import '../node_modules/nprogress/nprogress.css';
import 'sweetalert2/dist/sweetalert2.min.css';

import App from './App.vue';
import Create from './components/Create.vue';
import Update from './components/Update.vue';
import Show from './components/Show.vue';
import ShowWithId from './components/ShowWithId.vue';
import OtpVerify from './components/OtpVerify.vue';


Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(VueSweetalert2);
Vue.use(VueQrcodeReader);
Vue.component(VueQrcode.name, VueQrcode);
Vue.use(VueMask)
Vue.use(device)

Vue.config.productionTip = false

const routes = [
  {
    name: 'Create',
    path: '/',
    component: Create
  },
  {
    name: 'Update',
    path: '/update/:id',
    component: Update
  },
  {
    name: 'Show',
    path: '/show',
    component: Show
  },
  {
    name: 'ShowWithId',
    path: '/showwithid/:id',
    component: ShowWithId
  },
  {
    name: 'OtpVerify',
    path: '/otpverify',
    component: OtpVerify
  },
];

const router = new VueRouter({ mode: 'history', routes: routes });

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start()
  }
  next()
});

router.afterEach(() => {
  NProgress.done()
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

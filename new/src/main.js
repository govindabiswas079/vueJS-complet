import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import VueSweetalert2 from 'vue-sweetalert2';
import VueQrcodeReader from "vue-qrcode-reader";
import vrcode from '@ispa.io/vrcode'
import VueQrcode from '@chenfengyuan/vue-qrcode';
import VueMask from 'v-mask'

import App from './App.vue';
import Create from './components/Create.vue';
import Edit from './components/Edit.vue';
import Index from './components/Index.vue';
import Show from './components/Show.vue';
import OtpVerify from './components/OtpVerify';
import QrCode from './components/QrCode';
// import FormValidate from './components/FormValidate';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/nprogress/nprogress.css';
import 'sweetalert2/dist/sweetalert2.min.css';


Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(VueSweetalert2);
Vue.use(VueQrcodeReader);
Vue.component('vrcode', vrcode);
Vue.component(VueQrcode.name, VueQrcode);
Vue.use(VueMask)

Vue.config.productionTip = false

const routes = [
  {
    name: 'Create',
    path: '/create',
    component: Create
  },
  {
    name: 'Edit',
    path: '/edit/:id',
    component: Edit
  },
  {
    name: 'Index',
    path: '/index',
    component: Index
  },
  {
    name: 'Show',
    path: '/show/:id',
    component: Show
  },
  {
    name: 'OtpVerify',
    path: '/otpverify',
    component: OtpVerify
  },
  {
    name: 'QrCode',
    path: '/qrcode',
    component: QrCode
  },
  /* {
    name: 'FormValidate',
    path: '/formvalidate',
    component: FormValidate
  }, */
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
}).$mount('#app');
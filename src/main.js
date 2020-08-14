import Vue from 'vue';
import App from './App';
import home from './pages/home/index.vue';
Vue.component('home', home);

import my from './pages/my/index.vue';
Vue.component('my', my);

import call from './pages/call/index.vue';
Vue.component('call', call);

import cuCustom from './colorui/components/cu-custom.vue';
Vue.component('CuCustom', cuCustom);
Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
    ...App
});
app.$mount();

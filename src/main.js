// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'

Vue.config.productionTip = false

Vue.prototype.$axios = axios;

Vue.prototype.Host = '/api'

// 发送请求的拦截器
axios.interceptors.request.use(function(config){
	if(config.method === 'post'){
		config.data = qs.stringify(config.data)
	}
	return config;
},function(error){
	return Promise.reject(error);
});

// 响应数据的拦截器
axios.interceptors.response.use(function(response){
	return response;
},function(error){
	return Promise.reject(error);
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

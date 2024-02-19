import './assets/all.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { defineRule, configure, Form, Field, ErrorMessage } from 'vee-validate'
import * as AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import AOS from 'aos'
import 'aos/dist/aos.css' // You can also use <link> for styles

configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true // 調整為：輸入文字時，就立即進行驗證
})
setLocale('zh_TW')

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

import App from './App.vue'
import router from './router'

const app = createApp(App)

AOS.init()
app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.component('VueLoading', Loading)
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)

app.mount('#app')

import './assets/all.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { defineRule, configure, Form, Field, ErrorMessage } from 'vee-validate'
import * as AllRules from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import * as VeeValidateI18n from '@vee-validate/i18n'

VeeValidateI18n.loadLocaleFromURL('./zh_TW.json')

configure({
  generateMessage: localize('zh_TW'),
  validateOnInput: true // 調整為：輸入文字時，就立即進行驗證
})

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.component('VueLoading', Loading)
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)

app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './assets/css/main.css'
import './assets/css/demo_1/rtl.css'
import './support/mixins'
import './bootstrap'

// import './helper'
// import './vee-validate'
// import './mixins'
import './support/exstintions'

import trans from '@/support/mixins/transMethod.js'

// import ToastErrorMixin from '@/support/mixins/ToastErrorMixin.js'

import GetSettingMixin from '@/support/mixins/GetSettingMixin.js'

import GlobalTabel from './components/global/GlobalTabel.vue'

// import ToastErrorMixin from './support/mixins/ToastErrorMixin.js'

import spliceText from './support/mixins/spliceText.js'

// import ActionButton from '@/components/global/Buttons/ActionButton.vue'
import EditButton from '@/components/global/Buttons/EditButton.vue'
import DeleteButton from '@/components/global/Buttons/DeleteButton.vue'

import GoBackButton from '@/components/global/Buttons/GoBackButton.vue'

// import VueNumberFormat from '@coders-tm/vue-number-format'

// primevue icons
import 'primeicons/primeicons.css'

//vuex
import vuex from 'vuex'

// sentry

import * as Sentry from '@sentry/vue'
Sentry.init({
  dsn: 'https://6e1e936cf384413188c1de8eaaa5717b@o4504242361532416.ingest.sentry.io/4505261630226432',
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router)
    }),
    new Sentry.Replay()
  ],

  tracesSampleRate: 1.0,

  tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],

  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0
})

import 'bootstrap-icons/font/bootstrap-icons.css'

// axios
import axios from 'axios'
import VueAxios from 'vue-axios'

import vueInfiniteScroll from 'vue-infinite-scroll'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
  components,
  directives
})

import BootstrapVue from 'bootstrap-vue-next'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'bootstrap-v4-rtl/dist/css/bootstrap-rtl.css'

const app = createApp(App)
app.mixin(GetSettingMixin)
app.component('GlobalTabel', GlobalTabel)
// app.component('ActionButton', ActionButton)
app.component('GoBackButton', GoBackButton)
app.component('EditButton', EditButton)
app.component('DeleteButton', DeleteButton)

app.use(router)
// app.use(VueNumberFormat, { precision: 4 })
app.mixin(spliceText)
// app.mixin(ToastErrorMixin)
// app.mixin(ToastErrorMixin)
app.mixin(trans)
app.use(vuetify)
app.use(BootstrapVue)
app.use(vueInfiniteScroll)

app.use(VueAxios, axios)

app.use(vuex)
app.mount('#app')

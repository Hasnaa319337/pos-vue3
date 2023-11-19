<template>
  <div>
    <app-header
      :addedItems="addedItems"
      :permissions="permissions"
      @internetState="changeState($event)"
      @sideMenu="toggleMenu($event)"
    ></app-header>
    <div class="d-flex container-fluid page-body-wrapper justify-content-end">
      <AppSidebar style="width: 253px" />

      <main class="main-panel active">
        <div class="content-wrapper content">
          <router-view
            :key="$route.path"
            :settings="settings"
            :language="language"
            :langs="langs"
            :permissions="permissions"
            :sections="sections"
            :section="current_section"
            :online="stateOnline"
            :strings="strings"
            :sideMenu="sideMenuState"
            :user="user"
            :user_language="language"
            :inventories="inventories"
            :providers="providers"
          ></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import AppHeader from './components/global/Header.vue'
import AppFooter from './components/global/Footer.vue'
import AppSidebar from './components/global/Sidebar.vue'
import AppLogin from '@/views/auth/Login.vue'

// import { localize } from 'vee-validate'
// import en from 'vee-validate/dist/locale/en.json'
// import ar from 'vee-validate/dist/locale/ar.json'

import $ from 'jquery'
import { getStorage } from '@/support/mixins'

export default {
  name: 'App',
  data() {
    return {
      info_modal: false,
      isLoggedIn: false,

      sidebars: [],
      sections: [],
      language: getStorage('DEFAULT_LANGUAGE'),
      user: getStorage('user'),
      permissions: getStorage('permissions'),
      languages: getStorage('languages'),
      strings: getStorage('strings'),
      langs: [],
      current_section: {
        id: 0,
        title: '',
        x_title: [
          { language: 'ar', value: '' },
          { language: 'en', value: '' }
        ],
        order: 0,
        parent: 0,
        route: '/',
        slug: 'dashboard'
      },
      settings: [],
      inventories: [],
      providers: [],

      stateOnline: null,
      sideMenuState: false,
      addedItems: 0,
      longitude: '',
      latitude: '',
      code: null
    }
  },
  components: {
    AppHeader,
    AppFooter,
    AppSidebar,
    AppLogin
  },
  mounted() {
    localStorage.setItem('Today', new Date().toLocaleDateString())
    window.scrollTo(0, 0)
    this.setLocation()
    if (localStorage.getItem('accessToken')) {
      this.isLoggedIn = !!localStorage.getItem('accessToken').length
    }
    if (this.isLoggedIn) {
      setTimeout(() => {
        ;(function () {
          let idleDurationSecs = localStorage.getItem('Tokens_Expire') * 60000

          console.log('idleDurationSecs')
          console.log(idleDurationSecs)

          let idleTimeout
          const resetIdleTimeout = function () {
            if (idleTimeout) clearTimeout(idleTimeout)
            idleTimeout = setTimeout(() => {
              localStorage.removeItem('accessToken')
              localStorage.removeItem('userName')
              localStorage.removeItem('userEmail')
              localStorage.removeItem('userID')
              localStorage.removeItem('stringsData')
              window.location.reload()
            }, idleDurationSecs)
          }
          resetIdleTimeout()
          ;['click', 'touchstart', 'mousemove', 'keypress'].forEach((evt) => {
            document.addEventListener(evt, resetIdleTimeout, false)
          })
        })()
      }, 3000)

      this.getLanguages()
      this.getInventories()
      this.getSettings()
      this.getProviders()
      // this.getRoute()

      $('body').fadeIn(500).removeClass('hidden')
    } else {
      $('body').removeClass('rtl')
      $('body').fadeIn(500).removeClass('hidden')
    }
  },

  methods: {
    getInventories() {
      this.axios({
        method: 'GET',
        url: '/api/inventories'
      }).then((res) => {
        this.inventories = res.data.body.inventories.data
        if (this.language !== 'ar') {
          $('body').removeClass('rtl')
        }
      })
    },
    getProviders() {
      this.axios({
        method: 'get',
        url: '/api/providers'
      }).then((res) => {
        this.providers = res.data.body.providers.data
      })
    },
    getSettings() {
      this.loaded = false
      this.axios({
        method: 'get',
        url: '/api/settings'
      })
        .then((res) => {
          this.settings = res.data.body.settings
          window.localStorage.setItem('settings', JSON.stringify(res.data.body.settings))
          const result = this.settings.find((el) => {
            if (el.key === 'tokens_expire') {
              return el.value
            }
          })
          localStorage.setItem('Tokens_Expire', result.value)
        })
        .catch((error) => {
          this.message = error.response.data.message
          this.alertType = 'danger'
          setTimeout(() => {
            this.message = ''
            this.alertType = 'success'
          }, 120000)
        })
    },
    showSidebar(path) {
      const noSidebarPaths = ['/accounts-tree', '/cashier']
      return !noSidebarPaths.includes(path)
    },
    getLanguages() {
      this.axios({
        method: 'get',
        url: '/api/languages'
      })
        .then((res) => {
          if (res.data.status === true) {
            window.localStorage.setItem('languages', JSON.stringify(res.data.body.languages.data))
          }
        })
        .catch((error) => {
          this.code = error.response.data.custom_code
        })
    },

    getRoute() {
      this.axios
        .get('/api/app?route=' + this.$route.path)
        .then((res) => {
          if (res.data.status) {
            this.langs = res.data.languages
            this.getTranslationList()
          }
          if (res.data.message === 'Unauthenticated.') {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userName')
            localStorage.removeItem('userEmail')
            localStorage.removeItem('userID')
            localStorage.removeItem('stringsData')
            window.location.reload()
          }

          localize(this.language == 'en' ? 'en' : 'ar', this.language == 'en' ? en : ar)

          $('body').fadeIn(500).removeClass('hidden')
          ;(function () {
            let idleDurationSecs = 20
            idleDurationSecs = idleDurationSecs * 20

            let idleTimeout
            const resetIdleTimeout = function () {
              if (idleTimeout) clearTimeout(idleTimeout)
              idleTimeout = setTimeout(() => {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('userName')
                localStorage.removeItem('userEmail')
                localStorage.removeItem('userID')
                localStorage.removeItem('stringsData')
                window.location.reload()
              }, idleDurationSecs * 1000)
            }
            resetIdleTimeout()
            ;['click', 'touchstart', 'mousemove', 'keypress'].forEach((evt) => {
              document.addEventListener(evt, resetIdleTimeout, false)
            })
          })()
        })
        .catch((error) => {
          // this.code = error.response.data.custom_code
          console.log(error)
        })
    },

    changeState(e) {
      this.stateOnline = e
    },
    toggleMenu(e) {
      this.sideMenuState = e
    },
    addItem(e) {
      this.addedItems = e
    },
    setLocation() {
      this.longitude = 35.5
      this.latitude = 35.6
      localStorage.setItem('longitude', this.longitude)
      localStorage.setItem('latitude', this.latitude)
    }
  }
}
</script>

<style scoped>
.panel-page {
  height: 100%;

  margin-top: 15px;
}

.question {
  position: fixed !important;
  bottom: 25px !important;
  left: 25px !important;
  font-size: 30px !important;
  background: #d05269 !important;
  color: #fff !important;
  padding: 10px 16px !important;
  line-height: 10px !important;
  border-radius: 50% !important;
  cursor: pointer !important;
  display: none;
}

@media (max-width: 768px) {
  footer {
    display: none;
  }

  .question {
    display: block;
    z-index: 999;
  }

  .popup-content {
    max-width: 90%;
    padding: 15px;
  }
}
</style>

import lodash from 'lodash'
import axios from 'axios'
import { env, getStorage } from '@/support/mixins'
import { setStorage } from '@/support/mixins/setStorage'

window._ = lodash

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */
const host = window.location.hostname.replace('.7lpos.com', '')

console.log(host)

axios.defaults.baseURL = 'https://api-dev.7lpos.com/'
// axios.defaults.baseURL = env('VITE_AXIOS_DEFAULT_BASEURL')
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Accept-Language'] = getStorage('DEFAULT_LANGUAGE', 'ar')
axios.defaults.headers.common['X-Authorization'] =
  '0kbnSUh2SjEShddBbpzyG0htrFXDFLuH8e5WhgvjER9UE6XZdUuDGXigBFSDe789'
// axios.defaults.headers.common['X-Authorization'] = env('VITE_X_AUTHORIZATION')
axios.defaults.headers.common['x-store-name'] = env('VITE_SUBDOMAIN', 'vue-dev')

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken')

window.axios = axios

console.log(axios.defaults.headers.common)

function getTranslationList() {
  axios({
    method: 'GET',
    url: '/api/translation-list'
  })
    .then((res) => {
      if (res.data.status === true) {
        setStorage('DEFAULT_LANGUAGE', res.data.body.language)
        window.localStorage.setItem('translationList', JSON.stringify(res.data.body.translations))
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
getTranslationList()

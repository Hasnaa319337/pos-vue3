<template>
  <nav
    :style="changePasswordForm ? 'z-index: 1060' : ''"
    :class="
      $route.path == '/cashier' ||
      $route.path == '/accounts-tree' ||
      $route.path == '/accounts-to-link'
        ? 'cashier-nav'
        : ''
    "
    class="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex flex-row"
  >
    <div
      v-if="this.message.length"
      class="alert text-center"
      :class="'alert-' + alertType"
      v-html="this.message"
    ></div>
    <div class="navbar-menu-wrapper d-flex align-items-center">
      <div
        class="navbar-brand-wrapper d-flex align-items-top justify-content-start"
        v-if="
          $route.path == '/cashier' ||
          $route.path == '/accounts-tree' ||
          $route.path == '/accounts-to-link'
        "
        :style="
          $route.path == '/cashier' ||
          $route.path == '/accounts-tree' ||
          $route.path == '/accounts-to-link'
            ? 'border-left: none !important'
            : ''
        "
      >
        <router-link class="navbar-brand brand-logo" style="margin: 0 !important" to="/">
          <img
            class="img-fluid"
            style="max-width: 110px !important"
            src="@/assets/images/logo.png"
            alt="logo"
          />
        </router-link>
        <router-link class="navbar-brand brand-logo-mini" style="margin: 0 !important" to="/">
          <img
            class="img-fluid"
            style="max-width: 30px !important"
            src="@/assets/images/logo-min.png"
            alt="logo"
          />
        </router-link>
      </div>

      <button
        v-if="$route.path != '/cashier'"
        class="d-lg-none d-block navbar-toggler col-auto navbar-toggler-right align-self-center"
        type="button"
        data-toggle="offcanvas"
      >
        <font-awesome-icon icon="fa-solid fa-bars" />
      </button>

      <ul
        class="navbar-nav pull-left col justify-content-end"
        :style="$route.path == '/cashier' ? 'margin: -10px !important' : ''"
      >
        <li v-if="$route.path !== '/cashier'" class="nav-item dropdown user-dropdown">
          <a
            href="#"
            v-if="language == 'ar'"
            :class="{ disabled: language == 'en' }"
            @click.prevent="changeLanguage('en')"
            class="dropdown-item"
            ><i class="flag-icon flag-icon-us"></i> English</a
          >
          <a
            href="#"
            v-if="language == 'en'"
            :class="{ disabled: language == 'ar' }"
            @click.prevent="changeLanguage('ar')"
            class="dropdown-item"
            ><i class="flag-icon flag-icon-sa"></i> العربية</a
          >
        </li>
        <li
          v-if="$route.path == '/cashier'"
          :class="$route.path == '/cashier' ? 'cachier-header-menu' : ''"
          class="nav-item"
        >
          <a
            href="#"
            v-if="language == 'ar'"
            :class="{ disabled: language == 'en' }"
            @click.prevent="changeLanguage('en')"
            class="dropdown-item"
            ><i class="flag-icon flag-icon-us"></i> English</a
          >
          <a
            href="#"
            v-if="language == 'en'"
            :class="{ disabled: language == 'ar' }"
            @click.prevent="changeLanguage('ar')"
            class="dropdown-item"
            ><i class="flag-icon flag-icon-sa"></i> العربية</a
          >
        </li>

        <li
          class="nav-item dropdown user-dropdown user-img"
          :class="$route.path == '/cashier' ? '' : ''"
        >
          <a
            class="nav-link dropdown-toggle"
            id="UserDropdown"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <font-awesome-icon class="d-sm-inline-block d-none" icon="fa-solid fa-user" />
            <span :style="language == 'en' ? 'margin-left: 13px' : 'margin-right: 13px'">
              {{ trans('hello') }} {{ username }}
            </span>
          </a>

          <div
            class="dropdown-menu dropdown-menu-right navbar-dropdown"
            aria-labelledby="UserDropdown"
            :style="language == 'en' ? 'right: 0 !important; left: auto !important;' : ''"
          >
            <div class="dropdown-header text-center">
              <img
                class="img-md rounded-circle"
                src="@/assets/images/user.png"
                alt="Profile image"
              />
              <p class="mb-1 mt-3 font-weight-semibold">{{ username }}</p>
              <p class="font-weight-light text-muted mb-0">
                {{ username }}
              </p>
            </div>
            <router-link to="/change-password" @click="changePassword" class="dropdown-item"
              >{{ trans('change password') }} <i class="dropdown-item-icon ti-comment-alt"></i
            ></router-link>
            <a href="#" @click.prevent="logout()" class="dropdown-item"
              >{{ trans('log out') }} <i class="dropdown-item-icon ti-power-off"></i
            ></a>
          </div>
        </li>

        <li
          class="nav-item wifi"
          v-if="$route.path == '/cashier'"
          :class="$route.path == '/cashier' ? '' : ''"
          style="font-size: 20px; margin: 0 0px 0 24px"
        >
          <v-offline @detected-condition="amIOnline" online-class="online" offline-class="offline">
            <font-awesome-icon :class="{ online: onLine }" icon="fa-solid fa-wifi" />
          </v-offline>
        </li>
        <li
          v-if="$route.path == '/cashier'"
          @click="openMenu()"
          class="nav-item checkout-btn d-lg-none d-block"
          :class="[$route.path == '/cashier' ? '' : '', addedItems > 0 ? 'animatedIcon' : '']"
        >
          <span v-if="addedItems > 0">
            {{ addedItems }}
          </span>
        </li>
      </ul>

      <div class="col-xs-2 pull-right">
        <div class="notification">
          <button @click="showNotofication()" class="notification-btn" style="position: relative">
            <span
              style="
                position: absolute;
                background: rgba(199, 23, 23, 1);
                color: #fff;
                border-radius: 50% 50%;
                height: 17px;
                width: 17px;
                font-size: 12px;
                right: -4px;
              "
              v-if="filterNotifications.length"
              >{{ filterNotifications.length }}</span
            >
            <img
              width="30"
              height="45"
              src="https://img.icons8.com/material/48/bell--v1.png"
              alt="bell--v1"
            />
          </button>

          <ul
            class="notification-menu arrow-top"
            v-if="notificationVisable && notification.length > 0"
          >
            <div
              class="d-flex"
              style="margin-bottom: 10px; gap: 5px; justify-content: space-between"
            >
              <div class="d-flex" style="gap: 12px; align-items: center">
                <h4>{{ trans('notifications') }}</h4>

                <svg
                  style="margin-top: -7px; fill: #a0cfed"
                  :style="(language = 'ar' ? 'transform:rotate(180deg);' : '')"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 320 512"
                >
                  <path
                    d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                  />
                </svg>
                <h6 style="color: #59bcd7" v-if="all">
                  {{ trans('all notifications') }}
                </h6>
                <h6 style="color: #59bcd7" v-if="notRead">
                  {{ trans('not read') }}
                </h6>
              </div>
              <div>
                <button @click="showNotofication()">
                  <img
                    width="18"
                    height="37"
                    src="https://img.icons8.com/material-outlined/24/delete-sign.png"
                    alt="delete-sign"
                  />
                </button>
              </div>
            </div>
            <div class="d-flex" style="margin-bottom: 10px; gap: 5px">
              <button
                @click="showAllNotifications()"
                class=""
                style="
                  border-radius: 30px;
                  width: 80px;
                  height: 35px;
                  font-size: 18px;
                  background: rgb(0 157 255 / 30%);
                  color: #fff;
                "
                data-toggle="collapse"
                href="#multiCollapseExample1"
                role="button"
                aria-expanded="false"
                aria-controls="multiCollapseExample1"
              >
                {{ trans('all') }}
              </button>
            </div>

            <div style="min-width: 390px" v-if="all">
              <div v-for="notify in notification" :key="notify.id">
                <button
                  @click="getSingleNotification(notify)"
                  style="width: 100%; text-decoration: none; display: block; margin-bottom: 10px"
                >
                  <li
                    style="
                      display: flex;
                      border-radius: 6px;
                      align-items: center;
                      column-gap: 14px;
                      justify-content: space-between;
                    "
                  >
                    <div class="d-flex" style="align-items: center; gap: 10px">
                      <div class="bellIcon">
                        <img
                          width="30"
                          height="35"
                          class="avatar"
                          src="https://img.icons8.com/material/48/bell--v1.png"
                        />
                      </div>
                      <div class="text">
                        <h4 style="font-size: 17px !important; margin-bottom: 0; color: #000">
                          {{ notify.data.title }}
                        </h4>

                        <div class="notification-date_time">
                          <div class="notification-date">
                            <img
                              width="18"
                              height="37"
                              src="https://img.icons8.com/ios/50/calendar--v1.png"
                              alt="calendar--v1"
                            />

                            <p>{{ split_date(notify.created_at) }}</p>
                          </div>
                          <div class="notification-time">
                            <img
                              width="18"
                              height="37"
                              src="https://img.icons8.com/ios/50/clock--v1.png"
                              alt="clock--v1"
                            />
                            <p>{{ split_time(notify.created_at) }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="notification-status" v-if="notify.is_read == false">
                      <span></span>
                    </div>
                  </li>
                </button>
              </div>

              <div class="col-sm-12 text-center" v-if="total > filter.per_page">
                <nav
                  aria-label="Page navigation center-block"
                  style="margin-top: 20px; direction: ltr"
                >
                  <ul class="pagination justify-content-center">
                    <li class="page-item" v-if="prev_page_url">
                      <a
                        class="page-link"
                        @click.prevent="goTo(first_page_url)"
                        href="#"
                        tabindex="-1"
                        ><font-awesome-icon icon="fa-solid fa-angles-left" />
                      </a>
                    </li>
                    <li class="page-item" v-if="prev_page_url">
                      <a
                        class="page-link"
                        @click.prevent="goTo(prev_page_url)"
                        href="#"
                        tabindex="-1"
                      >
                        <font-awesome-icon icon="fa-solid fa-angle-left" />
                      </a>
                    </li>
                    <li class="page-item active disabled">
                      <a class="page-link" @click.prevent="javascript" href="#">{{
                        current_page
                      }}</a>
                    </li>
                    <li class="page-item" v-if="next_page_url">
                      <a class="page-link" @click.prevent="goTo(next_page_url)" href="#"
                        ><font-awesome-icon icon="fa-solid fa-angle-right"
                      /></a>
                    </li>
                    <li class="page-item" v-if="next_page_url" style="height: 56px">
                      <a class="page-link" @click.prevent="goTo(last_page_url)" href="#"
                        ><font-awesome-icon icon="fa-solid fa-angles-right"
                      /></a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </ul>
        </div>
      </div>

      <b-button
        @click="clearCach"
        class="btn btn-cach mx-2 btn-lg col-auto cashier-btn d-none d-sm-inline"
      >
        <span class="d-none d-md-inline"> Clear Cach </span>
        <font-awesome-icon icon="fa-solid fa-hard-drive" />
      </b-button>

      <router-link
        v-if="$route.path != '/cashier'"
        to="/cashier"
        class="btn btn-primary btn-lg col-auto cashier-btn"
        style="font-size:20px;background: rgb(33, 146, 255);border-radius: 8px !important;border:none;font-weight: 600; padding: 5px 10px;, line-height: 1,"
      >
        <span class="d-none d-md-inline"> {{ trans('cashier') }} &nbsp; </span>
        <img src="@/assets/images/cashier.png" alt="logo" />
      </router-link>
    </div>

    <div v-if="changePasswordForm || editAccountForm" class="popup">
      <div class="popup-overlay"></div>
      <div class="popup-content">
        <div class="row m-0">
          <div class="row col-sm-12 prevent-print">
            <!-- <font-awesome-icon
              @click="
                editAccountForm = false
                changePasswordForm = false
                message = ''
              "
              icon="fa-solid fa-xmark"
            /> -->
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import _ from 'lodash'
import { getStorage } from '@/support/mixins/getStorage'
// import { getStorage } from '@/support/mixins'

// import moment from 'moment'

import axios from 'axios'

export default {
  name: 'AppHeader',

  data() {
    return {
      permissions: getStorage('permissions'),
      notificationVisable: false,
      counter: 0,
      filter: {
        per_page: 5
      },
      notification: [],
      paginate: {},
      next_page: 0,
      prev_page: 0,
      current_page: 0,
      next_page_url: '',
      prev_page_url: '',
      first_page_url: '',
      last_page_url: '',
      total: 0,
      translationList: [],
      message: '',
      changePasswordForm: false,
      editAccountForm: false,
      form: {},
      onLine: true,
      sideMenu: false,
      alertType: 'success',
      language: getStorage('DEFAULT_LANGUAGE', 'ar'),
      username: localStorage.getItem('username'),
      user: localStorage.getItem('user'),
      all: true,
      notRead: false
    }
  },
  props: ['addedItems'],
  components: {},
  mounted() {
    this.getNotification()
    setInterval(() => {
      this.getNotification()
    }, 50000)
    this.amIOnline(true)
    this.getTranslationList()
  },
  computed: {
    filterNotifications() {
      // Create an empty array to store the filtered categories
      const filtered = []

      // Loop through the categories
      for (const notify of this.notification) {
        if (notify.is_read == false) {
          filtered.push(notify)
        }
      }
      return filtered
    }
  },
  methods: {
    trans(key) {
      const translationList = JSON.parse(getStorage('translationList', '{}'))
      return _.get(translationList, key, `trans-${key}`) ?? key
    },
    reeeddd(notify) {
      this.notificationVisable = !this.notificationVisable
      notify.is_read = true
    },
    getNotRead() {
      this.notRead = true
      this.all = false
    },
    showAllNotifications() {
      this.notRead = false
      this.all = true
      console.log(this.all)
      console.log(this.notRead)
    },
    showNotofication() {
      this.notificationVisable = !this.notificationVisable
    },
    incrementCounter() {
      return this.getNotification
    },

    split_date(date_time) {
      // return moment(date_time).format('YYYY-MM-DD')
    },
    split_time(date_time) {
      // return moment(date_time).format('HH:mm:ss')
    },
    amIOnline(e) {
      this.onLine = e
      this.$emit('internetState', e)
    },
    openMenu() {
      this.sideMenu = !this.sideMenu
      this.$emit('sideMenu', this.sideMenu)
    },
    changePassword() {
      this.changePasswordForm = true
    },
    setPassword() {
      axios.post('/api/change-password', this.form).then((res) => {
        this.message = res.data.message
        if (res.data.success) {
          this.alertType = 'success'
        } else {
          this.alertType = 'danger'
        }
      })
    },
    changeLanguage(lng) {
      if (this.language !== lng) {
        axios
          .get('api/profile/change-language/' + lng)
          .then((res) => {
            if (res.data.status) {
              console.log(res.data.body)
              window.localStorage.removeItem('translationList')
              window.localStorage.setItem('translationList', JSON.stringify(res.data.body.strings))
              window.localStorage.setItem('DEFAULT_LANGUAGE', lng)
              window.location.reload()
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    getTranslationList() {
      axios
        .get('/api/translation-list')
        .then((res) => {
          this.translationList = res.data.body.translations
        })
        .catch((err) => {
          console.log(err)
        })
    },

    clearCach() {
      axios.get('/api/clear/cache').then((res) => {
        if (res.data.status) {
          this.message = res.data.message
          this.alertType = 'success'
          localStorage.clear()
          setTimeout(() => {
            this.message = ''
            this.alertType = 'success'
          }, 5000)
          this.$router.go()
        }
      })
    },
    logout() {
      axios
        .get('/api/logout')
        .then(
          (res) => {
            if (res.data.status) {
              localStorage.removeItem('accessToken')
              // store user data
              localStorage.removeItem('userName')
              localStorage.removeItem('userEmail')
              localStorage.removeItem('userID')
              localStorage.removeItem('stringsData')

              this.showToastError(res.data.message, res.data.custom_code)

              setTimeout(() => {
                window.location.reload()
              }, 2500)
            }
          },
          (error) => {
            this.showToastError(error.response.data.message, error.response.data.custom_code)
          }
        )
        .catch((error) => {
          this.showToastError(error.response.data.message, error.response.data.custom_code)
        })
    },

    getNotification() {
      axios({
        method: 'GET',
        url: '/api/notification/notifications'
      })
        .then((res) => {
          this.notification = res.data.body.notifications.data
          this.paginate = res.data.body.notifications.paginate
          this.total = res.data.body.notifications.paginate.total
          this.current_page = res.data.body.notifications.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.notifications.paginate.next_page_url
          this.prev_page_url = res.data.body.notifications.paginate.prev_page_url
          this.first_page_url = res.data.body.notifications.paginate.first_page_url
          this.last_page_url = res.data.body.notifications.paginate.last_page_url
        })
        .catch((err) => {
          console.log('Error', err)
        })
    },
    getSingleNotification(notify) {
      axios({
        method: 'GET',
        url: '/api/notification/notifications/' + notify.id
      })
        .then((res) => {
          if (res.data.status) {
            this.$router.push('/my-inventory-transfer-requests/' + notify.data.id)
            this.notificationVisable = !this.notificationVisable
          }
        })
        .catch((err) => {
          console.log('Error', err)
        })
    },

    goTo(url) {
      this.notification = []

      let str = ''
      for (var key in this.filter) {
        if (this.filter[key] == '') continue
        if (str != '') {
          str += '&'
        }
        // str += key + '=' + this.filter[key]
      }
      url = url.includes('?') ? url + '&' + str : url + '?' + str

      axios
        .get(url)
        .then((res) => {
          this.notification = res.data.body.notifications.data
          this.paginate = res.data.body.notifications.paginate
          this.total = res.data.body.notifications.paginate.total
          this.current_page = res.data.body.notifications.paginate.current_page
          this.prev_page = this.current_page - 1
          this.next_page = this.current_page + 1
          this.next_page_url = res.data.body.notifications.paginate.next_page_url
          this.prev_page_url = res.data.body.notifications.paginate.prev_page_url
          this.first_page_url = res.data.body.notifications.paginate.first_page_url
          this.last_page_url = res.data.body.notifications.paginate.last_page_url
        })
        .catch((error) => {
          this.message = error.response.data.message
          this.alertType = 'danger'
          setTimeout(() => {
            this.message = ''
            this.alertType = 'success'
          }, 120000)
        })
    }
  }
}
</script>

<style scoped>
.online {
  color: #0cd70c;
}

.page-header.navbar .page-logo .logo-default {
  margin: 14px 11px 6px 52px;
}

.navbar-nav li {
  position: relative !important;
}

.popup-content {
  background: #fff;
  position: absolute;
  top: 125px;
  z-index: 2;
  left: 0;
  right: 0;
  margin: 0 auto;
  max-width: 768px;
  width: 90%;
  min-height: 50vh;
  height: auto;
  border-radius: 10px;
  box-shadow: 1px 5px 15px 2px #000000;
}

.popup-content .row .fa-xmark {
  right: 25px;
  top: 10px;
}

.navbar-toggler {
  font-size: 24px;
}

@media screen and (max-width: 575px) {
  .navbar-nav {
    padding: 0;
  }

  .navbar-nav li {
    margin: 0 !important;
  }

  .navbar.default-layout .navbar-menu-wrapper .navbar-nav .nav-item.user-dropdown {
    margin-left: 0 !important;
  }

  .dropdown-item {
    padding: 0.25rem 0.5rem;
  }
}

@media screen and (max-width: 767px) {
  .navbar.default-layout .navbar-menu-wrapper .navbar-nav .nav-item.user-dropdown .dropdown-menu {
    min-width: 200px !important;
  }
}

@media screen and (max-width: 480px) {
  .cashier-btn {
    font-size: 20px;
    /* padding: 0; */
    background-color: transparent;
    border: none;
    color: #1c45ef;
  }

  .navbar.default-layout .navbar-menu-wrapper .navbar-nav .nav-item .nav-link i {
    margin: 0;
  }

  .user-img img {
    width: 20px !important;
    min-width: 20px;
    min-height: 20px;
    height: 20px;
  }

  .wifi i {
    font-size: 20px;
    position: relative;
    top: -3px;
  }
}

.navbar.default-layout .navbar-brand-wrapper .navbar-brand.brand-logo {
  margin: 16px 40px 0 0 !important;
}

.navbar.default-layout .navbar-brand-wrapper .navbar-brand.brand-logo img {
  width: auto;
  max-height: 70px;
}

@media screen and (max-width: 991px) {
  .navbar.default-layout .navbar-brand-wrapper {
    width: 270px;
  }

  .navbar.default-layout .navbar-brand-wrapper .brand-logo-mini img {
    width: 170px;
    max-width: 100%;
    margin: auto;
  }

  .navbar.default-layout .navbar-menu-wrapper {
    width: 100%;
  }

  .wifi {
    display: none;
  }

  .navbar.default-layout .navbar-menu-wrapper .navbar-nav .nav-item .nav-link {
    margin-left: 0;
    margin-right: 0;
  }

  .navbar.default-layout .navbar-menu-wrapper .navbar-nav {
    margin: 0 28px 0 3px;
  }

  .navbar.default-layout .navbar-menu-wrapper .navbar-nav .nav-item.user-dropdown {
    margin-left: 10px !important;
  }
}

.cashier-nav {
  background: #f9f9f9 !important;
  padding: 10px !important;
  box-shadow: none;
}

.cashier-nav .navbar-menu-wrapper {
  box-shadow: none;
  color: #000000 !important;
}

.cashier-nav .navbar-brand-wrapper,
.cashier-nav .navbar-menu-wrapper {
  background: transparent !important;
}

.cachier-header-btn {
  background: #fff;
  border-radius: 50%;
  padding: 10px 10px;
  margin-left: 10px !important;
}

.cachier-header-menu {
  margin-left: 10px !important;
}

.cachier-header-btn a {
  padding: 0;
}

.cachier-header-btn a::after,
.cachier-header-menu a::after {
  display: none;
}

.cachier-header-btn img {
  min-width: 20px !important;
  width: 20px !important;
  height: 20px !important;
}

@media screen and (max-width: 574px) {
  .navbar.default-layout .navbar-brand-wrapper {
    width: 100px !important;
  }

  .navbar.default-layout .navbar-menu-wrapper {
    width: 100% !important;
  }
}

.animatedIcon {
  background: transparent linear-gradient(180deg, #b6325f 0%, #ff887c 100%) 0% 0% no-repeat
    padding-box;
  color: #fff;
  padding: 7px 9.5px;
  border-radius: 17px;
}

.animatedIcon span {
  position: absolute;
  background: #ec2424;
  border-radius: 20px;
  padding: 2px 5px;
  right: -3px;
  top: -5px;
  font-size: 10px;
  font-weight: bold;
}

.animatedIcon::before,
.animatedIcon::after {
  content: '';
  position: absolute;
  border: black solid 3px;
  border-radius: 100em;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  margin: auto;
  opacity: 0;
}

.animatedIcon {
  -webkit-animation: scale 3s cubic-bezier(0.175, 0.885, 0.32, 1.3) infinite;
  animation: scale 3s cubic-bezier(0.175, 0.885, 0.32, 1.3) infinite;
}

.animatedIcon:before,
.animatedIcon:after {
  -webkit-animation: pulse 3s cubic-bezier(0.175, 0.885, 0.32, 1.1) infinite;
  animation: pulse 3s cubic-bezier(0.175, 0.885, 0.32, 1.1) infinite;
  -webkit-animation-delay: 400ms;
  animation-delay: 400ms;
}

@-webkit-keyframes scale {
  0%,
  15% {
    transform: scale(1);
  }
  5%,
  10% {
    transform: scale(1.1);
  }
}

@keyframes scale {
  0%,
  15% {
    transform: scale(1);
  }
  5%,
  10% {
    transform: scale(1.1);
  }
}

@-webkit-keyframes pulse {
  0% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0;
    transform: scale(1.3);
  }
}

@keyframes pulse {
  0% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0;
    transform: scale(1.3);
  }
}

.btn-cach {
  color: #fff;
  background-color: #ef486a;
  border-color: #f5c2c7;
}

.btn-cach:hover {
  color: #fff;
  background-color: #ef486a;
  border-color: #ef486a;
}

/* CSS used here will be applied after bootstrap.css */

.notifaction-dropdown {
  display: inline-block;
  margin-left: 20px;
  padding: 10px;
}

.glyphicon-bell {
  font-size: 1.5rem;
}

.notifications {
  min-width: 420px;
}

.notifications-wrapper {
  overflow: auto;
  max-height: 250px;
}

.menu-title {
  color: #ff7788;
  font-size: 1.5rem;
  display: inline-block;
}

.glyphicon-circle-arrow-right {
  margin-left: 10px;
}

.notification-heading,
.notification-footer {
  padding: 2px 10px;
}

.dropdown-menu.divider {
  margin: 5px 0;
}

.item-title {
  font-size: 1.3rem;
  color: #000;
}

.notifications a.content {
  text-decoration: none;
  background: #ccc;
}

.notification-item {
  padding: 10px;
  margin: 5px;
  background: #ccc;
  border-radius: 4px;
}

.background-white {
  background: #ffffff;
}

.fl {
  float: left;
}

header .wrapper {
  /*position: relative;*/
}

header .notification {
  float: right;
  padding: 5px;
  cursor: pointer;
  position: relative;
  right: 300px;
  top: 7px;
}

header .notification:hover i {
  color: #6f7e87;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}

.notification {
  position: relative;
  text-align: right;
}

.notification img {
  padding: 10px 0;
}

.notification-menu {
  overflow-y: scroll;
  height: 400px;
  transform: translateY(1em);
  z-index: -1;
  transition: all 0.3s ease-in-out;
  border-radius: 8px;
  position: absolute;
  top: 50px;
  left: -65px;
  background-color: #e5e5e5;
  border: #989898;
  padding: 13px;
  list-style: none;
  display: block;
  text-align: left;
  animation: fade-in 1s ease-in-out;
}

@keyframes fade-in {
  100% {
    opacity: 1;
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.notification-menu.arrow-top:after {
  content: ' ';
  position: absolute;
  left: 65px;
  top: -14px;
  border-top: none;
  border-right: 15px solid transparent;
  border-left: 15px solid transparent;
  border-bottom: 15px solid #e5e5e5;
}
.notification-btn:focus .notification-menu,
.notification-btn:focus-within .notification-menu {
  visibility: visible; /* shows sub-menu */
  opacity: 1;
  z-index: 1;
  transform: translateY(0%);
  transition-delay: 0s, 0s, 0.3s;
}

.notification-menu li {
  background-color: #fff;
  padding: 10px;
  margin-bottom: 10px;
  text-align: start;
}
.notification-menu li:last-of-type {
  margin-bottom: 0;
}
.notification-menu .avatar {
  padding: 2px 0;
}

.notification-menu h3 {
  font-size: 15px;
  margin: 0 0 5px 0;
  display: inline;
}

.notification-menu p {
  margin-bottom: 0;
  font-size: 14px;
}

.bellIcon {
  border: 1px solid #000;
  width: 40px;
  height: 40px;
  border-radius: 50% 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.notification-status {
  background: #59bcd7;
  height: 11px;
  width: 11px;
  font-size: 15px;
  border-radius: 50% 50%;
  display: inline-block;
}

.notification-date_time {
  display: flex;
  column-gap: 20px;
}
.notification-date,
.notification-time {
  display: flex;
  gap: 5px;
  align-items: center;
  justify-items: center;
}

.navbar .pull-left {
  margin: 0 !important;
}
</style>

<template>
  <div>
    <section class="sidebar sidebar-offcanvas active" id="sidebar">
      <div class="navbar-brand-wrapper d-flex align-items-top justify-content-start logo-big">
        <button
          v-if="$route.path !== '/cashier'"
          class="navbar-toggler col-auto navbar-toggler-right align-self-center d-md-inline d-none"
          type="button"
          data-toggle="offcanvas"
        >
          <i class="bi bi-chevron-double-left"></i>
        </button>

        <router-link class="navbar-brand brand-logo" to="/">
          <img src="@/assets/images/logo.png" alt="logo" />
        </router-link>

        <router-link class="navbar-brand brand-logo-mini" to="/">
          <img src="@/assets/images/logo.png" alt="logo" />
        </router-link>
      </div>

      <b-nav class="nav">
        <b-card v-if="sidebarLoading">
          <b-skeleton animation="wave" width="100%"></b-skeleton>
          <b-skeleton animation="wave" width="100%"></b-skeleton>
          <b-skeleton animation="wave" width="100%"></b-skeleton>
          <b-skeleton animation="wave" width="100%"></b-skeleton>
          <b-skeleton animation="wave" width="100%"></b-skeleton>
          <b-skeleton animation="wave" width="100%"></b-skeleton>
        </b-card>

        <div v-else v-for="(groups, groupName) in groupLinks" :key="groupName">
          <h5 style="font-weight: 600; margin: 15px 0">
            <button v-b-toggle="`collapse-${groupName}`"></button>
            {{ trans(groupName) }}
          </h5>
          <ul style="padding: 0; list-style: none">
            <template v-for="(links, menuKey) in groups">
              <!--      Start is link -->

              <template v-if="isMenu(menuKey)">
                <li class="nav-item parent" :key="menuKey">
                  <router-link
                    v-b-toggle="`collapse-${menuKey}`"
                    style="position: relative"
                    class="nav-link"
                    data-toggle="collapse"
                    href="#"
                    to="#"
                  >
                    <!-- <font-awesome-icon
                      :icon="'fa-solid fa-' + getLink(menuKey).icon"
                    /> -->
                    <img
                      width="20"
                      height="20"
                      src="https://img.icons8.com/color/48/dashboard-layout.png"
                      alt="dashboard-layout"
                    />
                    <div>
                      <span class="menu-title">{{ getLink(menuKey).title }} </span>
                    </div>
                    <div>
                      <i
                        v-if="language == 'en'"
                        class="pi pi-chevron-down"
                        style="position: absolute; font-size: 16px; right: 11px"
                      ></i>
                      <i v-else class="pi pi-chevron-down"></i>
                    </div>
                  </router-link>

                  <b-collapse :id="`collapse-${menuKey}`">
                    <!-- change index to LnkIndx to prevent conflict -->
                    <template v-for="(link, lnkIndx) in links">
                      <router-link
                        class="nav-link child"
                        :key="lnkIndx"
                        v-if="link.can.view_in_sidebar === true"
                        :to="link.frontend_route_url"
                        style="margin: 10px 0"
                      >
                        <span class="menu-title">{{ link.title }}</span>
                      </router-link>
                    </template>
                  </b-collapse>
                </li>
              </template>

              <!--      Start is menu -->

              <template v-else-if="!isMenu(menuKey)" v-for="(link, indx) in links">
                <li class="nav-item parent" v-if="link.can.view_in_sidebar === true" :key="indx">
                  <!-- if condition for frontend_route_url = null -->
                  <router-link
                    v-b-toggle="`collapse-${link.slug}`"
                    style="position: relative; padding-top: 3px"
                    class="nav-link"
                    href="#"
                    v-if="link.frontend_route_url"
                    :to="link.frontend_route_url"
                  >
                    <!-- <font-awesome-icon
                      v-if="link.icon !== ''"
                      :icon="'fa-solid fa-' + link.icon"
                    /> -->

                    <img
                      width="20"
                      height="20"
                      src="https://img.icons8.com/color/48/dashboard-layout.png"
                      alt="dashboard-layout"
                    />
                    <span class="menu-title" style="text-wrap: wrap; line-height: 1.7"
                      >{{ link.title }}
                    </span>
                  </router-link>
                </li>
              </template>
            </template>
          </ul>
        </div>
      </b-nav>
    </section>
  </div>
</template>

<script>
import { getStorage } from '@/support/mixins'
import forEach from 'lodash/forEach'

export default {
  props: ['sections', 'user'],
  data() {
    return {
      show_child: false,
      sidebarLoading: true,
      sidebars: [],
      groupLinks: {},
      language: getStorage('DEFAULT_LANGUAGE'),
      current_section: {}
    }
  },
  mounted() {
    this.getSidebar()
  },
  methods: {
    getSidebar() {
      this.sidebarLoading = true
      this.axios({
        url: '/api/sidebars',
        method: 'GET'
      })
        .then((res) => {
          this.sidebars = res.data.body.sidebars

          var sidebarGroups = _.groupBy(this.sidebars, 'group')

          forEach(sidebarGroups, (value, key) => {
            this.groupLinks[key] = _.groupBy(value, 'parent_slug')
          })

          this.sidebarLoading = false
        })
        .catch((error) => {
          console.log(error)
        })
    },
    log(string) {
      console.log(string)
    },
    isMenu(menuKey) {
      return menuKey !== 'null'
    },
    getLink(slug) {
      return this.sidebars.find((item) => item.slug === slug)
    }
  }
}
</script>

<style scoped>
.navbar-brand.brand-logo {
  margin: 16px 0 0 40px !important;
}

.rtl .navbar-brand.brand-logo {
  margin: 16px 40px 0 0 !important;
}

.navbar-brand.brand-logo-mini {
  display: none;
}

.navbar-brand.brand-logo img {
  width: auto;
  max-height: 60px;
}

.sidebar {
  margin-top: -63px;
  z-index: 1040;
  scrollbar-width: none;
  overflow: auto;
}

.sidebar::-webkit-scrollbar {
  display: none;
}

.nav .nav-item {
  display: block;
}

.sidebar:not(.active):not(:hover) .nav {
  padding: 18px 8px 77px 8px;
  margin-top: 80px;
}

.sidebar:not(.active):not(:hover) h4 {
  visibility: hidden;
}

.sidebar h4 {
  font-size: 17px;
  margin: 8px 0;
}

.sidebar:not(.active):not(:hover) .nav .nav-item .nav-link {
  padding: 10px 25px 10px 15px;
}
.sidebar .nav-link {
  color: #137b97 !important;
  font-weight: 600 !important;
  font-family: 'BahijTheSansArabic-Bold' !important;
}
@media screen and (min-width: 992px) {
  .sidebar:not(.active):hover {
    width: 275px;
    opacity: 1;
  }

  .sidebar:not(.active):hover .logo-min {
    display: none !important;
  }

  .sidebar:not(.active):hover .logo-bid {
    display: block !important;
  }
}

.sidebar:not(.active):hover .menu-title {
  display: inline !important;
}

.navbar-brand-wrapper {
  position: fixed;
  width: 253px;
  z-index: 2;
  background: #fcfcfc;
}

@media screen and (max-width: 991px) {
  .sidebar:not(.active) .navbar-brand-wrapper {
    display: none !important;
  }
}

.navbar-toggler {
  position: absolute;
  left: 225px;
  z-index: 10;
  top: 38px;
  color: #a7a7a7;
  font-size: 14px;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background: #fff;
  border-radius: 50%;
  height: 34px;
  width: 34px;
  padding: 0;
}

.rtl .navbar-toggler {
  position: absolute;
  left: auto;
  right: 200px;
  z-index: 10;
  top: 38px;
  color: #a7a7a7;
  font-size: 14px;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background: #fff;
  border-radius: 50%;
  height: 34px;
  width: 34px;
  padding: 0;
}

.sidebar:not(.active) .navbar-toggler {
  transform: rotate(180deg);
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}

.sidebar.active .logo-min {
  display: none !important;
}

.sidebar .logo-min {
  display: block !important;
  width: 87px;
}

.sidebar:not(.active) .nav-item .nav-link .menu-title {
  /* here */
  display: none;
}

.sidebar .logo-min .navbar-brand.brand-logo {
  margin: 16px 0 0 16px !important;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}

.rtl .sidebar .logo-min .navbar-brand.brand-logo {
  margin: 16px 16px 0 0 !important;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}

.sidebar.active .logo-big {
  display: block !important;
}

.sidebar:not(:hover):not(.active) .logo-big {
  display: none !important;
  /* here */
}

.nav-link.router-link-exact-active[aria-controls='ui-basic'] {
  background: transparent !important;
  color: #777777;
}

@media screen and (max-width: 991px) {
  .brand-logo-mini img {
    width: 170px;
    max-width: 100%;
    margin: auto;
  }
}

.sidebar:not(.active):not(:hover) .collapse {
  display: none;
}

.sidebar:not(.active):not(:hover) .drop {
  display: none;
}

.v-step {
  max-width: 540px !important;
  width: 540px;
  background: #fff !important;
  color: #000000;
  box-shadow: 0px 5px 4px #00000029;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  transform: translate(-290px, 232px) !important;
  border-radius: 15px !important;
}

.v-step .v-step__button-previous {
  /* display: none !important; */
}

.v-step .v-step__button-next,
.v-step .v-step__button-skip,
.v-step .v-step__button-stop {
  width: 82px;
  height: 33px;
  background: #137b97 0% 0% no-repeat padding-box;
  outline: none;
  border: 1px solid transparent;
  font-weight: bold;
  border-radius: 50px;
  margin-bottom: 25px;
}

.v-step .v-step__button-next:hover,
.v-step .v-step__button-skip:hover,
.v-step .v-step__button-stop:hover {
  background: #fff;
  color: #137b97;
  border: 1px solid #137b97;
}

.v-step .content_steps {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.v-step .content_steps p {
  color: #000000;
  font-size: 15px;
}

.v-step .content_steps img {
  object-fit: contain;
  width: 190px;
  height: 190px;
}

.v-step__arrow {
  right: -20px !important;
  background: #fff;
  transform: translate(0px, 25px) !important;
}

.v-step__arrow::before {
  width: 30px !important;
  height: 30px !important;
}
</style>

<template>
  <div class="container-scroller rtl">
    <div class="container-fluid page-body-wrapper full-page-wrapper p-0">
      <div
        class="content-wrapper d-flex align-items-center auth auth-bg-1 theme-one login-contanier"
      >
        <div class="row w-100 m-0" style="padding: 20px 75px 0px 75px">
          <div class="col-lg-6 images" style="margin-bottom: 15px">
            <img src="@/assets/images/logo-big.png" alt="logo" style="height: 62px" />
            <h1
              class="d-md-block d-none"
              style="
                margin-top: 20px;
                font-size: 30px;
                font-weight: 600;
                color: #137b97;
                margin-bottom: 50px;
              "
            >
              اشترك الان وتمتع بأفضل خدمة
            </h1>
            <img class="com" src="@/assets/images/computer.png" alt="logo" style="width: 482px" />
            <img class="tab" src="@/assets/images/tap.png" alt="logo" style="width: 173px" />
            <img class="mobile" src="@/assets/images/mobile.png" alt="logo" />
          </div>
          <div class="col-lg-6 mx-auto">
            <div class="auto-form-wrapper">
              <!--              <div class="alert alert-danger" v-if="message.length">-->
              <!--                <span>{{ message }}</span>-->
              <!--              </div>-->
              <h1
                style="
                  font-size: 30px;
                  font-weight: 600;
                  color: #000000;
                  margin-bottom: 17.5px;
                  text-align: center;
                "
              >
                سجل دخولك الان
              </h1>
              <p
                style="
                  font-size: 16px;
                  font-weight: 300;
                  color: #000000;
                  margin-bottom: 33px;
                  text-align: center;
                "
              >
                هذا موقع آمن. الرجاء إدخال معلومات تسجيل الدخول الخاصة بك للدخول
              </p>
              <form action="#">
                <div class="form-group">
                  <label
                    class="label"
                    style="font-size: 16px; font-weight: 300; color: #000000; margin-bottom: 10px"
                    >إسم المستخدم</label
                  >
                  <div class="input-group">
                    <input
                      type="text"
                      @keyup.enter.prevent="auth()"
                      v-model="username"
                      class="form-control"
                      placeholder="الاسم"
                    />
                  </div>
                  <span v-if="errors.hasOwnProperty('username')" class="text-danger">
                    {{ errors.username[0] }}</span
                  >
                </div>
                <div class="form-group">
                  <label
                    class="label"
                    style="font-size: 16px; font-weight: 300; color: #000000; margin-bottom: 10px"
                    >كلمة المرور</label
                  >
                  <div class="input-group">
                    <input
                      type="password"
                      @keyup.enter.prevent="auth()"
                      v-model="password"
                      class="form-control"
                      placeholder="*********"
                    />
                  </div>
                  <span v-if="errors.hasOwnProperty('password')" class="text-danger">
                    {{ errors.password[0] }}</span
                  >
                </div>
                <span v-if="message" class="text-danger"> {{ message }}</span>
                <div class="form-group justify-content-end row m-0" style="padding-top: 16px">
                  <button @click.prevent="auth()" class="btn btn-primary submit-btn">دخول</button>
                </div>
              </form>
            </div>
            <p
              class="footer-text text-md-right text-center"
              style="color: #000000; margin-top: 80px"
            >
              copyright © 2019 7L.POS. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      <!-- content-wrapper ends -->
      <!-- <img class="bottom" src="@/images/bottom.png" alt="bottom" > -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
  <!-- container-scroller -->
</template>
<script>
import axios from 'axios'
export default {
  name: 'AppLogin',
  data() {
    return {
      title: 'Login to your account',
      username: '',
      password: '',
      message: '',
      errors: [],
      user: {},
      permissions: [],
      strings: [],
      translationList: []
    }
  },

  mounted() {
    window.scrollTo(0, 0)
  },
  methods: {
    getTranslationList() {
      axios
        .get('/api/translation-list')
        .then((res) => {
          if (res.data.status === true) {
            this.translationList = res.data.body.translations
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },

    auth() {
      this.message = ''
      this.errors = []

      axios
        .post('/api/auth', { username: this.username, password: this.password })
        .then((res) => {
          // store access token
          localStorage.setItem('accessToken', res.data.body.accessToken)

          // store user data
          this.user = res.data.body.user
          this.permissions = res.data.body.permissions
          this.strings = res.data.strings
          localStorage.setItem('DEFAULT_LANGUAGE', res.data.body.user.language.locale)
          localStorage.setItem('username', res.data.body.user.name)
          localStorage.setItem('user', res.data.body.user)

          window.localStorage.setItem(
            'userInventory',
            JSON.stringify(res.data.body.user.inventory.id)
          )
          window.localStorage.setItem(
            'userInventoryTitle',
            JSON.stringify(res.data.body.user.inventory.title)
          )
          localStorage.setItem('permissions', res.data.body.permissions)

          window.localStorage.setItem('userName', res.data.body.user.name)
          window.localStorage.setItem('userEmail', res.data.body.user.email)
          window.localStorage.setItem('userID', res.data.body.user.id)
          localStorage.setItem('stringsData', this.translationList)

          // refresh page
          // window.location.reload()
          this.$router.push('/product-units')
          this.getTranslationList()
        })
        .catch((error) => {
          this.message = error.response.data.message
          this.errors = error.response.data.body.errors ?? []
        })
    }
  }
}
</script>

<style scoped>
.images {
  position: relative;
}
.images .tab {
  position: absolute;
  z-index: 2;
  right: -62px;
  bottom: 5px;
}
.images .mobile {
  position: absolute;
  width: 188px;
  height: 273px;
  left: -55px;
  bottom: 5px;
  z-index: 2;
}
.auth.theme-one .auto-form-wrapper .form-group .submit-btn {
  background: linear-gradient(180deg, #2e616f 0%, #5abed8 100%) 0% 0% no-repeat padding-box;
  border-radius: 50px !important;
  font-size: 15px;
  font-weight: bold;
  letter-spacing: 0.45px;
  color: #ffffff;
  border: none;
  padding-right: 58px;
  padding-left: 58px;
}
img {
  max-width: 100%;
}
@media screen and (max-width: 991px) {
  .com,
  .tab,
  .mobile {
    display: none;
  }
  .images {
    text-align: center;
  }
  .images h1 {
    margin-bottom: 16px !important;
  }
  .w-100 {
    padding: 16px !important;
  }
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px #fbfbfb inset !important;
}
</style>

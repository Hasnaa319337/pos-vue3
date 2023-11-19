<template>
  <div>
    <!-- <div class="page-head">
      <div class="page-title">
        <h1>Change Password</h1>
      </div>
      <div class="page-toolbar">
        <router-link to="/" class="btn btn-primary"
          ><i class="fa fa-angle-left"></i>
          {{ 'Dashboard'.translate() }}</router-link
        >
      </div>
    </div> -->
    <div
      class="card-header mb-3 header-sm d-flex justify-content-between align-items-center"
    >
      <h4 class="card-title">{{ trans('change password') }}</h4>
      <div class="dropdown"></div>
    </div>
    <div class="body">
      <div class="col-sm-6 col-sm-offset-3">
        <div class="portlet light">
          <div class="portlet-title">
            <div class="col-sm-12 text-center" v-if="message.length">
              <div
                class="alert"
                :class="'alert-' + alertType"
                v-html="message"
              ></div>
            </div>
            <div class="clear clearfix"></div>
          </div>
          <div class="portlet-body row">
            <form method="post" @submit.prevent="updatePassword()">
              <div>
                <label
                  >{{ trans('old password') }}
                  <input
                    type="password"
                    class="form-control"
                    name="oldPassword"
                    v-model="oldPassword"
                  />
                </label>
              </div>
              <div>
                <ValidationProvider
                  name="password"
                  rules="min:8|verify_password"
                  v-slot="{ valid, errors }"
                  class="col-6"
                >
                  <b-form-group :label="trans('new password')">
                    <b-form-input
                      v-model="newPassword"
                      type="password"
                      :state="errors[0] ? false : valid ? true : null"
                    ></b-form-input>
                    <b-form-invalid-feedback id="inputLiveFeedback">
                      {{ trans('password_validation') }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
              </div>
              <div>
                <ValidationProvider
                  name="password_confirmation"
                  rules="min:8|confirmed:password"
                  v-slot="{ valid, errors }"
                  class="col-6"
                >
                  <b-form-group :label="trans('confirm new password')">
                    <b-form-input
                      v-model="confirmNewPassword"
                      type="password"
                      :state="errors[0] ? false : valid ? true : null"
                    ></b-form-input>
                    <b-form-invalid-feedback id="inputLiveFeedback">
                      {{ trans('password_not_matching') }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
              </div>
              <div>
                <button type="submit" class="btn btn-success m-v">
                  {{ trans('update') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ChangePassword',
  data() {
    return {
      showPassword: false,
      showPassword2: false,
      message: '',
      alertType: 'success',
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    }
  },
  computed: {
    buttonLabel() {
      return this.showPassword ? 'Hide' : 'Show'
    },
  },
  methods: {
    updatePassword() {
      this.message = "<i class='fa fa-spin fa-spinner'></i>"
      this.alertType = 'info'
      let data = {
        old_password: this.oldPassword,
        password: this.newPassword,
        password_confirmation: this.confirmNewPassword,
      }
      this.message = ''
      axios
        .post('/api/profile/change-password', data)
        .then(res => {
          this.showToastError(res.data.message, res.data.custom_code)
          ;(this.oldPassword = ''),
            (this.newPassword = ''),
            (this.confirmNewPassword = '')
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },
  },
  mounted() {
    window.scrollTo(0, 0)
  },
}
</script>

<style scoped lang="scss">
.card-header {
  margin: 10px 5px;
  border-radius: 8px;
  outline: 0;
}
.body {
  justify-content: center;
  display: flex;

  h2 {
    text-align: center;
    margin: 10px 0;
  }
  .portlet-body {
    justify-content: center;

    form {
      text-align: center;

      background: #fcfcfc;
      width: 100%;
      height: 100%;
      padding: 20px;
      border-radius: 8px;
      margin: 60px 20px;
      box-shadow: 1px 2px 3px #aeb5c6;

      input {
        width: 70%;
        margin: 15px auto;
      }
    }
  }
}
</style>

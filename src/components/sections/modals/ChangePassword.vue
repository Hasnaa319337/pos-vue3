<template>
  <section>
    <b-modal
      id="change-password-modal"
      class="change-password-modal"
      ref="change-password-modal"
      centered
      scrollable
      :title="`${strings['change password']}`"
    >
      <div class="col-sm-12 text-center" v-if="message.length">
        <div class="alert" :class="'alert-' + alertType" v-html="message"></div>
      </div>
      <ValidationObserver v-slot="{ handleSubmit }" ref="form">
        <b-form @submit.prevent="handleSubmit(store)">
          <div>
            <ValidationProvider
              rules="required|min:8"
              v-slot="{ valid, errors }"
              name="old_password"
            >
              <b-form-group :label="strings['old password']">
                <b-form-input
                  type="password"
                  v-model="data.old_password"
                  :state="errors[0] ? false : valid ? true : null"
                ></b-form-input>
                <b-form-invalid-feedback id="inputLiveFeedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider
              rules="required|min:8"
              v-slot="{ valid, errors }"
              name="new_password"
            >
              <b-form-group :label="strings['new password']">
                <b-form-input
                  type="password"
                  v-model="data.new_password"
                  :state="errors[0] ? false : valid ? true : null"
                ></b-form-input>
                <b-form-invalid-feedback id="inputLiveFeedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider
              rules="required|min:8"
              v-slot="{ valid, errors }"
              name="confirm_new_password"
            >
              <b-form-group :label="strings['confirm new password']">
                <b-form-input
                  type="password"
                  v-model="data.confirm_new_password"
                  :state="errors[0] ? false : valid ? true : null"
                ></b-form-input>
                <b-form-invalid-feedback id="inputLiveFeedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
          </div>
        </b-form>
      </ValidationObserver>

      <section slot="modal-footer">
        <b-button
          size="md"
          variant="success"
          type="submit"
          @click="handleSubmit()"
        >
          OK
        </b-button>
        <b-button size="md" variant="danger" @click="cancel_action">
          Cancel
        </b-button>
      </section>
    </b-modal>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  props: ['strings'],
  data() {
    return {
      customEvents: [
        {
          eventName: 'open-change-password-modal',
          callback: this.openChangePasswordModal,
        },
      ],
      message: '',
      alertType: '',
      data: {},
    }
  },
  created() {
    ////////////////////////////////////////////////////
    //**          Custom Event Listener           ** //
    //////////////////////////////////////////////////
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      SharedEvent.listen(customEvent.eventName, customEvent.callback)
    })
  },
  destroyed() {
    ////////////////////////////////////////////////////
    //**      Remove Custom Event Listener        ** //
    //////////////////////////////////////////////////
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      SharedEvent.off(customEvent.eventName, customEvent.callback)
    })
  },
  methods: {
    openChangePasswordModal() {
      this.$refs['change-password-modal'].show()
    },
    handleSubmit() {
      this.$refs.form.validate().then(valid => {
        if (valid) {
          // Successfully validated & update the data.
          this.store()
        }
      })
    },
    store() {
      this.message = '<i class="fa fa-spinner fa-spin"></i>'
      this.alertType = 'info'
      axios
        .post('/api/user/changePassword', this.data)
        .then(res => {
          this.message = res.data.message
          if (res.data.success) {
            this.alertType = 'success'
            this.clearForm()
          } else {
            this.alertType = 'danger'
          }
        })
        .catch(err => {
          let error = err.error
          if (error.message)
            this.$bvModal.msgBoxConfirm(error.message, {
              okTitle: 'Ok',
              // cancelTitle: 'Cancel',
              hideHeaderClose: false,
              centered: true,
              modalClass: 'delete-modal',
            })
          this.$bvModal.hide('change-password-modal')
        })
    },
    cancel_action() {
      this.clearForm()
      this.$bvModal.hide('change-password-modal')
    },
    clearForm() {
      this.data = {}
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
    },
  },
}
</script>

<style lang="scss"></style>

import { TYPE } from 'vue-toastification' // or "success", "error", "default", "info" and "warning"

import Toast, { POSITION } from 'vue-toastification'
const ToastErrorMixin = {
  methods: {
    showToastError(message, code) {
      if (!code) {
        this.$toast.clear()
      } else {
        this.$toast(message, {
          timeout: 3500,
          type: code === 2000 ? 'success' : 'error',
          position: POSITION.TOP_CENTER
        })
      }
    }
  }
}

export default ToastErrorMixin

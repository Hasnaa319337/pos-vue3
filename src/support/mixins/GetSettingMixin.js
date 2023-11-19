const GetSettingMixin = {
  methods: {
    getSetting: function (key, array) {
      var result = array.find((el) => {
        if (el.key === key) {
          return el.value
        }
      })

      return result.value
    }
  }
}

export default GetSettingMixin

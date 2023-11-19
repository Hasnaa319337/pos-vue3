export default {
  methods: {
    getSetting: function (key) {
      let settings = localStorage.getItem('settings')
      var result = settings.find(el => {
        if (el.key === key) {
          return el.value
        }
      })

      return result.value
    },





    
  },
}

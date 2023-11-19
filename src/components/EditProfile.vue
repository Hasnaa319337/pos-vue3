<template>
  <div>
    <div class="page-head">
      <div class="page-title">
        <h1>Profile <small>Edit</small></h1>
      </div>
      <div class="page-toolbar">
        <router-link to="/" class="btn btn-primary"
          ><i class="fa fa-angle-left"></i> Dashboard</router-link
        >
      </div>
    </div>
    <div class="row margin-top-10">
      <div class="col-sm-12">
        <div class="portlet light">
          <div class="portlet-title">
            <div v-if="message.length" class="alert text-center alert-info">
              {{ message }}
            </div>
          </div>
          <div class="portlet-body row">
            <form method="post" @submit.prevent="updateProfile()">
              <div class="col-sm-6">
                <label
                  >Name:
                  <input
                    type="text"
                    class="form-control"
                    name="name"
                    v-model="username"
                  />
                </label>
              </div>
              <div class="col-sm-6">
                <label
                  >Email:
                  <input
                    type="email"
                    class="form-control"
                    name="email"
                    v-model="useremail"
                  />
                </label>
              </div>
              <div class="col-sm-12 text-right">
                <button type="submit" class="btn btn-success m-v">
                  Update
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
  name: 'EditProfile',
  data() {
    return {
      message: '',
      username: '',
      useremail: '',
    }
  },
  props: ['user'],
  methods: {
    updateProfile() {
      let data = {
        email: this.useremail,
        name: this.username,
      }
      this.message = ''
      axios.post('/api/update-profile', data).then(res => {
        this.message = res.data.message
        if (res.data.success) {
          localStorage.setItem('userName', this.username)
          localStorage.setItem('userEmail', this.useremail)

          this.user.name = this.username
          this.user.email = this.useremail
        } else {
          this.message = res.data.message
        }
      })
    },
  },
  mounted() {
    window.scrollTo(0, 0)
    axios.get('/api/user').then(res => {
      this.username = res.data.name
      this.useremail = res.data.email
    })
  },
}
</script>

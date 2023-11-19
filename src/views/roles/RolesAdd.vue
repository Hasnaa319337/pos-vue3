<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card roleAdd">
      <div class="card">
        <div
          class="card-header header-sm d-flex justify-content-between align-items-center"
        >
          <h4 class="card-title">{{ trans('Add Role') }}</h4>
          <div class="dropdown">
            <GoBackButton />
          </div>
        </div>
        <div
          class="card-body"
          v-if="loaded || permissions.includes('create_role')"
        >
          <div class="row align-items-center justify-content-between mb-4">
            <div class="col-sm-12">
              <ValidationObserver v-slot="{ handleSubmit }" ref="form">
                <b-form @submit.prevent="handleSubmit(store)">
                  <b-form-row>
                    <b-col class="col-6">
                      <ValidationProvider
                        v-slot="{ valid, errors }"
                        rules="required|arabicLettersAndNumbersOnly"
                        :name="trans('title') + 'ar'"
                      >
                        <b-form-group :label="trans('title') + ' (AR)  *'">
                          <b-form-input
                            type="text"
                            v-model="role.title.ar"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('This field accepts arabic words only') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>
                    <b-col class="col-6">
                      <ValidationProvider
                        v-slot="{ valid, errors }"
                        rules="required|englishLettersAndNumbersOnly"
                        :name="trans('title') + 'en'"
                      >
                        <b-form-group :label="trans('title') + ' (EN)  * '">
                          <b-form-input
                            type="text"
                            v-model="role.title.en"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('This field accepts English words only') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>
                  </b-form-row>
                  <b-form-row>
                    <b-col class="col-6">
                      <ValidationProvider
                        v-slot="{ valid, errors }"
                        rules="required"
                        :name="trans('name')"
                      >
                        <b-form-group :label="trans('slug') + ' * '">
                          <b-form-input
                            type="text"
                            v-model="role.name"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('This field accepts English words only') }}
                            {{ trans('without sapces') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>

                    <b-col
                      class="col-6"
                      style="
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        justify-items: center;
                        margin-top: 13px;
                      "
                    >
                      <v-btn
                        class="white--text permBtn"
                        color="teal"
                        @click="overlay = !overlay"
                      >
                        {{ trans('Permissions') }}
                      </v-btn>
                    </b-col>

                    <v-row justify="center">
                      <v-overlay :z-index="zIndex" :value="overlay">
                        <div class="contain">
                          <font-awesome-icon
                            style="
                              font-size: 25px;
                              position: fixed;
                              left: 45px;
                              top: 30px;
                              color: #cf1212;
                              padding: 5px;
                              border-radius: 50%;
                              cursor: pointer;
                            "
                            icon="fa fa-close"
                            @click="overlay = false"
                          />
                          <div>
                            <div
                              v-for="(group, key) in perms"
                              :key="key"
                              class="group"
                            >
                              <div
                                class="d-flex"
                                style="justify-content: space-between"
                              >
                                <h3>{{ trans(key) }}</h3>
                                <!-- <button
                                  @click="selectAllInputs(group, key)"
                                  type="button"
                                  style="
                                    color: #3fa7c2;
                                    font-size: 20px;
                                    background: none;
                                    border: none;
                                  "
                                >
                                  {{ trans('select_all') }}
                                </button> -->
                              </div>

                              <ul class="row">
                                <li
                                  v-for="prem in group"
                                  class="col-3"
                                  :key="prem"
                                >
                                  <div>
                                    <label
                                      ><input
                                        ref="input"
                                        type="checkbox"
                                        v-model="role.permissions"
                                        :value="prem.id"
                                        @click="select"
                                      />{{ prem.title }}</label
                                    >
                                  </div>
                                </li>
                              </ul>

                              <hr class="hr" />
                            </div>
                            <div
                              style="
                                left: 0;
                                position: fixed;
                                bottom: 75px;
                                width: 97%;
                                height: 55px;
                                right: -13px;
                                margin: auto;
                                background: rgb(204 204 204 / 96%);
                                border-radius: 6px;
                                display: flex;
                                justify-content: center;
                                align-items: start;
                                padding-top: 10px;
                              "
                            >
                              <v-btn @click="overlay = false" class="save">
                                {{ trans('save') }}
                              </v-btn>
                            </div>
                          </div>
                        </div>
                      </v-overlay>
                    </v-row>
                  </b-form-row>
                  <b-form-row class="justify-content-center" style="gap: 10px">
                    <b-button variant="success" type="submit">{{
                      trans('save')
                    }}</b-button>
                    <b-button variant="danger" @click="resetForm()">
                      <span style="display: block">{{ trans('cancel') }}</span>
                    </b-button>
                  </b-form-row>
                </b-form>
              </ValidationObserver>
            </div>
          </div>
        </div>
        <div v-else class="card-body text-center">
          <font-awesome-icon
            class="fa-spin-pulse"
            icon="fa-solid fa-spinner "
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'AppRolesAdd',
  props: [
    'section',
    'sections',
    'user',
    'langs',
    'language',
    'permissions',
    'languge',
  ],
  data() {
    return {
      overlay: false,
      zIndex: 1500,

      role: {
        permissions: [],
        name: '',
        guard_name: 'api',
        title: {
          ar: '',
          en: '',
        },
      },

      secs: [],
      isAllSelected: false,

      selectedCatIds: [],
      perms: [],
      selectedAll: true,
      loaded: false,
      selectedPerms: [],
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.getPermissions()
  },
  methods: {
    selectAllInputs(group, key) {
      console.log('key')
      console.log(key)
      if (this.selectedAll) {
        group.map(el => {
          if (el['group'] === key) {
            this.role.permissions.push(el['id'])
          }
        })

        this.selectedAll = false
      } else {
        group.map(el => {
          if (el['group'] == key) {
            // this.selectedPerms.push(el['id'])
            this.role.permissions.splice(el['id'])
          }
        })

        this.selectedAll = true
      }

      console.log('group')
      console.log(group)
      console.log('selectedPerms')
      console.log(this.selectedPerms)

      console.log('this.role.permissions')
      console.log(this.role.permissions)
    },

    select() {
      if (this.role.permissions.length !== this.perms.length) {
        this.isAllSelected = false
      } else {
        this.isAllSelected = true
      }
    },

    getPermissions() {
      axios.get('/api/permissions').then(res => {
        this.perms = _.groupBy(res.data.body.permissions, 'group')
      })
    },

    store() {
      let myData = {
        name: this.role.name,
        title: {
          ar: this.role.title.ar,
          en: this.role.title.en,
        },
        permissions: this.role.permissions,
        guard_name: this.role.guard_name,
      }

      axios
        .post('/api/roles', myData)
        .then(res => {
          if (res.data.status) {
            this.showToastError(res.data.message, res.data.custom_code)
            this.$nextTick(() => {
              this.$refs.form.reset()
            })
            setTimeout(() => {
              this.$router.push('/roles')
            }, 3000)
          }
        })

        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },

    resetForm() {
      ;(this.role.title.ar = ''),
        (this.role.title.en = ''),
        (this.role.guard_name = ''),
        (this.role.permissions = [])

      this.$router.push('/roles')
    },
  },
}
</script>
<style lang="scss">
.v-overlay__scrim {
  opacity: 0.7;
}

.v-overlay {
  display: block !important;
  padding: 22px;

  .contain {
    overflow-y: scroll;
    position: relative;
    background: #e4e6f2;
    border-radius: 8px;
    padding: 20px;
    color: #000;
    // width: 95%;
    height: 95%;
    margin: 0 auto;

    font-family: sans-serif !important;
    h3 {
      margin-bottom: 30px;
      font-size: 20px !important;
    }
  }

  ul {
    list-style: none;
    font-size: 17px !important;
    input {
      margin: 0 7px;
      width: 17px;
      height: 17px;
    }
  }
  .save {
    text-align: center;
    left: 50%;
    margin-bottom: -20px !important;
    position: absolute;
    z-index: 1;
    background: linear-gradient(180deg, #137b97 0%, #5dc5e0 100%) 0% 0%;
    box-shadow: 0px 1px 8px #0000000d;
    border-radius: 19px !important;
    border: none;
    padding: 8px 14px;
  }
  .permBtn {
    background: #3fa7c2 !important;
    color: white;
    width: 100%;
    border-radius: 27px;
  }
}
.permBtn {
  background: #3fa7c2 !important;
  color: white !important;
  width: 100%;
  border-radius: 27px !important;
}

.v-overlay--active {
  overflow: scroll !important;
}
.v-overlay__content {
  position: relative;
  height: 100% !important;
}
.hr:last-of-type {
  display: none;
}

.contain::-webkit-scrollbar-track {
  background: #ccc;
}
.contain::-webkit-scrollbar-thumb {
  background-color: #fff;
  border-radius: 6px;
  // border: 3px solid blue;
}
.contain::-webkit-scrollbar {
  width: 8px;
}

.roleAdd .group {
  border-bottom: 1px solid #ccc;
  padding: 20px 0;
}
</style>

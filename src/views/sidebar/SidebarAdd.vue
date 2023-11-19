<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card">
        <div
          class="card-header header-sm d-flex justify-content-between align-items-center"
        >
          <h4 class="card-title">{{ trans('SidebarAdd') }}</h4>
          <div class="dropdown">
            <GoBackButton />
          </div>
        </div>
        <div
          class="card-body"
          v-if="permissions.includes('create_sidebar')"
          style="padding: 0 15px"
        >
          <div class="row align-items-center justify-content-between mb-4">
            <div class="col-sm-12">
              <ValidationObserver v-slot="{ handleSubmit }" ref="form">
                <b-form @submit.prevent="handleSubmit(createSidebar)">
                  <b-form-row>
                    <b-col class="col-6">
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required|arabicLettersAndNumbersOnly"
                      >
                        <b-form-group :label="trans('name_ar')">
                          <b-form-input
                            type="text"
                            v-model="sidebar.title.ar"
                            required
                          ></b-form-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>
                    <b-col class="col-6">
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required|englishLettersAndNumbersOnly"
                      >
                        <b-form-group :label="trans('name_en')">
                          <b-form-input
                            type="text"
                            v-model="sidebar.title.en"
                            required
                          ></b-form-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>
                  </b-form-row>
                  <b-form-row>
                    <b-col class="col-6">
                      <ValidationProvider v-slot="{ errors }">
                        <b-form-group :label="trans('group')">
                          <b-form-select v-model="sidebar.group">
                            <b-form-select-option
                              v-for="(key, val) in sidebar_group"
                              :key="val"
                              :value="val"
                            >
                              {{ trans(val) }}
                            </b-form-select-option>
                          </b-form-select>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>

                    <b-col class="col-6">
                      <ValidationProvider v-slot="{ errors }">
                        <b-form-group :label="trans('icon')">
                          <b-form-input
                            type="text"
                            v-model="sidebar.icon"
                            required
                          ></b-form-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>
                  </b-form-row>
                  <b-form-row>
                    <b-col class="col-6">
                      <ValidationProvider v-slot="{ errors }">
                        <b-form-group :label="trans('sort')">
                          <b-form-input
                            type="number"
                            v-model="sidebar.sort"
                            required
                          ></b-form-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>
                    <b-col class="col-6">
                      <b-form-row>
                        <b-col>
                          <ValidationProvider
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <b-form-group :label="trans('allow_delete')">
                              <label class="switch">
                                <input
                                  type="checkbox"
                                  v-model="sidebar.allow_delete"
                                />
                                <span class="slider round"></span>
                                <b-form-invalid-feedback id="inputLiveFeedback">
                                  {{ errors[0] }}
                                </b-form-invalid-feedback>
                              </label>
                            </b-form-group>
                          </ValidationProvider>
                        </b-col>
                        <b-col>
                          <ValidationProvider
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <b-form-group :label="trans('is active')">
                              <label class="switch">
                                <input
                                  type="checkbox"
                                  v-model="sidebar.is_active"
                                />
                                <span class="slider round"></span>
                              </label>

                              <b-form-invalid-feedback id="inputLiveFeedback">
                                {{ errors[0] }}
                              </b-form-invalid-feedback>
                            </b-form-group>
                          </ValidationProvider>
                        </b-col>
                      </b-form-row>
                    </b-col>
                  </b-form-row>

                  <b-form-row class="justify-content-center">
                    <b-button variant="success" type="submit"
                      ><font-awesome-icon icon="fa-solid fa-check "
                    /></b-button>
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
  props: [
    'section',
    'sections',
    'user',
    'user_language',
    'langs',
    'permissions',
    'settings',
    'language',
  ],
  data() {
    return {
      sidebar: {
        title: {
          ar: '',
          en: '',
        },

        group: '',

        icon: '',
        sort: '',
        allow_delete: 0,
        is_active: 0,
        sidebar_group: [],
      },
    }
  },
  mounted() {
    this.getEnimus()
  },
  methods: {
    getEnimus() {
      axios({
        method: 'GET',
        url: '/api/enums',
      }).then(res => {
        this.sidebar_group = res.data.body.sidebar_group
      })
    },
    createSidebar() {
      axios
        .post('/api/sidebars', this.sidebar)
        .then(res => {
          if (res.data.status) {
            this.$nextTick(() => {
              this.$refs.form.reset()
            })
            this.$router.push('/sidebar')
          } else {
            this.showToastError(res.data.message, res.data.custom_code)
          }
        })

        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },
  },
}
</script>

<style></style>

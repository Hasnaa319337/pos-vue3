<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div class="card">
        <div
          class="card-header header-sm d-flex justify-content-between align-items-center"
        >
          <h4 class="card-title">{{ trans('SidebarEdit') }}</h4>
          <div class="dropdown">
            <GoBackButton />
          </div>
        </div>
        <div class="card-body" v-if="permissions.includes('update_sidebar')">
          <div class="row align-items-center justify-content-between mb-4">
            <div class="col-sm-12">
              <ValidationObserver v-slot="{ handleSubmit }" ref="form">
                <b-form @submit.prevent="handleSubmit(editSidebar)">
                  <!-- Start:: title -->
                  <b-form-row>
                    <b-col class="col-6">
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <b-form-group :label="trans('name_ar')">
                          <b-form-input
                            type="text"
                            v-model="sidebar.translation.title.ar"
                          ></b-form-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>
                    <b-col class="col-6">
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <b-form-group :label="trans('name_en')">
                          <b-form-input
                            type="text"
                            v-model="sidebar.translation.title.en"
                          ></b-form-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>
                  </b-form-row>
                  <!-- End:: Title -->

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
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <b-form-group :label="trans('icon')">
                          <b-form-input
                            type="text"
                            v-model="sidebar.icon"
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
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <b-form-group :label="trans('sort')">
                          <b-form-input
                            type="number"
                            v-model="sidebar.sort"
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
        translation: {
          title: {
            ar: '',
            en: '',
          },
        },
        slug: '',
        group: '',
        parent_slug: null,
        frontend_route_url: '',
        frontend_route_name: '',
        api_route_url: '',
        api_route_name: '',
        icon: '',
        sort: '',
        allow_delete: 0,
        is_active: 0,
        sidebar_group: [],
      },
    }
  },
  mounted() {
    this.getSidebar()
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
    editSidebar() {
      let sidebarDate = {
        title: {
          ar: this.sidebar.translation.title.ar,
          en: this.sidebar.translation.title.en,
        },
        group: this.sidebar.group,
        parent_slug: this.sidebar.parent_slug,
        is_active: this.sidebar.is_active,
        icon: this.sidebar.icon,
        sort: this.sidebar.sort,
        allow_delete: this.sidebar.allow_delete,
      }
      axios
        .put('/api/sidebars/' + this.$route.params.id, sidebarDate)
        .then(res => {
          if (res.data.status) {
            this.showToastError(res.data.message, res.data.custom_code)
            this.$router.push('/sidebar')
          }
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },
    getSidebar() {
      axios
        .get('/api/sidebars/' + this.$route.params.id)
        .then(res => {
          this.sidebar = res.data.body.sidebar
        })
        .catch(err => {})
    },
  },
}
</script>

<style>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 59px;
  height: 27px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 18px;
  width: 18px;
  left: 8px;

  bottom: 5px;
  background-color: white;

  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #52bad5;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}
</style>

<template>
  <div>
    <div class="col-sm-12 grid-margin stretch-card">
      <div
        class="card"
        v-if="loaded && permissions.includes('view_product_category')"
      >
        <div
          class="card-header mb-3 header-sm d-flex justify-content-between align-items-center"
        >
          <h4 class="card-title">{{ trans('edit_category') }}</h4>
          <div class="dropdown">
            <GoBackButton />
          </div>
        </div>
        <div class="card-body">
          <div class="row mx-0 align-items-center justify-content-between mb-4">
            <div class="col-sm-12">
              <ValidationObserver v-slot="{ handleSubmit }" ref="form">
                <b-form @submit.prevent="handleSubmit(update)">
                  <b-form-row>
                    <b-col>
                      <!-- <div v-if="category.image">
                        <b-img
                          :src="category.image"
                          width="100"
                          v-if="!changeImage"
                        />
                        <b-img :src="category.image.src" width="100" v-else />
                        <b-button
                          variant="danger"
                          @click="removeImage"
                          style="margin: 0 10px"
                        >
                          <font-awesome-icon icon="fa-solid fa-trash " />
                        </b-button>
                      </div>
                      <b-form-group :label="trans('image')">
                        <b-form-file
                          accept="image/*"
                          multiple="multiple"
                          @change="previewImage"
                          class="form-control-file"
                          style="margin-top: 20px"
                        ></b-form-file>
                      </b-form-group> -->
                      <img
                        :src="category.image"
                        class="uploading-image mb-3"
                        width="100"
                        style="display: block"
                      />
                      <input
                        style="display: block"
                        ref="image"
                        type="file"
                        accept="image/*"
                        @change="uploadImage($event)"
                        id="fileInput"
                      />
                      <span
                        class="hint"
                        style="font-size: 15px; margin-top: 9px; display: block"
                      >
                        {{ trans('the system accepts') }}</span
                      >
                    </b-col>
                  </b-form-row>
                  <b-form-row>
                    <b-col>
                      <ValidationProvider
                        rules="englishLettersAndNumbersOnly"
                        v-slot="{ valid, errors }"
                        :name="trans('title')"
                      >
                        <b-form-group :label="trans('title') + '(EN)'">
                          <b-form-input
                            type="text"
                            v-model="category.translation.title.en"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('This field accepts English words only') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>
                    <b-col>
                      <ValidationProvider
                        rules="required|arabicLettersAndNumbersOnly"
                        v-slot="{ valid, errors }"
                        :name="trans('title') + '(AR)'"
                      >
                        <b-form-group :label="trans('title') + '(AR)'">
                          <b-form-input
                            type="text"
                            v-model="category.translation.title.ar"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('This field accepts arabic words only') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>
                  </b-form-row>

                  <b-form-row>
                    <b-col>
                      <ValidationProvider
                        rules="englishLettersAndNumbersOnly"
                        v-slot="{ valid, errors }"
                        :name="trans('description')"
                      >
                        <b-form-group :label="trans('description') + '(EN)'">
                          <b-form-textarea
                            v-model="category.translation.description.en"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-textarea>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('This field accepts English words only') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>
                    <b-col>
                      <ValidationProvider
                        rules="required|arabicLettersAndNumbersOnly"
                        v-slot="{ valid, errors }"
                        :name="trans('description') + '(AR)'"
                      >
                        <b-form-group :label="trans('description') + '(AR)'">
                          <b-form-textarea
                            v-model="category.translation.description.ar"
                            :state="errors[0] ? false : valid ? true : null"
                          >
                          </b-form-textarea>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('This field accepts arabic words only') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>
                  </b-form-row>

                  <b-form-row>
                    <b-col>
                      <ValidationProvider
                        name="category"
                        v-slot="{ valid, errors }"
                      >
                        <b-form-group :label="trans('parent')">
                          <b-form-select
                            v-model="category.parent"
                            :state="errors[0] ? false : valid ? true : null"
                          >
                            <b-form-select-option value="null">
                              {{ trans('no_parent') }}
                            </b-form-select-option>
                            <b-form-select-option
                              v-for="cat in filteredCategories"
                              :value="cat.id"
                              :key="cat.id"
                            >
                              <span>{{ cat.title }}</span>
                            </b-form-select-option>
                          </b-form-select>
                          <b-form-invalid-feedback id="inputLiveFeedback">
                            {{ trans('required_field') }}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
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
      </div>
      <div class="card" v-else>
        <skeleton-loader />
      </div>
    </div>
  </div>
</template>
<script>
import SkeletonLoader from '@/components/global/SkeletonLoader.vue'
export default {
  name: 'AppCategoriesEdit',
  components: { SkeletonLoader },
  props: ['section', 'sections', 'user', 'langs', 'permissions'],
  data() {
    return {
      loaded: false,
      changeImage: false,

      categories: [],
      parent: {
        id: '',
        title: '',
      },
      category: {
        image: null,
        parent: {
          id: '',
          title: '',
        },
        parent_id: '',
        translation: {
          title: {
            ar: '',
            en: '',
          },
          description: {
            ar: '',
            en: '',
          },
        },
      },
      strings: [],
      showForm: false,
      myCurrentCatId: '',
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.refresh()
    this.getCategories()

    this.myCurrentCatId = this.$route.params.id
  },
  computed: {
    filteredCategories() {
      return this.categories.filter(cat => cat.id != this.myCurrentCatId)
    },
  },
  methods: {
    uploadImage(e) {
      this.category.image = e
      console.log(e)
    },
    refresh() {
      axios
        .get('/api/product-categories/' + this.$route.params.id)
        .then(res => {
          this.category = res.data.body.category
          this.loaded = true
          if (this.category.image == null) {
            this.category.image = ''
          }
          this.parent = this.category.parent
          this.parent_id = this.parent.id
          console.log(this.parent.id)
          console.log(this.parent_id)
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },
    getCategories() {
      axios
        .get('/api/product-categories/create')
        .then(res => {
          this.categories = res.data.body.categories
        })
        .catch(error => {
          this.showToastError(
            error.response.data.message,
            error.response.data.custom_code
          )
        })
    },
    update() {
      const file = this.$refs.image.files[0]
      const data = new FormData()
      data.append('id', this.$route.params.id)
      data.append('image', file || '')
      data.append('parent', this.category.parent || '')

      data.append('title[ar]', this.category.translation.title.ar)
      data.append('title[en]', this.category.translation.title.en)
      data.append('description[ar]', this.category.translation.description.ar)
      data.append('description[en]', this.category.translation.description.en)

      {
        axios
          .post(
            '/api/product-categories/' + this.$route.params.id + '?_method=put',
            data,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          )
          .then(res => {
            if (res.data.status) {
              this.category.image = res.data.url
              this.showToastError(res.data.message, res.data.custom_code)
              setTimeout(() => {
                this.$router.push('/categories')
              }, 1500)
              this.$nextTick(() => {
                this.$refs.form.reset()
              })
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
      }
    },

    removeImage: function (e) {
      this.category.image = ''
    },
  },
}
</script>

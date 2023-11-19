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
          <h4 class="card-title">{{ trans('category_show') }}</h4>
          <div class="dropdown">
            <GoBackButton />
          </div>
        </div>
        <div class="card-body">
          <div class="row mx-0 align-items-center justify-content-between mb-4">
            <div class="col-sm-12">
              <b-form>
                <b-form-row>
                  <b-col>
                    <img
                      :src="
                        category.image
                          ? category.image
                          : getSetting('default_image')
                      "
                      class="uploading-image mb-3"
                      width="100"
                      style="display: block"
                    />
                  </b-col>
                </b-form-row>
                <b-form-row>
                  <b-col>
                    <b-form-group :label="trans('title') + '(EN)'">
                      <b-form-input
                        disabled
                        type="text"
                        v-model="category.translation.title.en"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group :label="trans('title') + '(AR)'">
                      <b-form-input
                        type="text"
                        disabled
                        v-model="category.translation.title.ar"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-form-row>

                <b-form-row>
                  <b-col>
                    <b-form-group :label="trans('description') + '(EN)'">
                      <b-form-textarea
                        disabled
                        v-model="category.translation.description.en"
                      ></b-form-textarea>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group :label="trans('description') + '(AR)'">
                      <b-form-textarea
                        disabled
                        v-model="category.translation.description.ar"
                      >
                      </b-form-textarea>
                    </b-form-group>
                  </b-col>
                </b-form-row>

                <b-form-row>
                  <b-col>
                    <b-form-group :label="trans('parent')">
                      <b-form-select
                        disabled
                        style="background-color: #e9ecef; color: #000"
                        v-model="category.parent"
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
                    </b-form-group>
                  </b-col>
                </b-form-row>
              </b-form>
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
  props: ['section', 'sections', 'user', 'langs', 'permissions', 'settings'],
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
    getSetting(key) {
      const result = this.settings.find(el => {
        if (el.key === key) {
          return el.value
        }
      })
      return result.value
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
  },
}
</script>

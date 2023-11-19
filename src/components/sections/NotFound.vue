<template>
  <div class="col-sm-12 grid-margin stretch-card">
    <div class="card">
      <div class="row justify-content-center">
        <div class="col-12 text-center">
          <img src="@/assets/images/404.png" alt="404" class="img-fluid" />
        </div>
        <div class="col-12 text-center">
          <h1 v-if="user.language == 'en'">This page not found</h1>
          <h1 v-else>هذه الصفحة غير متوفرة</h1>
        </div>
        <div class="col-lg-6 col-12 text-center">
          <p v-if="user.language == 'en'">
            The page you trying to reach not found please return to homepage
          </p>
          <p v-else>
            هذه الصفحة التي تحاول الوصول اليها غير متوفره الرجاء الرجوع للصفحة
            الرئيسية
          </p>
        </div>
        <div class="col-12 text-center">
          <router-link to="/" class="btn">
            <div v-if="user.language == 'en'">
              <font-awesome-icon icon="fa-solid fa-house" />
              Homepage
            </div>
            <div v-else>
              <font-awesome-icon icon="fa-solid fa-house" />
              الصفحه الرئيسيه
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['section', 'sections', 'user', 'user_language'],
  mounted() {
    window.scrollTo(0, 0)
  },
}
</script>

<style scoped>
h1 {
  font-size: 54px;
  font-weight: bold;
  color: #000000;
  margin-top: 20px;
}
p {
  font-size: 21px;
  font-weight: 300;
  color: #000000;
}
img {
  max-height: 300px;
}
.btn {
  background: linear-gradient(180deg, #2e616f 0%, #5abed8 100%) 0% 0% no-repeat
    padding-box;
  border-radius: 50px !important;
  font-size: 15px;
  font-weight: bold;
  letter-spacing: 0.45px;
  color: #ffffff;
  border: none;
}
</style>

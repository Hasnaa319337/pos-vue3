<template>
  <footer class="footer">
    <div class="container-fluid clearfix">
      <div class="row justify-content-between align-items-center">
        <div class="col-auto text-left copy p-0">
          <span class="d-inline-block"
            >جميع الحقوق محفوظة © 2022
            <a href="https://7lpos.com/?lang=ar" target="_blank">7lpos</a></span
          >
          <span class="d-inline-block"> | V 0.2 </span>
        </div>
        <div class="col-auto text-right p-0">
          <img src="@/assets/images/logo.png" alt="" height="35" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>
<style scoped>
footer.footer {
  /* padding: 25px 50px 18px; */
  padding: 10px !important;
  position: fixed;
  width: 100%;
  margin: 0 auto;
  bottom: 0;
  display: block;
  background-color: #fcfcfc;
  border: none !important;
  right: 0;
  /* z-index: 1050; */
}
.copy {
  font-size: 18px;
  font-weight: 300;
  color: #101010;
}
@media (max-width: 768px) {
  footer {
    display: none !important;
  }
}
</style>

<template>
  <div>Logging you out</div>
</template>
<script>
export default {
  name: 'Logout',
  mounted() {
    localStorage.clear()
    window.location.href = '/jit_sys/'
    // this.$router.go('/');
  },
}
</script>

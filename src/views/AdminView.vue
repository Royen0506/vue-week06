<template>
  <div class="text-center">
    <div class="h1">這是後台</div>
    <RouterLink to="/">返回首頁</RouterLink>|
    <RouterLink to="/admin/products">後台產品列表</RouterLink>|
    <RouterLink to="/admin/orders">所有訂單</RouterLink>| <a @click.prevent="resetToken">登出</a>
  </div>
  <VueLoading :active="isLoading" />

  <RouterView v-if="isCheck" />
</template>

<script>
export default {
  data() {
    return {
      isCheck: false,
      isLoading: false
    }
  },

  mounted() {
    this.isLoading = true

    this.checkUserInfo()
  },

  methods: {
    resetToken() {
      this.isLoading = true
      document.cookie = `myToken='';`
      setTimeout(() => {
        alert('將跳轉至登入頁面')
        this.isLoading = false
        this.$router.push('/login')
      }, 1000)
    },

    checkUserInfo() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.$http.defaults.headers.common['Authorization'] = token
      const { VITE_API_URL } = import.meta.env
      this.$http
        .post(`${VITE_API_URL}/v2/api/user/check`, token)
        .then((res) => {
          this.isCheck = true
          this.isLoading = false
        })
        .catch((err) => {
          alert(`${err.response.data.message}，將跳轉至登入頁面`)
          this.isLoading = true
          setTimeout(() => {
            this.$router.push('/login')
          }, 1000)
        })
    }
  }
}
</script>

<style scoped lang="scss">
a {
  color: black;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  &.active {
    color: slategrey;
  }
}
</style>

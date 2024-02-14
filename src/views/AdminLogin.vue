<template>
  <div class="h3 my-4 text-center">這是登入頁面</div>

  <div class="row justify-content-center">
    <form id="form" class="form-signin col-5 text-start">
      <div class="form mb-3">
        <label for="username">Email address</label>
        <input
          type="email"
          class="form-control mt-1"
          id="username"
          placeholder="name@example.com"
          required
          autofocus
          v-model="username"
        />
      </div>
      <div class="form">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control mt-1"
          id="password"
          placeholder="Password"
          required
          autocomplete
          v-model="password"
        />
      </div>
      <button class="btn btn-lg btn-primary w-100 mt-3" type="submit" @click.prevent="signIn">
        登入
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: '',
      username: ''
    }
  },

  mounted() {},

  methods: {
    signIn() {
      let obj = {
        username: this.username,
        password: this.password
      }
      const { VITE_API_URL } = import.meta.env
      this.axios
        .post(`${VITE_API_URL}/v2/admin/signin`, obj)
        .then((res) => {
          const { token, expired } = res.data
          document.cookie = `myToken=${token}; expires=${expired};`
          alert(res.data.message)
          this.$router.push('/admin/products')
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    }
  }
}
</script>

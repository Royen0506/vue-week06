<template>
  <div class="text-center">
    <div class="h1">這是前台</div>
    <div class="mb-3">
      <RouterLink class="/custom-link" to="/">首頁</RouterLink>|
      <RouterLink to="/UserProducts">前台產品列表</RouterLink>|
      <RouterLink to="/UserCart">前台購物車</RouterLink>|
      <RouterLink to="/admin/products">後台產品列表</RouterLink>
    </div>
  </div>

  <RouterView />
</template>

<style scoped lang="scss">
a {
  color: black;
  text-decoration: none;
  font-weight: bold;
  &.active {
    color: slategrey;
  }
}
</style>

<template>
  <div class="h3 mt-3">這是所有訂單</div>
  <VueLoading :active="isLoading" />

  <table class="table mt-4">
    <thead>
      <tr class="text-center">
        <th width="120">訂單建立日期</th>
        <th width="120">訂購人</th>
        <th width="120">訂購項目</th>
        <th width="60">訂單總額</th>
        <th width="80">是否已付款</th>
        <th width="100">訂單資訊</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in orders" :key="item.id">
        <td class="text-center">{{ new Date(item.create_at).toLocaleDateString() }}</td>
        <td class="text-center">
          {{ item.user.name }}
        </td>
        <td class="text-center">
          <span :key="item" v-for="item in item.products">{{ item.product.title }}</span>
        </td>
        <td class="text-end">{{ item.total }}</td>
        <td class="text-center">
          <span v-if="item.is_paid" class="text-success">已付款</span>
          <span v-else class="text-danger">未付款</span>
        </td>
        <td class="text-center">
          <button type="button" class="disabled btn btn-outline-primary btn-sm">
            編輯/查看更多
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <Pagination :page="pagination" @emit-page="getData" />
</template>

<script>
import Pagination from '../components/PaginationComponent.vue'

export default {
  data() {
    return {
      isLoading: false,
      orders: [],
      pagination: {}
    }
  },
  components: { Pagination },

  mounted() {
    this.getData()
  },

  methods: {
    getData(num = 1) {
      this.isLoading = true
      const { VITE_API_URL, VITE_API_PATH } = import.meta.env
      this.axios
        .get(`${VITE_API_URL}/v2/api/${VITE_API_PATH}/admin/orders?page=${num}`)
        .then((res) => {
          this.orders = res.data.orders
          this.pagination = res.data.pagination
          this.isLoading = false
        })
    }
  }
}
</script>

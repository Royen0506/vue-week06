<template>
  <div class="h3 mb-3">這是前台產品列表</div>
  <VueLoading :active="isLoading" />
  <ModalComponent @emit-modal="getBsModal" :modal-txt="modalTxt" />

  <table class="table align-middle">
    <thead>
      <tr>
        <th>圖片</th>
        <th>商品名稱</th>
        <th>價格</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in productList" :key="item.id">
        <td style="width: 200px">
          <div
            :style="{ backgroundImage: `url(${item.imageUrl})` }"
            style="height: 100px; background-size: cover; background-position: center"
          ></div>
        </td>
        <td>
          {{ item.title }}
        </td>
        <td>
          <!-- <div class="h5">{{ item.price }} 元</div> -->
          <del class="h6">原價 {{ item.origin_price }} 元</del>
          <div class="h5">現在只要 {{ item.price }} 元</div>
        </td>
        <td>
          <div class="btn-group btn-group-sm">
            <button
              @click.prevent="watchDetails(item.id)"
              type="button"
              class="btn btn-outline-secondary"
            >
              查看更多
            </button>
            <button @click="addToCart(item.id)" type="button" class="btn btn-outline-danger">
              加到購物車
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import ModalComponent from '../components/ModalComponent.vue'

export default {
  data() {
    return {
      productList: [],
      isLoading: false,
      qty: 1,
      modalTxt: '',
      bsModal: null
    }
  },

  mounted() {
    this.getData()
  },

  components: { ModalComponent },

  methods: {
    getData() {
      this.isLoading = true
      const { VITE_API_URL, VITE_API_PATH } = import.meta.env
      this.axios.get(`${VITE_API_URL}/v2/api/${VITE_API_PATH}/products/all`).then((res) => {
        this.productList = res.data.products
        this.isLoading = false
      })
    },

    watchDetails(id) {
      this.$router.push(`/UserProducts/${id}`)
    },

    addToCart(id) {
      this.isLoading = true
      const { VITE_API_URL, VITE_API_PATH } = import.meta.env
      let obj = {
        product_id: id,
        qty: this.qty
      }

      this.axios.post(`${VITE_API_URL}/v2/api/${VITE_API_PATH}/cart`, { data: obj }).then((res) => {
        this.isLoading = false
        this.modalTxt = res.data.message
        this.bsModal.show()
      })
    },

    getBsModal(modal) {
      this.bsModal = modal
    }
  }
}
</script>

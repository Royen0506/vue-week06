<template>
  <VueLoading :active="isLoading" />
  <ModalComponent @emit-modal="getBsModal" :modal-txt="modalTxt" />

  <div class="h3 mb-3">這是產品細項</div>

  <div class="row row-cols-1 row-cols-lg-2">
    <div>
      <img
        style="height: 400px; width: 600px"
        class="img-fluid object-fit-cover rounded-3"
        :src="product.imageUrl"
        :alt="product.title"
      />
    </div>
    <div class="align-self-center">
      <div class="h4 mt-3 mt-lg-0 fw-bold">
        {{ product.title }}
      </div>
      <span class="badge bg-secondary">{{ product.category }}</span>
      <div class="d-flex mt-0 mt-lg-4">
        <div class="h5 me-2">特價：${{ product.price }}/{{ product.unit }}</div>
        <del>${{ product.origin_price }}/{{ product.unit }}</del>
      </div>
      <p class="">{{ product.description }}</p>
      <div class="input-group">
        <input type="number" class="form-control" min="1" v-model="qty" />
        <button type="button" class="btn btn-outline-dark" @click.prevent="addToCart(product.id)">
          加入購物車
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ModalComponent from '../components/ModalComponent.vue'

export default {
  data() {
    return {
      product: [],
      isLoading: false,
      qty: 1,
      bsModal: null,
      modalTxt: ''
    }
  },

  mounted() {
    this.getProduct()
  },

  components: { ModalComponent },

  methods: {
    getProduct() {
      this.isLoading = true
      const { VITE_API_URL, VITE_API_PATH } = import.meta.env
      const { id } = this.$route.params
      this.axios.get(`${VITE_API_URL}/v2/api/${VITE_API_PATH}/product/${id}`).then((res) => {
        this.product = res.data.product
        this.isLoading = false
      })
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

<template>
  <div class="h3 mt-3 mb-0">這是後台產品列表</div>
  <div class="text-end">
    <button @click="(isNew = true), (tempProduct = {})" class="btn btn-primary me-3">
      新增產品
    </button>
  </div>
  <VueLoading :active="isLoading" />
  <ModalComponent
    @emit-modal="getBsModal"
    :modal-txt="modalTxt"
    :is-admin-delete-product="isDeleteAdminProduct"
    :item-id="itemId"
    @emit-get-product="getProductData"
  />

  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="120">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in product" :key="item.id">
        <td>{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <td class="text-end">{{ item.origin_price }}</td>
        <td class="text-end">{{ item.price }}</td>
        <td>
          <span v-if="item.is_enabled == 1" class="text-success">啟用</span>
          <span v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click.prevent="editProduct(item)"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="openDeleteModal(item.title, item.id)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <Pagination :page="pagination" @emit-page="getProductData" />

  <div
    v-if="tempProduct || isNew"
    class="row justify-content-center mt-4 bg-light py-3 px-2 rounded-3"
  >
    <div class="d-flex justify-content-end">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style="cursor: pointer"
        width="30"
        height="30"
        fill="currentColor"
        class="bi bi-x-lg"
        viewBox="0 0 16 16"
        @click="closeEditComponent"
      >
        <path
          d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"
        />
      </svg>
    </div>
    <div v-if="!isNew" class="h3 fw-bold text-center mb-2">編輯產品</div>
    <div v-else class="h3 fw-bold text-center mb-2">新增產品</div>
    <div class="col-12 col-lg-6">
      <div class="mb-3">
        <label for="unit" class="form-label fw-bold">產品單位</label>
        <input id="unit" class="form-control" type="text" v-model="tempProduct.unit" />
      </div>
      <div class="mb-3">
        <label for="mainImg" class="form-label fw-bold">產品主圖</label>
        <input id="mainImg" class="form-control" type="text" v-model="tempProduct.imageUrl" />
        <img style="height: 300px" class="img-fluid mt-2" :src="tempProduct.imageUrl" alt="" />
      </div>
      <div v-if="tempProduct.imagesUrl" class="mb-3">
        <label for="Imgs" class="form-label fw-bold">多圖編輯</label>
        <div v-for="(item, key) in tempProduct.imagesUrl" :key="key">
          <input
            id="Imgs"
            class="form-control mt-2"
            type="text"
            v-model="tempProduct.imagesUrl[key]"
          />
          <img style="height: 300px" class="img-fluid mt-2" :src="item" alt="" />
        </div>
        <div class="mt-2">
          <div class="text-lg-start text-center">
            <button
              v-if="
                !tempProduct.imagesUrl.length ||
                tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]
              "
              @click="tempProduct.imagesUrl.push('')"
              class="btn btn-outline-primary"
            >
              新增圖片
            </button>
            <button v-else class="btn btn-outline-danger" @click="tempProduct.imagesUrl.pop()">
              刪除圖片
            </button>
          </div>
        </div>
      </div>
      <button @click="addImage" v-else class="btn btn-outline-primary text-lg-start text-center">
        新增圖片
      </button>
    </div>
    <div class="col-12 col-lg-6">
      <div class="mb-3">
        <label for="category" class="form-label fw-bold">種類</label>
        <input type="text" class="form-control" id="category" v-model="tempProduct.category" />
      </div>
      <div class="mb-3">
        <label for="originPrice" class="form-label fw-bold">產品原價</label>
        <input
          id="originPrice"
          class="form-control"
          type="number"
          v-model.number="tempProduct.origin_price"
        />
      </div>
      <div class="mb-3">
        <label for="price" class="form-label fw-bold">售價</label>
        <input id="price" class="form-control" type="number" v-model.number="tempProduct.price" />
      </div>
      <div class="mb-3">
        <label for="title" class="form-label fw-bold">產品名稱</label>
        <input id="title" class="form-control" type="text" v-model="tempProduct.title" />
      </div>
      <div class="mb-3">
        <label for="content" class="form-label fw-bold">產品內容</label>
        <textarea
          type="text"
          class="form-control"
          id="content"
          v-model="tempProduct.content"
          rows="10"
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label fw-bold">產品描述</label>
        <textarea
          type="text"
          class="form-control"
          id="description"
          v-model="tempProduct.description"
          rows="5"
        />
      </div>
      <div class="mb-3">
        <input
          class="form-check-input"
          type="checkbox"
          v-model="tempProduct.is_enabled"
          true-value="1"
          false-value="0"
          id="productStatus"
        />
        <label class="form-check-label" for="productStatus">是否啟用</label>
      </div>
      <div class="text-center">
        <button v-if="!isNew" class="btn btn-primary" @click="confirmEdit(tempProduct)">
          確認編輯
        </button>
        <button v-else class="btn btn-primary" @click="addProduct(tempProduct)">確認新增</button>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '../components/PaginationComponent.vue'
import ModalComponent from '../components/ModalComponent.vue'

export default {
  data() {
    return {
      product: [],
      pagination: {},
      isLoading: true,
      bsModal: null,
      isDeleteAdminProduct: false,
      modalTxt: '',
      itemId: '',
      tempProduct: '',
      isNew: false
    }
  },

  components: { Pagination, ModalComponent },

  mounted() {
    this.getProductData()
  },

  methods: {
    getProductData(num = 1) {
      this.isLoading = true
      const { VITE_API_URL, VITE_API_PATH } = import.meta.env
      this.$http
        .get(`${VITE_API_URL}/v2/api/${VITE_API_PATH}/admin/products?page=${num}`)
        .then((res) => {
          this.product = res.data.products
          this.pagination = res.data.pagination
          this.closeEditComponent()
          this.isLoading = false
        })
    },

    openDeleteModal(title, id) {
      this.isDeleteAdminProduct = true
      this.modalTxt = title
      this.itemId = id
      this.bsModal.show()
    },

    getBsModal(modal) {
      this.bsModal = modal
    },

    addImage() {
      this.tempProduct.imagesUrl = []
      this.tempProduct.imagesUrl.push('')
    },

    editProduct(item) {
      this.tempProduct = item
      this.isNew = false
    },

    closeEditComponent() {
      this.tempProduct = ''
      this.isNew = false
    },

    confirmEdit(item) {
      this.isLoading = true
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      const { VITE_API_URL, VITE_API_PATH } = import.meta.env
      this.$http.defaults.headers.common['Authorization'] = token
      this.$http
        .put(`${VITE_API_URL}/v2/api/${VITE_API_PATH}/admin/product/${item.id}`, {
          data: item
        })
        .then((res) => {
          this.modalTxt = res.data.message
          this.closeEditComponent()
          this.getProductData(this.pagination.current_page)
          this.isLoading = false
          this.bsModal.show()
        })
    },

    addProduct() {
      this.isLoading = true
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      const { VITE_API_URL, VITE_API_PATH } = import.meta.env
      this.$http.defaults.headers.common['Authorization'] = token
      this.$http
        .post(`${VITE_API_URL}/v2/api/${VITE_API_PATH}/admin/product`, {
          data: this.tempProduct
        })
        .then((res) => {
          this.modalTxt = res.data.message
          this.closeEditComponent()
          this.getProductData(this.pagination.current_page)
          this.isLoading = false
          this.bsModal.show()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

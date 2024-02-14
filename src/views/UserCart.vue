<template>
  <div class="h3 mb-3">這是前台購物車列表</div>
  <VueLoading :active="isLoading" />
  <ModalComponent @emit-modal="getBsModal" :modal-txt="modalTxt" />

  <div class="container">
    <div class="row justify-content-center">
      <div class="col-6">
        <table class="table align-middle">
          <thead>
            <tr>
              <th></th>
              <th>品名</th>
              <th style="width: 150px">數量/單位</th>
              <th>單價</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartList.carts" :key="item.id">
              <td>
                <button
                  @click="deleteCart(item.id)"
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                >
                  x
                </button>
              </td>
              <td>
                {{ item.product.title }}
                <div class="text-success">已套用優惠券</div>
              </td>
              <td>
                <div class="input-group input-group-sm">
                  <div class="input-group mb-3">
                    <input
                      min="1"
                      type="number"
                      v-model="item.qty"
                      class="form-control"
                      value="item.qty"
                      @blur="updateCartList(item.id, item.qty)"
                    />
                    <span class="input-group-text" id="basic-addon2">{{ item.product.unit }}</span>
                  </div>
                </div>
              </td>
              <td class="text-end">
                <small class="text-success">折扣價：</small>
                {{ item.total }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end">{{ cartList.total }}</td>
            </tr>
            <tr>
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">{{ cartList.final_total }}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div class="my-5 row justify-content-center">
        <v-form ref="form" class="col-6" v-slot="{ errors }" @submit="onSubmit">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <v-field
              :class="{ 'is-invalid': errors['email'] }"
              id="email"
              name="email"
              type="email"
              rules="email|required"
              class="form-control"
              placeholder="請輸入 Email"
              v-model="orderInfo.user.email"
            ></v-field>
            <error-message name="email" class="invalid-feedback"></error-message>
          </div>

          <div class="mb-3">
            <label for="name" class="form-label">收件人姓名</label>
            <v-field
              id="name"
              name="姓名"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['姓名'] }"
              rules="required"
              placeholder="請輸入姓名"
              v-model="orderInfo.user.name"
            />
            <error-message name="姓名" class="invalid-feedback"></error-message>
          </div>

          <div class="mb-3">
            <label for="tel" class="form-label">收件人電話</label>
            <v-field
              id="tel"
              name="電話"
              type="tel"
              :rules="isPhone"
              class="form-control"
              :class="{ 'is-invalid': errors['電話'] }"
              placeholder="請輸入電話"
              v-model="orderInfo.user.tel"
            />
            <error-message name="電話" class="invalid-feedback"></error-message>
          </div>

          <div class="mb-3">
            <label for="address" class="form-label">收件人地址</label>
            <v-field
              id="address"
              name="地址"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['地址'] }"
              rules="required"
              placeholder="請輸入地址"
              v-model="orderInfo.user.address"
            />
            <error-message name="地址" class="invalid-feedback"></error-message>
          </div>

          <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <v-field
              as="textarea"
              id="message"
              class="form-control"
              cols="30"
              rows="10"
              name="留言"
              v-model="orderInfo.message"
            />
            <error-message name="留言" class="invalid-feedback"></error-message>
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-danger">送出訂單</button>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import ModalComponent from '../components/ModalComponent.vue'

export default {
  data() {
    return {
      isLoading: false,
      cartList: [],
      modalTxt: '',
      bsModal: null,
      orderInfo: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },

  mounted() {
    this.getCartList()
  },

  components: { ModalComponent },

  methods: {
    getCartList() {
      this.isLoading = true
      const { VITE_API_URL, VITE_API_PATH } = import.meta.env
      this.axios.get(`${VITE_API_URL}/v2/api/${VITE_API_PATH}/cart`).then((res) => {
        this.cartList = res.data.data
        this.isLoading = false
      })
    },

    deleteCart(id) {
      this.isLoading = true
      const { VITE_API_URL, VITE_API_PATH } = import.meta.env
      this.axios
        .delete(`${VITE_API_URL}/v2/api/${VITE_API_PATH}/cart/${id}`)
        .then((res) => {
          this.isLoading = false
          this.modalTxt = res.data.message
          this.bsModal.show()
          this.getCartList()
        })
        .catch((err) => {
          console.log(err)
        })
    },

    getBsModal(modal) {
      this.bsModal = modal
    },

    updateCartList(id, qty) {
      this.isLoading = true
      const { VITE_API_URL, VITE_API_PATH } = import.meta.env
      const obj = {
        product_id: id,
        qty
      }
      this.axios
        .put(`${VITE_API_URL}/v2/api/${VITE_API_PATH}/cart/${id}`, { data: obj })
        .then((res) => {
          this.isLoading = false
          this.modalTxt = res.data.message
          this.bsModal.show()
          this.getCartList()
        })
        .catch((err) => {
          console.log(err)
          this.isLoading = false
        })
    },

    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    },

    onSubmit() {
      console.log(this.cartList.carts.length)
      if (this.cartList.carts.length > 0) {
        this.isLoading = true
        const { VITE_API_URL, VITE_API_PATH } = import.meta.env
        this.axios
          .post(`${VITE_API_URL}/v2/api/${VITE_API_PATH}/order`, { data: this.orderInfo })
          .then((res) => {
            this.isLoading = false
            this.modalTxt = res.data.message
            this.bsModal.show()
            this.$refs.form.resetForm()
            this.getCartList()
          })
          .catch((err) => {
            this.modalTxt = err.response.data.message
            this.bsModal.show()
            this.isLoading = false
          })
      } else {
        this.modalTxt = '購物車內無品項'
        return this.bsModal.show()
      }
    }
  }
}
</script>

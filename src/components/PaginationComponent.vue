<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item">
        <a
          @click.prevent="emitPage(page.current_page - 1)"
          class="page-link"
          :class="{ disabled: !page.has_pre }"
          href="#"
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="(item, key) in page.total_pages" :key="`${key}${item}`">
        <a
          @click.prevent="emitPage((page.current_pages = item))"
          class="page-link"
          :class="{ active: page.current_page == item }"
          href="#"
          >{{ item }}</a
        >
      </li>
      <li class="page-item">
        <a
          @click.prevent="emitPage(page.current_page + 1)"
          class="page-link"
          :class="{ disabled: !page.has_next }"
          href="#"
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: ['page'],

  methods: {
    emitPage(num) {
      this.$emit('emitPage', num)
    }
  }
}
</script>

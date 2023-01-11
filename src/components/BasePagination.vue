<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        aria-label="Предыдущая страница"
        @click.prevent="prevPage"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="img/svg/sprite.svg#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <a
        href="#"
        class="pagination__link"
        :class="{ 'pagination__link--current': pageNumber === page }"
        @click.prevent="paginate(pageNumber)"
        >{{ pageNumber }}</a
      >
    </li>
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        href="#"
        aria-label="Следующая страница"
        @click.prevent="nextPage"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="img/svg/sprite.svg#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>
<script>
export default {
  props: ['page', 'count', 'perPage'],
  emits: ['update:page'],
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage)
    },
    nextPage() {
      if((this.page + 1) > this.pages) {
        return this.paginate(1)
      }
      return this.paginate(this.page + 1)
    },
    prevPage() {
      if((this.page - 1) < 1) {
        return this.paginate(this.pages)
      }
      return this.paginate(this.page - 1)
    }
  },
  methods: {
    paginate(page) {
      this.$emit('update:page', page)
    },
  },
}
</script>

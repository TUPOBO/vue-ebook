<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-content-search-icon">
          <span class="icon-search"></span>
        </div>
        <input
          type="text"
          class="slide-content-search-input"
          @click="showSearchPage()"
          :placeholder="$t(`book.searchHint`)"
        >
      </div>
      <div
        class="slide-contents-search-cancel"
        v-show="searchVisible"
        @click="hideSearchPage()"
      >{{$t(`book.cancel`)}}</div>
    </div>
  </div>
</template>

<script>
import { ebookMixin } from '@/utils/mixin'
export default {
  data() {
    return {
      searchVisible: false
    }
  },
  mixins: [ebookMixin],
  methods: {
    showSearchPage() {
      this.searchVisible = true
    },
    hideSearchPage() {
      this.searchVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global.scss';
.ebook-slide-contents {
  width: 100%;
  .slide-contents-search-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(48);
    margin: px2rem(20) 0 px2rem(10) 0;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-contents-search-input-wrapper {
      flex: 1;
      @include center;
      .slide-content-search-icon {
        flex: 0 0 px2rem(28);
        @include center;
        font-size: px2rem(14);
      }
      .slide-content-search-input {
        flex: 1;
        font-size: px2rem(14);
        background: transparent;
        border: none;
        &:focus {
          outline: none;
        }
      }
    }
    .slide-contents-search-cancel {
      flex: 0 0 px2rem(50);
      font-size: px2rem(14);
      @include right;
    }
  }
}
</style>

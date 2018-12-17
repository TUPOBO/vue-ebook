<template>
  <transition name="popup-slide-up">
    <div class="ebook-popup-list" v-show="fontFamilyVisible">
      <div class="ebook-popup-title">
        <div class="ebook-popup-title-icon" @click="hide">
          <span class="icon-down2"></span>
        </div>
        <span class="ebook-popup-title-text">{{$t('book.selectFont')}}</span>
      </div>
      <div class="ebook-popup-list-wrapper">
        <div
          class="ebook-popup-item"
          v-for="(item, index) in fontFamilyList"
          :key="index"
          @click="setFontFamily(item.font)"
        >
          <div class="ebook-popup-item-text" :class="{'selected': isSelected(item)}">{{item.font}}</div>
          <div class="ebook-popup-item-icon" v-if="isSelected(item)">
            <span class="icon-check"></span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from '@/utils/mixin'
import { FONT_FAMILY_LIST } from '@/utils/book'
import { saveFontFamily } from '@/utils/localStorage'
export default {
  data() {
    return { fontFamilyList: [...FONT_FAMILY_LIST] }
  },
  mixins: [ebookMixin],
  methods: {
    hide() {
      this.setFontFamilyVisible(false)
    },
    isSelected(item) {
      return this.defaultFontFamily === item.font
    },
    setFontFamily(font) {
      this.setDefaultFontFamily(font)
      saveFontFamily(this.fileName, font)
      if (font === 'Default') {
        this.currentBook.rendition.themes.font('Franklin Gothic Medium')
      } else {
        this.currentBook.rendition.themes.font(font)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/global.scss';
.ebook-popup-list {
  position: absolute;
  bottom: 0;
  left: 0;
  background: white;
  z-index: 300;
  width: 100%;
  box-shadow: 0 px2rem(-4) px2rem(6) rgba(0, 0, 0, 0.1);
  .ebook-popup-title {
    position: relative;
    box-sizing: border-box;
    padding: px2rem(15);
    border-bottom: px2rem(1) solid #b8b9bb;
    text-align: center;
    @include center;
    .ebook-popup-title-icon {
      position: absolute;
      left: px2rem(15);
      top: 0;
      height: 100%;
      font-size: px2rem(16);
      font-weight: bold;
      @include center;
    }
    .ebook-popup-title-text {
      font-size: px2rem(14);
      font-weight: bold;
    }
  }
  .ebook-popup-list-wrapper {
    .ebook-popup-item {
      display: flex;
      padding: px2rem(15);
      .ebook-popup-item-text {
        flex: 1;
        text-align: left;
        font-size: px2rem(14);
        &.selected {
          color: #346cb9;
          font-weight: bold;
        }
      }
      .ebook-popup-item-icon {
        flex: 1;
        text-align: right;
        font-size: px2rem(14);
        font-weight: bold;
        color: #346cb9;
      }
    }
  }
}
</style>

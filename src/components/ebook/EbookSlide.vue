<template>
  <transition name="fade">
    <div class="slide-content-wrapper" v-show="tittleVisible && settingVisible === 3">
      <transition name="slide-right">
        <div class="content" v-if="settingVisible === 3">
          <div class="content-page-wrapper">
            <div class="content-page">
              <component :is="currentTab === 0 ? content : bookmark"></component>
            </div>
            <div class="content-page-tab">
              <div
                class="content-page-tab-item"
                :class="{'selected': currentTab === 0}"
                @click="toggleTab(0)"
              >{{$t('book.navigation')}}</div>
              <div
                class="content-page-tab-item"
                :class="{'selected': currentTab === 1}"
                @click="toggleTab(1)"
              >{{$t('book.bookmark')}}</div>
            </div>
          </div>
        </div>
      </transition>
      <div class="content-bg" @click="hideTittleAndMenu()"></div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from '@/utils/mixin'
import EbookSlideContents from '@/components/ebook/EbookSlideContents'
export default {
  data() {
    return {
      currentTab: 0,
      content: EbookSlideContents
    }
  },
  mixins: [ebookMixin],
  methods: {
    toggleTab(tab) {
      this.currentTab = tab
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global.scss';
.slide-content-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 300;
  display: flex;
  width: 100%;
  height: 100%;
  .content {
    flex: 0 0 85%;
    width: 85%;
    height: 100%;
    .content-page-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      .content-page {
        flex: 1;
        width: 100%;
        overflow: hidden;
      }
      .content-page-tab {
        display: flex;
        flex: 0 0 px2rem(48);
        width: 100%;
        height: px2rem(48);
        .content-page-tab-item {
          font-size: px2rem(12);
          flex: 1;
          @include center;
        }
      }
    }
  }
  .content-bg {
    flex: 0 0 15%;
    width: 15%;
    height: 100%;
  }
}
</style>

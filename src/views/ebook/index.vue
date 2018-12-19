<template>
  <div class="ebook" ref="ebook">
    <ebook-tittle></ebook-tittle>
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
  </div>
</template>

<script>
import EbookReader from '@/components/ebook/EbookReader.vue'
import EbookTittle from '@/components/ebook/EbookTittle.vue'
import EbookMenu from '@/components/ebook/EbookMenu.vue'
import { getReadTime, saveReadTime } from '@/utils/localStorage'
import { ebookMixin } from '@/utils/mixin'
export default {
  mixins: [ebookMixin],
  components: {
    EbookReader,
    EbookTittle,
    EbookMenu
  },
  watch: {
    offsetY(v) {
      if (v > 0) {
        this.move(v)
      } else if (v === 0) {
        this.restore()
      }
    }
  },
  methods: {
    startLoopReadTime() {
      let readTime = getReadTime(this.fileName)
      if (!readTime) {
        readTime = 0
      }
      this.task = setInterval(() => {
        readTime++
        if (readTime % 30 === 0) {
          saveReadTime(this.fileName, readTime)
        }
      }, 1000)
    },
    move(v) {
      this.$refs.ebook.style.top = `${v}px`
    },
    restore() {
      this.$refs.ebook.style.top = 0
      this.$refs.ebook.style.transition = `all .2s linear`
      setTimeout(() => {
        this.$refs.ebook.style.transition = ''
      }, 200)
    }
  },
  mounted() {
    this.startLoopReadTime()
  },
  beforeDestroy() {
    if (this.task) {
      clearInterval(this.task)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/styles/global';

.ebook {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

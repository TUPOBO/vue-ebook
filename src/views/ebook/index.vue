<template>
  <div class="ebook">
    <ebook-tittle></ebook-tittle>
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
  </div>
</template>

<script>
import EbookReader from '@/components/ebook/EbookReader.vue'
import EbookTittle from '@/components/ebook/EbookTittle.vue'
import EbookMenu from '@/components/ebook/EbookMenu.vue'
export default {
  components: {
    EbookReader,
    EbookTittle,
    EbookMenu
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/styles/global';

.ebook {
  width: 100%;
  height: 100%;
}
</style>

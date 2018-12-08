<template>
  <div id="app">
    <span class="text">Abcdef</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const getters = {
  a: () => 1,
  b: () => 2
}
function fn(keys) {
  const date = {}
  keys.map(key => {
    if (getters.hasOwnProperty(key)) {
      date[key] = getters[key]
    }
  })
  return date
}
export default {
  computed: {
    ...mapGetters(['test']),
    ...fn(['a', 'b', 'c'])
  },
  mounted() {
    this.$store.dispatch('setTest', 20).then(() => {
      console.log(this.test)
    })
  }
}
document.addEventListener('DOMContentLoaded', () => {
  let html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = fontSize + 'px'
})
</script>

<style lang="scss">
@import './assets/styles/global.scss';

.text {
  font-family: 'Days One';
  font-size: px2rem(20);
  color: red;
}
</style>

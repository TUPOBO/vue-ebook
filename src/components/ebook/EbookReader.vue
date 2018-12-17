<template>
  <div class="ebook-reader">
    <div id="reader"></div>
  </div>
</template>

<script>
import Epub from 'epubjs'
import { ebookMixin } from '@/utils/mixin'
import {
  getFontFamily,
  saveFontFamily,
  getFontSize,
  saveFontSize,
  getTheme,
  saveTheme
} from '@/utils/localStorage'
global.ePub = Epub
export default {
  mixins: [ebookMixin],
  methods: {
    initEpub() {
      const url = `${process.env.VUE_APP_RES_URL}/epub/${this.fileName}.epub`
      this.book = new Epub(url)
      this.setCurrentBook(this.book)

      // 渲染图书
      this.initRendition()
      // 手势操作
      this.initGesture()
      // 分页逻辑
      this.book.ready
        .then(() => {
          return this.book.locations.generate(
            750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16)
          )
        })
        .then(locations => {
          // console.log(locations)
          this.setBookAvailable(true)
        })
    },

    initRendition() {
      // 'reader' 应为id
      this.rendition = this.book.renderTo('reader', {
        width: innerWidth,
        height: innerHeight,
        methods: 'default' // 微信兼容性配置，在其浏览器上正常显示
      })
      this.rendition.display().then(() => {
        this.initTheme()
        this.initFontFamily()
        this.initFontSize()
        this.initGlobalStyle()
      })
      // 添加阅读器字体css文件
      this.rendition.hooks.content.register(contents => {
        Promise.all([
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/cabin.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`
          )
        ]).then(() => {
          console.log('styles')
        })
      })
    },

    initGesture() {
      this.rendition.on('touchstart', event => {
        this.touchStartX = event.changedTouches[0].clientX
        this.touchStartTime = event.timeStamp
      })
      this.rendition.on('touchend', event => {
        this.offsetX = event.changedTouches[0].clientX - this.touchStartX
        this.time = event.timeStamp - this.touchStartTime
        if (this.offsetX > 40 && this.time < 500) {
          this.prePage()
        } else if (this.offsetX < -40 && this.time < 500) {
          this.nextPage()
        } else {
          this.toggleTittleAndMenu()
        }

        event.stopPropagation()
      })
    },

    prePage() {
      if (this.rendition) {
        this.hideTittleAndMenu()
        this.rendition.prev()
      }
    },

    nextPage() {
      if (this.rendition) {
        this.hideTittleAndMenu()
        this.rendition.next()
      }
    },

    toggleTittleAndMenu() {
      if (this.tittleVisible) {
        this.setSettingVisible(-1)
        this.setFontFamilyVisible(false)
      }
      this.setTittleVisible(!this.tittleVisible)
    },

    hideTittleAndMenu() {
      this.setTittleVisible(false)
      this.setSettingVisible(-1)
      this.setFontFamilyVisible(false)
    },

    initFontFamily() {
      let font = getFontFamily(this.fileName)
      if (!font) {
        saveFontFamily(this.fileName, this.defaultFontFamily)
      } else {
        this.rendition.themes.font(font)
        this.setDefaultFontFamily(font)
      }
    },

    initFontSize() {
      let fontSize = getFontSize(this.fileName)
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontSize)
      } else {
        this.rendition.themes.fontSize(fontSize + 'px')
        this.setDefaultFontSize(fontSize)
      }
    },

    initTheme() {
      let defaultTheme = getTheme(this.fileName)
      console.log(defaultTheme)
      if (!defaultTheme) {
        defaultTheme = this.themeList[0].name
        saveTheme(this.fileName, defaultTheme)
      }
      this.setDefaultTheme(defaultTheme)
      this.themeList.forEach(theme => {
        this.rendition.themes.register(theme.name, theme.style)
      })
      this.rendition.themes.select(defaultTheme)
    }
  },
  mounted() {
    console.log(this.fileName)
    this.setFileName(this.$route.params.fileName.split('|').join('/'))
    this.initEpub()
  }
}
</script>

<style scoped>
</style>

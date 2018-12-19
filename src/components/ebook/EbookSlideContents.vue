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
          v-model="searchText"
          @keyup.enter.exact="search()"
        >
      </div>
      <div
        class="slide-contents-search-cancel"
        v-show="searchVisible"
        @click="hideSearchPage()"
      >{{$t(`book.cancel`)}}</div>
    </div>
    <div class="slide-contents-book-wrapper" v-show="!searchVisible">
      <div class="slide-contents-book-img-wrapper">
        <img :src="cover" alt="cover" class="slide-contents-book-img">
      </div>
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title">{{metadata.title}}</div>
        <div class="slide-contents-book-author">{{metadata.creator}}</div>
      </div>
      <div class="slide-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <span class="progress">{{progress + '%'}}</span>
          <span class="progress-text">{{$t(`book.haveRead2`)}}</span>
        </div>
        <div class="slide-contents-book-time">{{getReadTimeText()}}</div>
      </div>
    </div>
    <scroll
      class="slide-contents-list"
      v-show="!searchVisible"
      :top="156"
      :bottom="48"
      ref="scroll"
    >
      <div class="slide-contents-item" v-for="(item, index) in navigation" :key="index">
        <span
          class="slide-contents-item-label"
          :class="{'selected': section === index}"
          :style="contentItemStyle(item)"
          @click="displayContent(item.href)"
        >{{item.label}}</span>
        <span class="slide-contents-item-page"></span>
      </div>
    </scroll>
    <scroll class="slide-search-list" :top="66" :bottom="48" v-show="searchVisible">
      <div
        class="slide-search-item"
        v-for="(item, index) in searchList"
        :key="index"
        v-html="item.excerpt"
        @click="displayContent(item.cfi, true)"
      ></div>
    </scroll>
  </div>
</template>|

<script>
import { ebookMixin } from '@/utils/mixin'
import Scroll from '../common/Scroll'
import { px2rem } from '@/utils/utils'
export default {
  data() {
    return {
      searchVisible: false,
      searchList: null,
      searchText: ''
    }
  },
  components: {
    Scroll
  },
  mixins: [ebookMixin],
  methods: {
    showSearchPage() {
      this.searchVisible = true
    },
    hideSearchPage() {
      this.searchVisible = false
      this.searchText = ''
      this.searchList = null
    },
    contentItemStyle(item) {
      return {
        marginLeft: `${px2rem(item.level * 15)}rem`
      }
    },
    // 点击搜索结果或目录列表后，跳转相应位置，并自动隐藏侧边栏
    displayContent(target, highlight = false) {
      this.display(target, () => {
        this.hideTittleAndMenu()
        if (highlight) {
          this.currentBook.rendition.annotations.highlight(target)
        }
      })
    },
    // 全文搜索算法
    doSearch(q) {
      return Promise.all(
        this.currentBook.spine.spineItems.map(section =>
          section
            .load(this.currentBook.load.bind(this.currentBook))
            .then(section.find.bind(section, q))
            .finally(section.unload.bind(section))
        )
      ).then(results => Promise.resolve([].concat.apply([], results)))
    },
    // 根据搜索框内容搜索全文，并将关键字高亮显示
    search() {
      if (this.searchText && this.searchText.length > 0) {
        this.doSearch(this.searchText).then(lists => {
          this.searchList = lists
          this.searchList.map(item => {
            item.excerpt = item.excerpt.replace(
              this.searchText,
              `<span class="content-search-text">${this.searchText}</span>`
            )
            return item
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global.scss';
.ebook-slide-contents {
  font-size: 0;
  width: 100%;
  .slide-contents-search-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(36);
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
  .slide-contents-book-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(90);
    padding: px2rem(10) px2rem(15) px2rem(20) px2rem(15);
    box-sizing: border-box;
    .slide-contents-book-img-wrapper {
      flex: 0 0 px2rem(45);
      .slide-contents-book-img {
        width: px2rem(45);
        height: px2rem(60);
      }
    }
    .slide-contents-book-info-wrapper {
      flex: 1;
      padding: 0 px2rem(10);
      box-sizing: border-box;
      .slide-contents-book-title {
        // 375*0.85=318.75-30=288.75-20=268.75-45=223.75-70=153.75
        width: px2rem(153.75);
        font-size: px2rem(14);
        line-height: px2rem(16);
        @include ellipsis2(2);
      }
      .slide-contents-book-author {
        width: px2rem(153.75);
        font-size: px2rem(12);
        @include ellipsis;
        margin-top: px2rem(10);
      }
    }
    .slide-contents-book-progress-wrapper {
      flex: 0 0 px2rem(70);
      .slide-contents-book-progress {
        .progress {
          font-size: px2rem(14);
        }
        .progress-text {
          font-size: px2rem(12);
        }
      }
      .slide-contents-book-time {
        font-size: px2rem(12);
        margin-top: px2rem(5);
      }
    }
  }
  .slide-contents-list {
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-contents-item {
      display: flex;
      padding: px2rem(20) 0;
      box-sizing: border-box;
      .slide-contents-item-label {
        flex: 1;
        font-size: px2rem(14);
        line-height: px2rem(16);
        @include ellipsis;
      }
      .slide-contents-item-page {
      }
    }
  }
  .slide-search-list {
    width: 100%;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-search-item {
      font-size: px2rem(14);
      line-height: px2rem(16);
      padding: px2rem(20) 0;
      box-sizing: border-box;
    }
  }
}
</style>

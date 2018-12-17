const getters = {
  fileName: state => state.book.fileName,
  tittleVisible: state => state.book.tittleVisible,
  settingVisible: state => state.book.settingVisible,
  defaultFontSize: state => state.book.defaultFontSize,
  currentBook: state => state.book.currentBook,
  defaultFontFamily: state => state.book.defaultFontFamily,
  fontFamilyVisible: state => state.book.fontFamilyVisible,
  defaultTheme: state => state.book.defaultTheme,
  progress: state => state.book.progress,
  bookAvailable: state => state.book.bookAvailable
}

export default getters

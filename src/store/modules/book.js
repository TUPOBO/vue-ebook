const book = {
  state: {
    fileName: '',
    tittleVisible: false,
    settingVisible: -1, // -1：不显示；0：字号；1：主题；2：进度；3：目录；
    defaultFontSize: 16,
    currentBook: null,
    defaultFontFamily: 'Default',
    fontFamilyVisible: false,
    defaultTheme: 'Default',
    progress: 0,
    bookAvailable: false,
    section: 0,
    cover: null,
    metadata: null,
    navigation: null,
    offsetY: 0
  },
  mutations: {
    SET_FILENAME: (state, newFileName) => {
      state.fileName = newFileName
    },
    SET_TITTLEVISIBLE: (state, newTittleVisible) => {
      state.tittleVisible = newTittleVisible
    },
    SET_SETTINGVISIBLE: (state, newSettingVisible) => {
      state.settingVisible = newSettingVisible
    },
    SET_DEFAULT_FONT_SIZE: (state, newDefaultFontSize) => {
      state.defaultFontSize = newDefaultFontSize
    },
    SET_CURRENT_BOOK: (state, newCurrentBook) => {
      state.currentBook = newCurrentBook
    },
    SET_DEFAULT_FONT_FAMILY: (state, defaultFontFamily) => {
      state.defaultFontFamily = defaultFontFamily
    },
    SET_FONT_FAMILY_VISIBLE: (state, fontFamilyVisible) => {
      state.fontFamilyVisible = fontFamilyVisible
    },
    SET_DEFAULT_THEME: (state, defaultTheme) => {
      state.defaultTheme = defaultTheme
    },
    SET_PROGRESS: (state, progress) => {
      state.progress = progress
    },
    SET_BOOK_AVAILABLE: (state, bookAvailable) => {
      state.bookAvailable = bookAvailable
    },
    SET_SECTION: (state, section) => {
      state.section = section
    },
    SET_COVER: (state, cover) => {
      state.cover = cover
    },
    SET_METADATA: (state, metadata) => {
      state.metadata = metadata
    },
    SET_NAVIGATION: (state, navigation) => {
      state.navigation = navigation
    },
    SET_OFFSET_Y: (state, offsetY) => {
      state.offsetY = offsetY
    }
  }
}

export default book

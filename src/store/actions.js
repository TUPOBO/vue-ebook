const actions = {
  setFileName({ commit }, newFileName) {
    commit('SET_FILENAME', newFileName)
  },
  setTittleVisible({ commit }, newTittleVisible) {
    commit('SET_TITTLEVISIBLE', newTittleVisible)
  },
  setSettingVisible({ commit }, newSettingVisible) {
    commit('SET_SETTINGVISIBLE', newSettingVisible)
  },
  setDefaultFontSize({ commit }, newDefaultFontSize) {
    commit('SET_DEFAULT_FONT_SIZE', newDefaultFontSize)
  },
  setCurrentBook({ commit }, newCurrentBook) {
    commit('SET_CURRENT_BOOK', newCurrentBook)
  },
  setDefaultFontFamily({ commit }, defaultFontFamily) {
    commit('SET_DEFAULT_FONT_FAMILY', defaultFontFamily)
  },
  setFontFamilyVisible({ commit }, fontFamilyVisible) {
    commit('SET_FONT_FAMILY_VISIBLE', fontFamilyVisible)
  },
  setDefaultTheme({ commit }, defaultTheme) {
    commit('SET_DEFAULT_THEME', defaultTheme)
  },
  setProgress({ commit }, progress) {
    commit('SET_PROGRESS', progress)
  },
  setBookAvailable({ commit }, bookAvailable) {
    commit('SET_BOOK_AVAILABLE', bookAvailable)
  }
}

export default actions

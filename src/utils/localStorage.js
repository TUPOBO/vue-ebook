import Storage from 'web-storage-cache'

const localStorage = new Storage()

export function setLocalStorage(key, value) {
  return localStorage.set(key, value)
}

export function getLocalStorage(key) {
  return localStorage.get(key)
}

export function removeLocalStorage(key) {
  return localStorage.delete(key)
}

export function clearLocalStorage() {
  return localStorage.clear()
}

export function setBookObject(fileName, key, value) {
  let book = getLocalStorage(`${fileName}-info`)
  if (!book) {
    book = {}
  }
  book[key] = value
  setLocalStorage(`${fileName}-info`, book)
}

export function getBookObject(fileName, key) {
  let book = getLocalStorage(`${fileName}-info`)
  if (book) {
    return book[key]
  } else {
    return null
  }
}

// 获取当前字体
export function getFontFamily(fileName) {
  return getBookObject(fileName, 'fontFamily')
}

// 保存当前字体
export function saveFontFamily(fileName, font) {
  setBookObject(fileName, 'fontFamily', font)
}

// 获取当前字号大小
export function getFontSize(fileName) {
  return getBookObject(fileName, 'fontSize')
}

// 保存当前字号大小
export function saveFontSize(fileName, fontSize) {
  setBookObject(fileName, 'fontSize', fontSize)
}

// 获取当前语言
export function getLocale() {
  return getLocalStorage('locale')
}

// 保存当前语言
export function saveLocale(locale) {
  setLocalStorage('locale', locale)
}

// 获取当前主题
export function getTheme(fileName) {
  return getBookObject(fileName, 'theme')
}

// 保存当前主题
export function saveTheme(fileName, theme) {
  setBookObject(fileName, 'theme', theme)
}

// 获取当前进度
export function getLocation(fileName) {
  return getBookObject(fileName, 'location')
}

// 保存当前进度
export function saveLocation(fileName, location) {
  setBookObject(fileName, 'location', location)
}

// 获取当前阅读时间
export function getReadTime(fileName) {
  return getBookObject(fileName, 'time')
}

// 保存当前进度
export function saveReadTime(fileName, time) {
  return setBookObject(fileName, 'time', time)
}

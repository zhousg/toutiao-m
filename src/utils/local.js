// 用户信息
const USER_KEY = 'hm-toutiao-m-user-key'
export const userLocal = {
  getUser () {
    return JSON.parse(window.localStorage.getItem(USER_KEY) || '{}')
  },
  setUser (user) {
    const oldUser = this.getUser()
    const newUser = { ...oldUser, ...user }
    return window.localStorage.setItem(USER_KEY, JSON.stringify(newUser))
  },
  removeUser () {
    window.localStorage.removeItem(USER_KEY)
  }
}
// 搜索记录
const SEARCH_KEY = 'hm-toutiao-m-search-key'
export const searchLocal = {
  getHistory () {
    return JSON.parse(window.localStorage.getItem(SEARCH_KEY) || '[]')
  },
  setHistory (text) {
    const oldList = this.getHistory()
    oldList.unshift(text)
    // 去重
    const set = new Set(oldList)
    const newList = Array.from(set)
    window.localStorage.setItem(SEARCH_KEY, JSON.stringify(newList))
  },
  removeHistory (text) {
    const list = this.getHistory()
    const index = list.findIndex(item => item === text)
    list.splice(index, 1)
    window.localStorage.setItem(SEARCH_KEY, JSON.stringify(list))
  },
  clearHistory () {
    window.localStorage.setItem(SEARCH_KEY, '[]')
  }
}

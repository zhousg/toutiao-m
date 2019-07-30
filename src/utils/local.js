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

// components/authorization/authorization.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isLogin: false
  },
  lifetimes: {
    attached() {
      const isLogin = !!getApp().token
      console.log(isLogin)
      this.setData({
        isLogin
      })
      const pageStack = getCurrentPages()
      const currentPage = pageStack.pop()
      console.log(currentPage)
      const {
        route
      } = currentPage
      if (!isLogin) {
        currentPage.onLoad = () => {}
        currentPage.onShow = () => {}
        wx.redirectTo({
          url: '/pages/login/index?redirectURL=/' + route,
        })
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
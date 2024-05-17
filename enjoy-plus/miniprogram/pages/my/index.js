const app = getApp()
Page({
  onLoad() {
    app.token && this.getUserProfile()
  },
  async getUserProfile() {
    const {
      code,
      data: {
        avatar,
        nickName
      }
    } = await wx.http.get('/userInfo')
    console.log(avatar, nickName)
    if (code !== 10000) return wx.utils.toast()
    this.setData({
      avatar,
      nickName
    })
    app.userProfile = {
      avatar,
      nickName
    }
    console.log(app)
  },
  goLogin() {
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },
})
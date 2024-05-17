// pages/profile/index.ts
const app = getApp()
const pageStack = getCurrentPages()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    console.log('onLoad')
    const app = getApp()
    this.setData({
      ...app.userProfile
    })
  },
  getUserNickname(e) {
    console.log(e)
    this.updateNickname(e.detail.value)
  },
  async updateNickname(nickName) {
    console.log(nickName)
    if (nickName === '') return
    const {
      code
    } = await wx.http.put('/userInfo', {
      nickName
    })
    if (code !== 10000) return wx.utils.toast('更新昵称失败!')
    pageStack[0].setData({
      nickName
    })
    const app = getApp()
    app.userProfile.nickName = nickName
  },
  getUserAvatar(e) {
    console.log(e)
    this.updateAvatar(e.detail.avatarUrl)
  },
  updateAvatar(avatar) {
    wx.uploadFile({
      filePath: avatar,
      name: 'file',
      url: wx.http.baseURL + '/upload',
      formData: {
        type: 'avatar'
      },
      header: {
        Authorization: 'Bearer ' + getApp().token
      },
      success: (res) => {
        console.log(res)
        const data = JSON.parse(result.data)
        if (data.code !== 10000) return wx.utils.toast('上传头像失败!')
        pageStack[0].setData({
          avatar: data.data.url
        })
        this.setData({
          avatar: data.data.url
        })
        const app = getApp()
        app.userProfile.avatar = data.data.url
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
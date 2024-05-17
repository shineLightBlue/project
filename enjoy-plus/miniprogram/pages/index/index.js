Page({
  data: {
    notices: []
  },
  onLoad() {
    this.getNotices()
  },
  async getNotices() {
    const {
      code,
      data: notices
    } = await wx.http.get('/announcement')
    console.log(notices)
    if (code !== 10000) return wx.utils.toast()
    this.setData({
      notices
    })
  }
})
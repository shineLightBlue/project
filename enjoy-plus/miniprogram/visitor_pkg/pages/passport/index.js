Page({
  data: {
    passport: {}
  },
  onLoad({
    id,
    encryptedData
  }) {
    console.log(id, encryptedData)
    this.getPassport(id)
    this.getPassportShare(encryptedData)
  },
  async getPassport(id) {
    if (!id) return
    const {
      code,
      data: passport
    } = await wx.http.get('/visitor/' + id)
    if (code !== 10000) return wx.utils.toast()
    console.log(passport)
    this.setData({
      passport
    })
  },
  async getPassportShare(encryptedData) {
    if (!encryptedData) return
    const {
      code,
      data: passport
    } = await wx.http.get('/visitor/share/' + encryptedData)
    if (code !== 10000) return wx.utils.toast()
    console.log(passport)
    this.setData({
      passport
    })
  },
  onShareAppMessage() {
    const {
      encryptedData
    } = this.data.passport
    return {
      title: '查看通行证',
      path: '/visitor_pkg/pages/passport/index?encryptedData=' + encryptedData,
      imageUrl: 'https://enjoy-plus.oss-cn-beijing.aliyuncs.com/images/share_poster.png',
    }
  },
  async saveQRCode() {
    try {
      const {
        path
      } = await wx.getImageInfo({
        src: this.data.passport.url,
      })
      wx.saveImageToPhotosAlbum({
        filePath: path,
      })
    } catch (error) {
      wx.utils.toast('保存图片失败，稍后重试!')
    }
  }
})
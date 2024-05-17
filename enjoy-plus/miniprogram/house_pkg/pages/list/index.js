Page({
  data: {
    dialogVisible: false,
    houseList: [],
    isEmpty: false
  },
  onShow() {
    this.getHouseList()
  },
  async getHouseList() {
    const {
      code,
      data: houseList
    } = await wx.http.get('/room')
    if (code !== 10000) return wx.utils.toast()
    console.log(houseList)
    this.setData({
      houseList,
      isEmpty: houseList.length === 0
    })
  },
  swipeClose(ev) {
    console.log(ev)
    const {
      position,
      instance
    } = ev.detail

    if (position === 'right') {
      // 显示 Dialog 对话框
      this.setData({
        dialogVisible: true,
      })
      this.cellId = ev.mark.id
      this.cellIndex = ev.mark.index
      // swiper-cell 滑块关闭
      instance.close()
    }
  },
  dialogClose(ev) {
    if (ev.detail === 'confirm') this.deleteHouse()
  },
  goDetail(ev) {
    console.log(ev)
    wx.navigateTo({
      url: '/house_pkg/pages/detail/index?id=' + ev.mark.id,
    })
  },

  addHouse() {
    wx.navigateTo({
      url: '/house_pkg/pages/locate/index',
    })
  },
  async deleteHouse() {
    if (!this.cellId) return wx.utils.toast('参数有误!')
    const {
      code
    } = await wx.http.delete('/room/' + this.cellId)
    if (code !== 10000) return wx.utils.toast()
    this.data.houseList.splice(this.cellIndex, 1)
    this.setData({
      houseList: this.data.houseList,
      isEmpty: this.data.houseList.length === 0
    })
  }
})
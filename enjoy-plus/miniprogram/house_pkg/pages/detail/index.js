Page({
  data: {
    houseDetail: {}
  },
  onLoad({
    id
  }) {
    console.log(id)
    this.getHouseDetail(id)
  },
  async getHouseDetail(id) {
    if (!id) return wx.utils.toast('参数有误!')
    const {
      code,
      data: houseDetail
    } = await wx.http.get('/room/' + id)
    if (code !== 10000) return wx.utils.toast()
    this.setData({
      houseDetail
    })
  },
  editHouse(ev) {
    wx.navigateTo({
      url: '/house_pkg/pages/form/index?id=' + ev.mark.id,
    })
  },
})
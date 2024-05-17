import {
  throttle
} from 'miniprogram-licia'
Page({
  data: {
    visitorList: [],
    isEmpty: false
  },
  onLoad() {
    this.getVisitorList()
    this.getMoreVisitor = throttle(() => {
      if (!this.data.hasMore) return
      this.getVisitorList(++this._current)
    }, 100)
  },
  async getVisitorList(current = 1, pageSize = 5) {
    const {
      code,
      data: {
        pageTotal,
        rows: visitorList
      }
    } = await wx.http.get('/visitor', {
      current,
      pageSize
    })
    console.log(visitorList)
    if (code !== 10000) return wx.utils.toast()
    this.setData({
      hasMore: current < pageTotal,
      isEmpty: visitorList.length === 0,
      visitorList: this.data.visitorList.concat(visitorList)
    })
    this._current = current
  },
  goPassport() {
    wx.navigateTo({
      url: '/visitor_pkg/pages/passport/index',
    })
  },
})
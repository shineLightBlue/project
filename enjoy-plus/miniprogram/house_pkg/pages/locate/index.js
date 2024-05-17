// house_pkg/pages/locate/index.ts
import QQMap from '../../../utils/qqmap'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    points: [],
    address: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getLocation()
  },
  async getLocation() {
    const {
      latitude,
      longitude
    } = await wx.getLocation()
    console.log(latitude, longitude)
    this.getPoint(latitude, longitude)
  },
  async chooseLocation() {
    const {
      latitude,
      longitude
    } = await wx.chooseLocation()
    console.log(latitude, longitude)
    this.getPoint(latitude, longitude)
  },
  getPoint(latitude, longitude) {
    QQMap.reverseGeocoder({
      location: [latitude, longitude].join(','),
      success: ({
        result: {
          address
        }
      }) => {
        this.setData({
          address
        })
      }
    })
    QQMap.search({
      keyword: '住宅小区',
      location: [latitude, longitude].join(','),
      page_size: 5,
      success: (result) => {
        console.log(result)
        const points = result.data.map(({
          id,
          title,
          _distance
        }) => {
          return {
            id,
            title,
            _distance
          }
        })
        this.setData({
          points
        })
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
// house_pkg/pages/room/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    point: '',
    building: '',
    rooms: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({
    point,
    building
  }) {
    console.log(point, building)
    this.fake(point, building)
  },
  fake(point, building) {
    const size = Math.floor(Math.random() * 5) + 4
    const rooms = []
    console.log(size)
    for (let i = 0; i < size; i++) {
      const floor = Math.floor(Math.random() * 20) + 1
      const No = Math.floor(Math.random() * 3) + 1
      const room = [floor, 0, No].join('')
      if (rooms.includes(room)) return
      rooms.push(room)
    }
    this.setData({
      rooms,
      point,
      building
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
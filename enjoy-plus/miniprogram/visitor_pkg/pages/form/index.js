import wxValidate from 'wechat-validate'
Page({
  behaviors: [wxValidate],
  data: {
    dateLayerVisible: false,
    houseLayerVisible: false,
    houseList: [],
    houseId: '',
    visitDate: '',
    currentDate: Date.now(),
    maxDate: Date.now() + 1000 * 3600 * 24 * 3,
    name: '',
    gender: 1,
    mobile: ''
  },
  rules: {
    name: [{
        required: true,
        message: '访客姓名不能为空!'
      },
      {
        pattern: /[\u4e00-\u9fa5]{2,5}/,
        message: '访客姓名只能为中文!'
      },
    ],
    mobile: [{
        required: true,
        message: '访客手机号不能为空!'
      },
      {
        pattern: /^1[3-8]\d{9}$/,
        message: '请填写正确的手机号码!'
      },
    ],
    houseId: [{
      required: true,
      message: '请选择到访的房屋!'
    }],
    visitDate: [{
      required: true,
      message: '请选择到访的日期!'
    }],
  },
  onLoad() {
    this.getHouseList()
  },
  async getHouseList() {
    const {
      code,
      data: houseList
    } = await wx.http.get('/room')
    console.log(houseList)
    if (code !== 10000) return wx.utils.toast()
    this.setData({
      houseList
    })
  },
  selectHouseInfo(e) {
    console.log(e)
    this.setData({
      houseId: e.detail.id,
      houseInfo: e.detail.name
    })
  },
  selectDateInfo(e) {
    console.log(e)
    this.setData({
      visitDate: wx.utils.dataFormat(e.detail),
      dateLayerVisible: false
    })
  },
  openHouseLayer() {
    this.setData({
      houseLayerVisible: true
    })
  },
  closeHouseLayer() {
    this.setData({
      houseLayerVisible: false
    })
  },
  openDateLayer() {
    this.setData({
      dateLayerVisible: true
    })
  },
  closeDateLayer() {
    this.setData({
      dateLayerVisible: false
    })
  },
  async goPassport() {
    if (!this.validate()) return
    const {
      name,
      gender,
      mobile,
      houseId,
      visitDate
    } = this.data
    const {
      code,
      data: {
        id
      }
    } = await wx.http.post('/visitor', {
      name,
      gender,
      mobile,
      houseId,
      visitDate
    })
    if (code !== 10000) return wx.utils.toast()
    wx.reLaunch({
      url: '/visitor_pkg/pages/passport/index?id=' + id,
    })
  },
})
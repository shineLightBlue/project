import wxValidate from 'wechat-validate'
Page({
  behaviors: [wxValidate],
  data: {
    currentDate: new Date().getTime(),
    houseLayerVisible: false,
    repairLayerVisible: false,
    dateLayerVisible: false,
    mobile: '',
    houseId: '',
    houseInfo: '',
    houseList: [],
    repairItemId: '',
    repairItemName: '',
    appointment: '',
    description: '',
    repairItem: [],
    attachment: [],
  },
  rules: {
    houseId: [{
      required: true,
      message: '请选择报修房屋!'
    }],
    repairItemId: [{
      required: true,
      message: '请选择维修的项目!'
    }],
    mobile: [{
        required: true,
        message: '请填写手机号码!'
      },
      {
        pattern: /^1[3-8]\d{9}$/,
        message: '请填写正确的手机号码!'
      },
    ],
    appointment: [{
      required: true,
      message: '请选择预约日期!'
    }],
    description: [{
      required: true,
      message: '请填写问题描述!'
    }],
  },
  onLoad({
    id
  }) {
    this.getHouseList()
    this.getRepairItem()
    if (id) this.getRepairDetail(id)
  },
  async getRepairDetail(id) {
    const {
      code,
      data: repairDetail
    } = await wx.http.get('/repair/' + id)
    console.log(repairDetail)
    if (code !== 10000) return wx.utils.toast()
    this.setData({
      ...repairDetail
    })
  },
  uploadPicture(e) {
    console.log(e)
    const {
      file
    } = e.detail
    wx.uploadFile({
      filePath: file.url,
      name: 'file',
      url: wx.http.baseURL + '/upload',
      header: {
        Authorization: 'Bearer ' + getApp().token
      },
      success: (result) => {
        console.log(result)
        const data = JSON.parse(result.data)
        if (data.code !== 10000) return wx.utils.toast('文件上传失败!')
        const {
          attachment
        } = this.data
        attachment.push(data.data)
        this.setData({
          attachment
        })
      }
    })
  },
  async getHouseList() {
    const {
      code,
      data: houseList
    } = await wx.http.get('/room')
    //暂时由house改为room
    console.log(houseList)
    if (code !== 10000) return wx.utils.toast()
    this.setData({
      houseList
    })
  },
  async getRepairItem() {
    const {
      code,
      data: repairItem
    } = await wx.http.get('/repairItem')
    console.log(repairItem)
    if (code !== 10000) return wx.utils.toast()
    this.setData({
      repairItem
    })
  },
  selectRepairItemInfo(e) {
    console.log(e)
    this.setData({
      repairItemId: e.detail.id,
      repairItemName: e.detail.name
    })
  },
  selectHouseInfo(e) {
    this.setData({
      houseId: e.detail.id,
      houseInfo: e.detail.name
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
  openRepairLayer() {
    this.setData({
      repairLayerVisible: true
    })
  },
  closeRepairLayer() {
    this.setData({
      repairLayerVisible: false,
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
  selectDateInfo(e) {
    console.log(e)
    this.setData({
      appointment: wx.utils.dataFormat(e.detail),
      dateLayerVisible: false
    })
  },
  async submitForm() {
    if (!this.validate()) return
    const {
      id,
      houseId,
      repairItemId,
      mobile,
      appointment,
      description,
      attachment
    } = this.data
    const {
      code
    } = await wx.http.post('/repair', {
      id,
      houseId,
      repairItemId,
      mobile,
      appointment,
      description,
      attachment
    })
    if (code !== 10000) return wx.utils.toast('在线报修失败!')
    wx.redirectTo({
      url: '/repair_pkg/pages/list/index',
    })
  }
})
// \u4e00-\u9fa5] 中文验证规则
import wxValidate from 'wechat-validate'
Page({
  behaviors: [wxValidate],
  onLoad({
    point,
    building,
    room,
    id
  }) {
    if (id) return this.getHouseDetail(id)
    this.setData({
      point,
      building,
      room
    })
  },
  async getHouseDetail(id) {
    const {
      code,
      data: houseDetail
    } = await wx.http.get('/room/' + id)
    console.log(houseDetail)
    if (code !== 10000) return wx.utils.toast()
    this.setData({
      ...houseDetail
    })
  },
  data: {
    point: '',
    building: '',
    room: '',
    idcardFrontUrl: '',
    idcardBackUrl: '',
    name: '',
    gender: 1,
    mobile: ''
  },
  rules: {
    name: [{
        required: true,
        message: '业主姓名不能为空!'
      },
      {
        pattern: /^[\u4e00-\u9fa5]{2,5}$/,
        message: '业主姓名只能为中文!'
      },
    ],
    mobile: [{
        required: true,
        message: '业主手机号不能为空!'
      },
      {
        pattern: /^1[3-8]\d{9}$/,
        message: '请填写正确的手机号!'
      },
    ],
    idcardFrontUrl: [{
      required: true,
      message: '请上传身份证国徽面!'
    }],
    idcardBackUrl: [{
      required: true,
      message: '请上传身份证照片面!'
    }],
  },
  async uploadPicture(ev) {
    const type = ev.mark.type
    try {
      const media = await wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sizeType: ['compressed']
      })
      wx.uploadFile({
        filePath: media.tempFiles[0].tempFilePath,
        name: 'file',
        url: wx.http.baseURL + '/upload',
        header: {
          Authorization: 'Bearer ' + getApp().token
        },
        success: (result) => {
          console.log(result)
          const data = JSON.parse(result.data)
          if (data.code !== 10000) return wx.utils.toast('上传图片失败!')
          this.setData({
            [type]: data.data.url
          })
        }
      })
    } catch (error) {
      console.log(error)
    }
  },
  removePicture(ev) {
    // 移除图片的类型（身份证正面或反面）
    const type = ev.mark?.type
    this.setData({
      [type]: ''
    })
  },
  async submitForm() {
    if (!this.validate()) return
    console.log(this.data)
    const {
      __webviewId__,
      status,
      ...data
    } = this.data
    const {
      code
    } = await wx.http.post('/room', data)
    if (code !== 10000) return wx.utils.toast('提交数据失败!')
    wx.navigateBack({
      delta: 4
    })
  }
})
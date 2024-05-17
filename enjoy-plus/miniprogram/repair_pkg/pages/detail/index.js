// map.js
import qqMap from '../../../utils/qqmap'

Page({
  data: {
    repairDetail: {},
    latitude: 40.060539,
    longitude: 116.343847,
    markers: [{
        id: 1,
        latitude: 40.22073900000001,
        longitude: 116.23116200000003,
        width: 40,
        height: 40,
      },
      {
        id: 2,
        latitude: 40.225857999999995,
        longitude: 116.23246699999999,
        iconPath: '/static/images/marker.png',
        width: 40,
        height: 40,
      },
    ],
  },
  onLoad({
    id
  }) {
    this.getRepairDetail(id)
    this.getPolyline()
  },
  editRepair(e) {
    wx.navigateTo({
      url: '/repair_pkg/pages/form/index?id=' + e.mark.id,
    })
  },
  getPolyline() {
    qqMap.direction({
      mode: 'bicycling',
      from: '40.227978,116.22998',
      to: '40.22077,116.23128',
      success: ({
        result
      }) => {
        const coors = result.routes[0].polyline
        const points = []
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        for (let i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / 1000000
        }
        // 获取经纬度
        for (let i = 0; i < coors.length; i += 2) {
          points.push({
            latitude: coors[i],
            longitude: coors[i + 1]
          })
        }
        console.log(points)
        this.setData({
          latitude: points[30].latitude,
          longitude: points[30].longitude,
          polyline: [{
            points,
            color: '#5591af',
            width: 4
          }, ],
        })
      }
    })
  },
  async getRepairDetail(id) {
    if (!id) return wx.utils.toast('参数有误!')
    const {
      code,
      data: repairDetail
    } = await wx.http.get('/repair/' + id)
    if (code !== 10000) return wx.utils.toast()
    this.setData({
      repairDetail
    })
  },
  async cancelRepair(e) {
    const {
      code
    } = await wx.http.put('/cancel/repaire/' + e.mark.id)
    if (code !== 10000) return wx.utils.toast()
    wx.navigateTo({
      url: '/repair_pkg/pages/list/index',
    })
  }
})
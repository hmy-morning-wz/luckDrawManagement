import HOST_CONFIG from 'hostconfig'
import * as ajax from 'ajax'
import { getJSON, postJSON, putJSON, delData } from '../../utils/ajax'
import {Loading} from 'element-ui'

let host = HOST_CONFIG.nethost
export default {
  //活动列表接口
  getCouponList(data) {
    const url = `${host}lottery/list`
    return postJSON(url, data).then(
      response => {
        return Promise.resolve(response.data || response)
      },
      response => {
        return Promise.reject(response.data || response)
      }
    )
  },
  //获取活动详情接口
  getCouponDetail(id) {
    const url = `${host}lottery/detail/${id}`
    return getJSON(url).then(
      response => {
        return Promise.resolve(response.data || response)
      },
      response => {
        return Promise.reject(response.data || response)
      }
    )
  },
  //券发布接口
  addCoupon(data) {
    const loading = Loading.service({
      lock: true,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    const url = `${host}lottery/add`
    return postJSON(url, data).then(
      response => {
        loading.close()
        return Promise.resolve(response.data || response)
      },
      response => {
        loading.close()
        return Promise.reject(response.data || response)
      }
    )
  },
  //编辑活动接口
  editCoupon(data) {
    const loading = Loading.service({
      lock: true,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    const url = `${host}lottery/edit`
    return postJSON(url, data).then(
      response => {
        loading.close()
        return Promise.resolve(response.data || response)
      },
      response => {
        loading.close()
        return Promise.reject(response.data || response)
      }
    )
  },
  //更新卡券状态（上下架）接口
  updateCoupon(data) {
    const url = `${host}lottery/state`
    return getJSON(url, data).then(
      response => {
        return Promise.resolve(response.data || response)
      },
      response => {
        return Promise.reject(response.data || response)
      }
    )
  },


  //卡券用户列表接口
  getUserList(data) {
    const url = `${host}lottery/user_list`
    return getJSON(url, data).then(
      response => {
        return Promise.resolve(response.data || response)
      },
      response => {
        return Promise.reject(response.data || response)
      }
    )
  },

  // 获取券描述
  getDescription() {
    const url = `${host}coupons/description`
    return getJSON(url).then(
      response => {
        return Promise.resolve(response.data || response)
      },
      response => {
        return Promise.reject(response.data || response)
      }
    )
  },

  // 修改券描述
  editDescription(data) {
    const loading = Loading.service({
      lock: true,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    const url = `${host}coupons/description`
    return putJSON(url, data).then(
      response => {
        loading.close()
        return Promise.resolve(response.data || response)
      },
      response => {
        loading.close()
        return Promise.reject(response.data || response)
      }
    )
  }
}

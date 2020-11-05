import HOST_CONFIG from 'hostconfig'
import * as ajax from 'ajax'
import { getJSON, postJSON, putJSON, delData } from '../../utils/ajax'
import {Loading} from 'element-ui'

let host = HOST_CONFIG.nethost
export default {
  //活动列表接口
  getLotteryList(data) {
    const url = `${host}activity/list`
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
  getLotteryDetail(id) {
    const url = `${host}activity/detail/${id}`
    return getJSON(url).then(
      response => {
        return Promise.resolve(response.data || response)
      },
      response => {
        return Promise.reject(response.data || response)
      }
    )
  },
  //添加活动接口
  addLottery(data) {
    const loading = Loading.service({
      lock: true,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    const url = `${host}activity/add`
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
  editLottery(data) {
    const loading = Loading.service({
      lock: true,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    const url = `${host}activity/edit`
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
  //更新活动状态（上下架）接口
  updateLottery(data) {
    const url = `${host}activity/state`
    return postJSON(url, data).then(
      response => {
        return Promise.resolve(response.data || response)
      },
      response => {
        return Promise.reject(response.data || response)
      }
    )
  },


  //用户列表接口
  getUserList(data) {
    const url = `${host}activityuser/list`
    return postJSON(url, data).then(
      response => {
        return Promise.resolve(response.data || response)
      },
      response => {
        return Promise.reject(response.data || response)
      }
    )
  },
  //商务申请列表
  getCooperationList(data) {
    const url = `${host}cooperation/list`
    return postJSON(url, data).then(
      response => {
        return Promise.resolve(response.data || response)
      },
      response => {
        return Promise.reject(response.data || response)
      }
    )
  },

  //获取虚拟奖品列表
  getPrizeList(id) {
    const url = `${host}lottery/putaway_list`
    return getJSON(url).then(
      response => {
        return Promise.resolve(response.data || response)
      },
      response => {
        return Promise.reject(response.data || response)
      }
    )
  },
}

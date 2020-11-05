
const lotteryList = (resolve) => {
  require(['@/page/luckDrawManagement/lotteryList.vue'], resolve);
};
const addLottery = (resolve) => {
  require(['@/page/luckDrawManagement/addLottery.vue'], resolve);
};
const lotteryEdit = (resolve) => {
  require(['@/page/luckDrawManagement/lotteryEdit.vue'], resolve);
};
const userList = (resolve) => {
  require(['@/page/luckDrawManagement/userList.vue'], resolve);
};
const cooperationList = (resolve) => {
  require(['@/page/luckDrawManagement/cooperationList.vue'], resolve);
};
const addCoupon = (resolve) => {
  require(['@/page/couponDraw/addCoupon.vue'], resolve);
};
const couponList = (resolve) => {
  require(['@/page/couponDraw/couponList.vue'], resolve);
};
const couponUser = (resolve) => {
  require(['@/page/couponDraw/couponUser.vue'], resolve);
};
const couponEdit = (resolve) => {
  require(['@/page/couponDraw/couponEdit.vue'], resolve);
};
const editDescription = (resolve) => {
  require(['@/page/couponDraw/couponDesc.vue'], resolve);
};
const adsenseMana = (resolve) => {
  require(['@/page/adManage/adsenseMana.vue'], resolve);
};
const addad = (resolve) => {
  require(['@/page/adManage/addad.vue'], resolve);
};
const adEdit = (resolve) => {
  require(['@/page/adManage/adEdit.vue'], resolve);
};
export default  [
  {
    path: '/lotteryList',
    component: lotteryList,
          meta: ['活动列表'],
  },
  {
    path: '/addLottery',
    component: addLottery,
          meta: ['新建抽奖'],
  },
  {
    path: '/lotteryEdit',
    component: lotteryEdit,
          meta: ['活动编辑'],
  },
  {
    path: '/userList',
    component: userList,
          meta: ['用户列表'],
  },
  {
    path: '/cooperationList',
    component: cooperationList,
          meta: ['商户申请'],
  },
  {
    path: '/addCoupon',
    component: addCoupon,
          meta: ['卡券发布'],
  },
  {
    path: '/couponList',
    component: couponList,
          meta: ['卡券列表'],
  },
  {
    path: '/couponUser',
    component: couponUser,
          meta: ['用户列表'],
  },
  {
    path: '/couponEdit',
    component: couponEdit,
          meta: ['卡券编辑'],
  },
  {
    path: '/editDescription',
    component: editDescription,
          meta: ['券描述修改'],
  },
  {
    path: '/adsenseMana',
    component: adsenseMana,
          meta: ['广告位管理'],
  },
  {
    path: '/addad',
    component: addad,
          meta: ['新建广告'],
  },
  {
    path: '/adEdit',
    component: adEdit,
          meta: ['查看编辑广告'],
  },
]

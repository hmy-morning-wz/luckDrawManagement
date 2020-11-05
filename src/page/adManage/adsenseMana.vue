<template>
    <div class="activity-list">
        <div class="pl30 pt20">
            <div class="content">
                <el-row class="lh40 mt10">
                    <el-col :span="24">
                        <div class="float-left">
                            <el-date-picker
                                v-model="searchParams.start_time"
                                type="datetime"
                                placeholder="开始日期时间"
                                :picker-options="beginPickerOptions"
                                :editable="false"
                                class="w200"
                            ></el-date-picker>
                        </div>
                        <div class="float-left ml10">
                            <el-date-picker
                                v-model="searchParams.end_time"
                                type="datetime"
                                placeholder="结束日期时间"
                                :picker-options="endPickerOptions"
                                :editable="false"
                            ></el-date-picker>
                        </div>
                        <!-- <div class="float-left ml10">广告位置</div> -->
                        <div class="float-left ml10">
                          <el-select v-model="searchParams.position" clearable placeholder="广告位置">
                              <el-option
                                  v-for="(item,index) in positionList"
                                  :key="index"
                                  :label="item.value"
                                  :value="item.id"
                              ></el-option>
                          </el-select>
                        </div>
                        <!-- <div class="float-left ml10">广告状态</div> -->
                        <div class="float-left ml10">
                            <el-select v-model="searchParams.state" clearable placeholder="广告状态">
                                <el-option
                                    v-for="(item,index) in stateList"
                                    :key="index"
                                    :label="item.state"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </div>
                        <div class="float-left ml10">
                            <el-button type="primary" @click="handleSearch">搜索</el-button>
                        </div>
                          <div class="float-left ml20" style="margin-right: 30px">
                            <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新建</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="table">
                <div class="tableList">
                    <el-table :data="tableData">
                        <el-table-column prop="id" label="广告id" min-width="35" align="center"></el-table-column>
                        <el-table-column prop="name" label="广告名称" min-width="50" align="center">
                            <template slot-scope="scope">
                                <div>{{scope.row.name}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="开始时间"
                            min-width="70"
                            show-overflow-tooltip
                            align="center"
                        >
                            <template slot-scope="scope">
                                <span class="">{{scope.row.start_time}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="结束时间"
                            min-width="70"
                            show-overflow-tooltip
                            align="center"
                        >
                            <template slot-scope="scope">
                                <span class="">{{scope.row.end_time}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="position" label="广告位置" min-width="40" :formatter="positionFormat" align="center">
                        </el-table-column>
                        <el-table-column prop="is_top" label="是否置顶" min-width="40" :formatter="whetherTop" align="center">
                        </el-table-column>
                        <el-table-column
                            prop="state"
                            label="状态"
                            min-width="40"
                            :formatter="formatReleaseStatus"
                            align="center"
                        ></el-table-column>
                        <el-table-column label="操作" min-width="80">
                            <template slot-scope="scope" style="text-align:center">
                                <div style="display:flex">
                                    <el-button type="text" @click="handleDetail(scope.row.id)">查看</el-button>
                                    <el-button
                                        type="text"
                                        @click="handleUpdateStatus(scope.row,1)"
                                        v-if="scope.row.state == 0"
                                    >上架</el-button>
                                    <el-button
                                        type="text"
                                        @click="handleEditor(scope.row.id,scope.row.state)"
                                        v-if="scope.row.state != 2"
                                    >编辑</el-button>
                                    <el-button
                                        type="text"
                                        @click="handleUpdateStatus(scope.row,2)"
                                        v-if="scope.row.state == 1"
                                    >下架</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="foot-page">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="searchParams.page"
                        :page-sizes="[10,20]"
                        :page-size="searchParams.size"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalSize"
                    ></el-pagination>
                </div>
            </div>
        </div>
        <app-loading :loadingShow="loadingShow"></app-loading>
    </div>
</template>
<script>
import adService from "../../service/luckDrawManagement/adManage.js";
import moment from "@/utils/moment";
import AppLoading from '../../components/loading'
import {Loading} from 'element-ui'

export default {
  data() {
    return {
      loadingShow: false,
      stateList: [
        {
          id: 1,
          state: "已上架"
        },
        {
          id: 0,
          state: "待上架"
        },
        {
          id: 2,
          state: "已下架"
        },
      ],
      positionList: [
        {
          id: 1,
          value: "首页弹框"
        },
        {
          id: 2,
          value: "活动详情底部图片广告"
        },
      ],
      tableData: [],
      searchParams: {
        state: "",
        position: '',
        start_time: "",
        end_time: "",
        page: 1,
        size: 10
      },
      totalSize: 0
    };
  },
  created() {
    this.getTableList();
  },
  components: {
    AppLoading
  },
  methods: {
    getTableList() {
      const data = this.handparams();
      console.log(data)
      adService.getAdList(data).then(
        response => {
          if (response.list instanceof Array) {
            this.tableData = response.list;
          } else {
            this.tableData = [];
          }
          this.totalSize = response.total
        },
        response => {
          this.$message.error(response.message)
        }
      );
    },
    // 确认
    handleSearch() {
      this.searchParams.page = 1;
      this.getTableList();
    },
    whetherTop(row) {
      if (row.is_top == 0) {
        return "否";
      }
      if (row.is_top == 1) {
        return "是";
      }
    },
    positionFormat(row) {
      if (row.position == 1) {
        return "首页弹框";
      }
      if (row.position == 2) {
        return "活动详情底部图片广告";
      }
    },
    // 新建活动
    handleAdd() {
      const router = `./addad`;
      this.$router.push(router);
    },
    formatReleaseStatus(row, column) {
      if (row.state == '1') {
        return "已上架";
      }
      if (row.state == '2') {
        return "已下架";
      }
      if (row.state == '0') {
        return "待上架";
      }
    },
    updateStatus(data) {
      adService.updateAd(data).then(
        response => {
          this.getTableList();
        },
        response => {
          if(response.message == 'haveTop') {
            let conInfo = data.position == 1 ? '线上已存在首页弹框内容，确定覆盖？' : '线上已存在置顶广告，确定覆盖？'
            this.$confirm(conInfo, "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then( async () => {
                data.flag = 1
                this.updateStatus(data);
                // let res = await adService.updateAd(data)
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消"
                });
              });
          } else { this.$message.error(response.message); }
        }
      );
    },
    handleUpdateStatus(row, status) {
        let tipMessage = '';
        if(status === 2){
            tipMessage = '是否确定要下架'
        }else{
            tipMessage = '是否确定要上架'
        }
      this.$confirm(tipMessage, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const data = {
            id: row.id,
            state: status,
            position: row.position,
            is_top: row.is_top,
            flag: 0
          };
          this.updateStatus(data);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    // 跳转到详情
    handleDetail(id) {
      const router = `./adEdit?id=${id}&type=1`;
      this.$router.push(router);
    },
    // 跳转到编辑
    handleEditor(id,state) {
      const router = `./adEdit?id=${id}&type=2&state=${state}`;
      this.$router.push(router);
    },
    handleSizeChange(val) {
      this.searchParams.size = val;
      this.getTableList();
    },
    handleCurrentChange(val) {
      this.searchParams.page = val;
      this.getTableList();
    },
    handparams() {
      const self = this;
      const params = JSON.parse(JSON.stringify(self.searchParams));
      for (const i in params) {
        if (params[i] === "") {
          delete params[i];
        }
      }
      if (params.start_time) {
        params.start_time = moment(params.start_time).formats();
      }
      if (params.end_time) {
        params.end_time = moment(params.end_time).formats();
      }
      return params;
    },
    toUserList(id,name) {
      const router = `./couponUser?coupon_id=${id}&coupon_name=${name}`;
      this.$router.push(router);
    }
  },
  computed: {
    beginPickerOptions() {
      let self = this;
      return {
        disabledDate(time) {
          if (self.searchParams.end_time) {
            return time.getTime() > self.searchParams.end_time;
          }
        }
      };
    },
    endPickerOptions() {
      let self = this;
      return {
        disabledDate(time) {
          return time.getTime() < self.searchParams.start_time;
        }
      };
    }
  },
  watch: {
    loadingShow(val) {
      return val;
    }
  }
};
</script>

<style lang="scss" scoped>
.w200{
    width: 200px !important;
}
.bgcolor {
  color: #999 !important;
}
.activity-list {
  .table {
    margin: 20px 30px 10px 0;
    .foot-page {
      float: right;
      margin-top: 10px;
      margin-bottom: 30px;
    }
  }
  .detail-content {
    cursor: pointer;
    color: #20a0ff;
  }
}
</style>

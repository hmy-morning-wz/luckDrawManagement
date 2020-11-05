<template>
    <div class="activity-list">
        <div class="pl30 pt20">
            <div class="content">
                <el-row class="lh40 mt10">
                    <el-col :span="24">
                        <div class="float-left">
                            <el-date-picker
                                v-model="searchParams.begin_time"
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
                                placeholder="选择日期时间"
                                :picker-options="endPickerOptions"
                                :editable="false"
                            ></el-date-picker>
                        </div>
                        <div class="float-left ml10">
                            <el-button type="primary" @click="handleSearch">搜索</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="table">
                <div class="tableList">
                    <el-table :data="tableData">
                        <el-table-column prop="user_id" label="用户id" min-width="30" align="center"></el-table-column>
                        <el-table-column
                            label="申请时间"
                            min-width="70"
                            show-overflow-tooltip
                            align="center"
                        >
                            <template slot-scope="scope">
                                <span class="">{{scope.row.apply_time}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="cooperation_info" label="申请内容" min-width="100" align="center">
                            <template slot-scope="scope">
                                <div class="cooperation_info">{{scope.row.cooperation_info}}</div>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column label="操作" min-width="60">
                            <template slot-scope="scope" style="text-align:center">
                                <div style="display:flex">
                                    <el-button type="text" @click="handleDetail(scope.row.id)">查看</el-button>
                                </div>
                            </template>
                        </el-table-column> -->
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
import activityService from "../../service/luckDrawManagement/lotteryManage.js";
import moment from "@/utils/moment";
import AppLoading from '../../components/loading'

export default {
  data() {
    return {
      loadingShow: false,
      tableData: [],
      searchParams: {
        begin_time: "",
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
      activityService.getCooperationList(data).then(
        response => {
          if (response.list instanceof Array) {
            this.tableData = response.list;
          } else {
            this.tableData = [];
          }
          this.totalSize = response.total;
          console.log(response);
        },
        response => {
          this.$message.error(response.message)
          console.log(response.message);
        }
      );
    },
    // 确认
    handleSearch() {
      this.searchParams.page = 1;
      this.getTableList();
    },
    // 跳转到详情
    handleDetail(id) {
      const router = `./lotteryEdit?id=${id}&type=1`;
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
      if (params.begin_time) {
        params.begin_time = moment(params.begin_time).formats();
      }
      if (params.end_time) {
        params.end_time = moment(params.end_time).formats();
      }
      return params;
    },
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
          return time.getTime() < self.searchParams.begin_time;
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
  .cooperation_info {

  }
}
</style>

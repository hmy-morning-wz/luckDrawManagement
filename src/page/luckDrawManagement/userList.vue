<template>
    <div class="activity-list">
        <div class="pl30 pt20">
            <div class="content">
                <el-row class="lh40 mt10">
                    <el-col :span="24">
                        <div class="float-left ml10">活动名称</div>
                        <div class="float-left ml10">
                            <div class="activity_name ml10">
                              {{activity_name}}
                            </div>
                        </div>
                        <div class="float-left ml10">&nbsp;&nbsp;中奖奖品</div>
                        <div class="float-left ml10">
                            <el-input v-model="searchParams.prize_name" placeholder="请输入内容"></el-input>
                        </div>
                        <div class="float-left ml10" style="margin-left: 30px">
                            <el-button type="primary" @click="handleSearch">搜索</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="table">
                <div class="tableList">
                    <el-table :data="tableData">
                        <el-table-column type="index" label="序号" min-width="50" align="center"></el-table-column>
                        <el-table-column prop="activity_name" label="用户id" min-width="35" align="center">
                            <template slot-scope="scope">
                                <div>{{scope.row.user_id}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="参与时间"
                            min-width="50"
                            show-overflow-tooltip
                            align="center"
                        >
                            <template slot-scope="scope">
                                <span class="">{{scope.row.join_time}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="award_state"
                            label="是否中奖"
                            min-width="30"
                            :formatter="formatReleaseStatus"
                            align="center"
                        ></el-table-column>
                        <el-table-column prop="jackpot_amt" label="中奖奖品" min-width="65" align="center">
                            <template slot-scope="scope">
                                <div v-for="(item, index) in scope.row.activity_award_list" :key="index">{{item}}<br></div>
                                <div v-if="!scope.row.activity_award_list">无</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="jackpot_amt" label="收货地址" min-width="65" align="center">
                            <template slot-scope="scope">
                                <div>{{scope.row.address}}</div>
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
import activityService from "../../service/luckDrawManagement/lotteryManage.js";
import moment from "@/utils/moment";
import AppLoading from '../../components/loading'

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
      tableData: [],
      activity_name: this.$route.query.activity_name,
      searchParams: {
        page: 1,
        size: 10,
        activity_id: this.$route.query.activity_id,
        prize_name: ''
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
      // console.log(data)
      activityService.getUserList(data).then(
        response => {
          if (response.list instanceof Array) {
            this.tableData = response.list;
          } else {
            this.tableData = [];
          }
          this.totalSize = response.total;
          // console.log(response);
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
    formatReleaseStatus(row, column) {
      if (row.award_state == '0') {
        return "待开奖";
      }
      if (row.award_state == '1') {
        return "未中奖";
      }
      if (row.award_state == '2') {
        return "已中奖";
      }
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
    }
  },
  computed: {
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
  .activity_name {
    height: 41px;
    line-height: 41px;
    background: white;
    padding: 0 50px 0 15px;
    border: 1px solid #D8DCE5;
    border-radius: 3px;
  }
}
</style>

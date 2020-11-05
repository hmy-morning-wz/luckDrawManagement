<template>
    <div class="activity-list">
        <div class="pl30 pt20" style="margin-left:150px;margin-top:66px;">
            <div class="content">
                <el-row class="lh40 mt10">
                    <el-col :span="24">
                        <div class="float-left ml10">卡券描述修改</div>
                    </el-col>
                </el-row>
            </div>
            <el-input
                style="width:450px"
                type="textarea"
                :autosize="{ minRows: 10, maxRows: 28}"
                placeholder="请输入描述内容"
                v-model="description"
            ></el-input>
            <el-button type="primary" @click="editDescription">修改</el-button>
        </div>
        <app-loading :loadingShow="loadingShow"></app-loading>
    </div>
</template>
<script>
import activityService from "../../service/luckDrawManagement/luckCouponMana.js";
import moment from "@/utils/moment";
import AppLoading from '../../components/loading'

export default {
  data() {
    return {
      loadingShow: false,
      description: ''
    };
  },
  created() {
    this.getDescription()
  },
  components: {
    AppLoading
  },
  methods: {
    getDescription() {
      activityService.getDescription().then(
        response => {
          this.description = response.description || ''
        },
        response => {
          this.$message.error(response.message)
          console.log(response.message);
        }
      );
    },
    editDescription() {
      const data = {
        description: this.description
      }
      activityService.editDescription(data).then(
        response => {
          this.$message({
              message: '修改成功',
              type: 'success'
            })
        },
        response => {
          this.$message.error(response.message)
          console.log(response.message);
        }
      );
    },
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
    min-width: 220px;
    background: white;
    padding: 0 50px 0 15px;
    border: 1px solid #D8DCE5;
    border-radius: 3px;
  }
}
</style>

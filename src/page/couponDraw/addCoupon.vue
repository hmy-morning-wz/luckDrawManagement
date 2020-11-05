<template>
  <div class="add-goods">
    <div class="pl20px pt30 pr20 mt10">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="180px"
        class="demo-ruleForm"
      >
        <el-form-item label="卡券名称" prop="name">
          <el-input v-model="ruleForm.name" class="w350" :disabled="type"
           placeholder="卡券内容名称"></el-input>
        </el-form-item>

        <div style="display:flex">
          <el-form-item label="开始时间" required prop="start_time">
            <el-date-picker
                v-model="ruleForm.start_time"
                type="datetime"
                placeholder="卡券有效开始时间"
                :picker-options="beginPickerOptions"
                :editable="false"
                :disabled="type"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="结束时间" required prop="end_time">
            <el-date-picker
                v-model="ruleForm.end_time"
                type="datetime"
                placeholder="卡券有效结束时间"
                :picker-options="endPickerOptions"
                :editable="false"
                :disabled="type"
            ></el-date-picker>
          </el-form-item>
        </div>

        <el-form-item label="卡券主标题" required prop="title">
            <el-input
                style="width:450px"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 8}"
                :maxlength="100"
                placeholder="请输入描述内容"
                v-model="ruleForm.title"
                :disabled="type"
            ></el-input>
        </el-form-item>

        <el-form-item label="卡券副标题" required prop="subtitle">
            <el-input
                style="width:450px"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 8}"
                :maxlength="100"
                placeholder="请输入描述内容"
                v-model="ruleForm.subtitle"
                :disabled="type"
            ></el-input>
        </el-form-item>

        <div style="display:flex">
          <el-form-item label="卡券跳转类型" prop="url_type">
            <el-select v-model="ruleForm.url_type" :disabled="type" :class="{'w100':ruleForm.url_type==1}" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item v-if="ruleForm.url_type == 1" label="APPID" prop="app_id">
            <el-input v-model="ruleForm.app_id" :disabled="type" class="w170" placeholder="小程序appid"></el-input>
          </el-form-item>
          <el-form-item v-else-if="ruleForm.url_type != 0" label="卡券跳转地址" prop="url">
            <el-input v-model="ruleForm.url" :disabled="type" class="w200" placeholder="跳转地址"></el-input>
          </el-form-item>
        </div>

        <div style="display:flex">          
          <el-form-item v-if="ruleForm.url_type == 1" label="跳转页面" prop="url">
            <el-input v-model="ruleForm.url" :disabled="type" class="w200" placeholder="跳转指定小程序页面"></el-input>
          </el-form-item>
          <el-form-item v-if="ruleForm.url_type == 1" label="小程序参数" prop="skip_extra_data">
            <el-input v-model="ruleForm.skip_extra_data" :disabled="type" class="w200" placeholder="跳转小程序时带的参数"></el-input>
          </el-form-item>
        </div>
                
        <div style="display:flex">
          <el-form-item label="卡券类型" required>
            <el-select v-model="ruleForm.type" :disabled="type" placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否热门推荐" v-if="ruleForm.type==0" required prop="is_hot">
            <el-radio v-model="ruleForm.is_hot" :label="1" :disabled="type">是</el-radio>
            <el-radio v-model="ruleForm.is_hot" :label="0" :disabled="type">否</el-radio>
          </el-form-item>
        </div>


        <el-form-item>
          <el-button v-if="!type" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
    <app-loading :loadingShow="loadingShow"></app-loading>
  </div>
</template>
<script>
import couponService from '../../service/luckDrawManagement/luckCouponMana.js'
import apiHost from '@/hostconfig/index'
import moment from '@/utils/moment'
import headTop from '../../components/headTop'
import UE from '../../components/ue/ue.vue'
import AppLoading from '../../components/loading'
import { delData } from '../../utils/ajax.js';

export default {
  data() {
    return {
      loadingShow: false,
      ue1: 'ue1', // 不同编辑器必须不同的id
      type: false,
      is_set_pond: true,
      options: [
        {
          value: 0,
          label: '不跳转'
        },
        {
          value: 1,
          label: '小程序'
        },
        {
          value: 2,
          label: '淘宝'
        },
        {
          value: 3,
          label: '天猫'
        },
        {
          value: 4,
          label: '新浪微博'
        },
        {
          value: 5,
          label: '生活号'
        }
      ],
      options2: [
        {
          value: 1,
          label: '中奖奖品'
        },
        {
          value: 0,
          label: '推荐奖品'
        }
      ],
      value: '',
      ruleForm: {
        name: '',
        title: '',
        subtitle: '',
        start_time: '',
        end_time: '',
        url_type: '',
        url: '',
        app_id: '',
        is_hot: 1,
        type: '',
      },
      headers: {
        UserToken: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入卡券名称', trigger: 'blur' },
          // { min: 1, max: 300, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入卡券主标题', trigger: 'blur' },
        ],
        subtitle: [
          { required: true, message: '请输入卡券副标题', trigger: 'blur' },
        ],
        start_time: [
          { required: true, message: '开始时间', trigger: 'blur' },
        ],
        end_time: [
          { required: true, message: '结束时间', trigger: 'blur' },
        ],
      }
    }
  },
  created() {
  },
  updated() {
  },
  components: {
    AppLoading,
    UE
  },
  methods: {
    submitForm(formName) {
      this.ruleForm.start_time = moment(this.ruleForm.start_time).formats()
      this.ruleForm.end_time = moment(this.ruleForm.end_time).formats()
      
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(this.ruleForm.type!==''){
            const data = JSON.parse(JSON.stringify(this.ruleForm))  
            console.log(data)
            couponService.addCoupon(data).then(
              response => {
                this.$message({
                  message: '创建成功',
                  type: 'success'
                })
                const router = `./couponList`
                this.$router.push(router)
              },
              response => {
                this.$message.error(response.message)
              }
            )   
          } else {
            this.$message.error('卡券类型必选')
            return false
          }                          
        } else {
          this.$message.error('表单验证错误')
          console.log('error submit!!')
          return false
        }
      })
    },
  },
  mounted() {
    this.$nextTick(() => {
    })    
  },
  computed: {
    beginPickerOptions() {
      let self = this
      return {
        disabledDate(time) {
          if (self.ruleForm.end_time) {
            return time > self.ruleForm.end_time
          }
        }
      }
    },
    endPickerOptions() {
      let self = this
      return {
        disabledDate(time) {
          return time < self.ruleForm.start_time
        }
      }
    }
  },
  watch: {
    loadingShow(val) {
      return val
    }
  }
}
</script>
<style>
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
  margin: 10px 10px 0 0;
}
.header-banner {
  position: relative;
}
.deletImg {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: default;
  text-align: center;
  color: #fff;
  opacity: 0;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s;
}
.deletImg:hover {
  opacity: 1;
}
.deletImg2 {
  position: absolute;
  top: 40%;
  left: 45%;
}
</style>

<style lang="scss" scoped>
.bgcolor {
  color: #999 !important;
}
#editor {
  width: 800px;
}
.comm-dis {
  display: flex;
}
.add-goods {
  .quan {
    margin: -10px 0 0 120px;
    // display: flex;
    line-height: 32px;
    color: #595e66;
  }
  .quan:after {
    content: ' ';
    display: block;
    height: 0;
    clear: both;
  }
  .tips {
    margin: 0 0 10px 200px;
    color: #f56c6c;
    font-size: 12px;
  }
  .commodityList {
    width: 500px;
    margin: 0 0 20px 200px;
  }
  .table {
    margin: 20px 30px 10px 0;
    width: 500px;
  }
  .detail-content {
    cursor: pointer;
    color: #20a0ff;
  }
}
</style>

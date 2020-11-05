<template>
  <div class="add-goods" style="padding-top:60px;">
    <div class="pl20px pt30 pr20 mt10">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="180px"
        class="demo-ruleForm"
      >
        <div style="display:flex">
          <el-form-item label="广告位类型" required>
            <el-select v-model="ruleForm.position" :disabled="type||hasLaunched" placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关联活动" v-if="ruleForm.position=='1'">
            <el-select v-model="ruleForm.activity_id" :disabled="type||hasLaunched" placeholder="请选择">
              <el-option
                v-for="item in options3"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </div>

        <div style="display:flex">
          <el-form-item label="广告标题" prop="name">
            <el-input v-model="ruleForm.name" class="w240" :disabled="type"
            placeholder="广告名称" maxlength="10"></el-input>
          </el-form-item>
          <el-form-item label="按钮文案" v-if="ruleForm.position=='1'" prop="button_name">
            <el-input v-model="ruleForm.button_name" class="w200" :disabled="type"
            placeholder="4字以内" maxlength="4"></el-input>
          </el-form-item>
        </div>

        <div style="display:flex" v-if="ruleForm.position=='2'">
          <el-form-item label="开始时间" prop="start_time">
            <el-date-picker
                v-model="ruleForm.start_time"
                type="datetime"
                placeholder="开始时间"
                :picker-options="beginPickerOptions"
                :editable="false"
                :disabled="type||hasLaunched"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="结束时间" prop="end_time">
            <el-date-picker
                v-model="ruleForm.end_time"
                type="datetime"
                placeholder="结束时间"
                :picker-options="endPickerOptions"
                :editable="false"
                :disabled="type||hasLaunched"
            ></el-date-picker>
          </el-form-item>
        </div>

        <div v-if="ruleForm.position=='2'">
          <div style="display:flex">
            <el-form-item label="跳转类型" prop="url_type">
              <el-select v-model="ruleForm.url_type" :disabled="type" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="ruleForm.url_type == 1">
            </el-form-item>
            <el-form-item v-else-if="ruleForm.url_type != 0 && ruleForm.url_type != 6" label="赞助商地址" prop="sponsor_url">
              <el-input v-model="ruleForm.url" :disabled="type" class="w200" placeholder="赞助商地址"></el-input>
            </el-form-item>
          </div>

          <div style="display:flex" v-if="ruleForm.url_type == 1 || ruleForm.url_type == 6">
            <el-form-item label="APPID" prop="app_id">
              <el-input v-model="ruleForm.app_id" :disabled="type" class="w200" placeholder="小程序appid"></el-input>
            </el-form-item>
            <el-form-item label="跳转页面/口碑参数" prop="sponsor_url">
              <el-input v-model="ruleForm.url" :disabled="type" class="w200" placeholder="跳转指定小程序页面"></el-input>
            </el-form-item>
            <el-form-item label="小程序参数" prop="skip_extra_data">
              <el-input v-model="ruleForm.skip_extra_data" :disabled="type" class="w200" placeholder="跳转小程序时带的参数"></el-input>
            </el-form-item>
          </div>
                  
          <el-form-item label="广告图片" prop="img">
            <div class="comm-dis">
              <div class="header-banner">
                <img v-if="ruleForm.img" :src="ruleForm.img" class="avatar">
                <span class="deletImg" v-if="!type">
                  <span class="deletImg2" @click="handleCoverDelete">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
              <div v-show="!ruleForm.img">
                <el-upload
                  class="avatar-uploader"
                  name="multipartFiles"
                  :action="uploadimgUrl"
                  :show-file-list="false"
                  :on-success="handleCoverSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </div>
          </el-form-item>
          <div style="display:flex">
            <el-form-item label="是否置顶" v-if="ruleForm.position==2" prop="is_top">
              <el-radio v-model="ruleForm.is_top" :label="1" :disabled="type||hasLaunched">是</el-radio>
              <el-radio v-model="ruleForm.is_top" :label="0" :disabled="type||hasLaunched">否</el-radio>
            </el-form-item>
          </div>
        </div>


        <el-form-item>
          <el-button v-if="!type" type="primary" @click="submitForm('ruleForm')">编辑</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import moment from '@/utils/moment'
import adService from '../../service/luckDrawManagement/adManage.js'
import apiHost from '@/hostconfig/index'
export default {
  data() {
    return {
      type: true,
      hasLaunched: false,
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
        },
        {
          value: 6,
          label: '口碑'
        }
      ],
      options2: [
        {
          value: 1,
          label: '首页弹框'
        },
        {
          value: 2,
          label: '活动详情底部图片广告'
        }
      ],
      options3: [],
      value: '',
      ruleForm: {
        position: '',
        activity_id: '',//关联活动id
        name: '',
        button_name: '',
        is_top: '',
        start_time: '',
        end_time: '',
        url_type: '',
        url: '',
        app_id: '',
        img: ''
      },
      uploadimgUrl: `${apiHost.netImg}file/upload_file`,
      rules: {
        name: [
          { required: true, message: '请输入广告标题', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    getAdDetail() {
      adService.getAdDetail(this.$route.query.id).then(
        response => {
          this.ruleForm = JSON.parse(JSON.stringify(response))
          console.log(this.ruleForm)
        },
        response => {
          this.$message.error(response.message)
        }
      ) 
    },
    submitForm(formName) {
      this.ruleForm.start_time = moment(this.ruleForm.start_time).formats()
      this.ruleForm.end_time = moment(this.ruleForm.end_time).formats()
      
      this.$refs[formName].validate(valid => {
        if (valid) {
            const data = JSON.parse(JSON.stringify(this.ruleForm))  
            console.log(data)
            adService.editAd(data).then(
              response => {
                this.$message({
                  message: '编辑成功',
                  type: 'success'
                })
                const router = `./adsenseMana`
                this.$router.push(router)
              },
              response => {
                this.$message.error(response.message)
              }
            )                           
        } else {
          this.$message.error('表单验证错误')
          console.log('error submit!!')
          return false
        }
      })
    },
    getRelatedList() {
      adService.relatedActivity().then(
        response => {
          this.options3 = response
        },
        response => {
          this.$message.error(response.message)
        }
      )    
    },
    handleCoverDelete() {
      this.ruleForm.img = ''
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleCoverSuccess(res, file) {
      this.ruleForm.img = `https://sit-img-citytsm.oss-cn-hangzhou.aliyuncs.com/${res.data}`
    },
  },
  mounted() {
    this.$nextTick(() => {
    })    
  },
  async created() {
    if (this.$route.query.type == 2) this.type = false
    if (this.$route.query.state == 1) this.hasLaunched = true
    await this.getRelatedList()
    this.getAdDetail()
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
.comm-dis {
  display: flex;
}
</style>
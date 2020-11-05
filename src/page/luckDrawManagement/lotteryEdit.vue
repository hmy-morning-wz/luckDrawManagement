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
        <el-form-item label="活动名称" prop="activity_name">
          <el-input v-model="ruleForm.activity_name" class="w350" :disabled="type"
           placeholder="活动内容名称"></el-input>
        </el-form-item>

        <div style="display:flex" >
          <el-form-item label="奖品1名称" required prop="award.name">
            <el-input v-model="ruleForm.award.name" class="w200" :disabled="type" placeholder="奖品名称"></el-input>
          </el-form-item>

          <el-form-item label="奖品1份数" required prop="award.num">
            <el-input v-model="ruleForm.award.num" type="number" class="w200" :disabled="type" placeholder="中奖人数"></el-input>
          </el-form-item>
        </div>

        <div style="display:flex" >
          <el-form-item label="奖品1类型" required>
            <el-select v-model="selectValue.prizeType1" :disabled="type" placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="奖品选择" v-if="selectValue.prizeType1==1">
            <el-select v-model="selectValue.prize1" :disabled="type" placeholder="请选择">
              <el-option
                v-for="item in prizeList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="乘车券id" v-if="selectValue.prize1===-1 && selectValue.prizeType1==1">
            <el-input v-model="ruleForm.award.bus_coupon_template_id" class="w200" :disabled="type" placeholder="选择乘车券"></el-input>
          </el-form-item>
        </div>

        <div v-if="selectValue.prize1===-2 && selectValue.prizeType1==1" style="display:flex" >
          <el-form-item label="中奖码">
            <el-input
                style="width:30vw"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 8}"
                placeholder="请输入中奖码，以英文逗号分隔，不需要结尾句号"
                v-model="ruleForm.award.bus_coupon_template_id"
                :disabled="type"
            ></el-input>
          </el-form-item>

          <el-form-item label="使用说明">
            <el-input
                style="width:30vw"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 8}"
                placeholder="请输入中奖码的使用说明"
                v-model="ruleForm.award.instruction"
                :disabled="type"
            ></el-input>
          </el-form-item>
        </div>

        <div style="display:flex" >
          <el-form-item label="奖品2名称">
            <el-input v-model="ruleForm.award2.name" class="w200" :disabled="type" placeholder="奖品名称"></el-input>
          </el-form-item>

          <el-form-item label="奖品2份数">
            <el-input v-model="ruleForm.award2.num" type="number" class="w200" :disabled="type" placeholder="中奖人数"></el-input>
          </el-form-item>
        </div>

        <div style="display:flex" >
          <el-form-item label="奖品2类型">
            <el-select v-model="selectValue.prizeType2" :disabled="type" placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="奖品选择" v-if="selectValue.prizeType2==1">
            <el-select v-model="selectValue.prize2" :disabled="type" placeholder="请选择">
              <el-option
                v-for="item in prizeList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="乘车券id" v-if="selectValue.prize2===-1 && selectValue.prizeType2==1">
            <el-input v-model="ruleForm.award2.bus_coupon_template_id" class="w200" :disabled="type" placeholder="选择乘车券"></el-input>
          </el-form-item>
        </div>

        <div v-if="selectValue.prize2===-2 && selectValue.prizeType2==1" style="display:flex" >
          <el-form-item label="中奖码">
            <el-input
                style="width:30vw"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 8}"
                placeholder="请输入中奖码，以英文逗号分隔，不需要结尾句号"
                v-model="ruleForm.award2.bus_coupon_template_id"
                :disabled="type"
            ></el-input>
          </el-form-item>

          <el-form-item label="使用说明">
            <el-input
                style="width:30vw"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 8}"
                placeholder="请输入中奖码的使用说明"
                v-model="ruleForm.award2.instruction"
                :disabled="type"
            ></el-input>
          </el-form-item>
        </div>        

        <div style="display:flex">
          <!-- <span class="redFlag">*</span> -->
          <el-form-item label="开奖类型" required class="mlminus30">
            <el-select v-model="ruleForm.limit_type" :disabled="type||hasLaunched" placeholder="请选择">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="ruleForm.limit_type==1" class="mlminus50" label="开奖人数" prop="award.num">
            <el-input v-model="ruleForm.limit_num" class="w100" :disabled="type" placeholder="中奖人数"></el-input>
          </el-form-item>
          <el-form-item class="mlminus50" label="开始时间" required prop="start_time">
            <el-date-picker
                v-model="ruleForm.start_time"
                type="datetime"
                placeholder="开始日期时间"
                :picker-options="beginPickerOptions"
                :editable="false"
                :disabled="type||hasLaunched"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="结束时间" class="mlminus50" required prop="end_time">
            <el-date-picker
                v-model="ruleForm.end_time"
                type="datetime"
                placeholder="结束日期时间"
                :picker-options="endPickerOptions"
                :editable="false"
                :disabled="type||hasLaunched"
            ></el-date-picker>
          </el-form-item>
        </div>

        <div style="display:flex">
          <el-form-item label="赞助商名称" prop="sponsor_name">
            <el-input v-model="ruleForm.sponsor_name" class="w200" :disabled="type" placeholder="赞助商名称"></el-input>
          </el-form-item>

          <el-form-item label="跳转类型" prop="value">
            <el-select v-model="value" :disabled="type" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item v-if="value == 1">
          </el-form-item>
          <el-form-item v-else-if="value != 0 && value != 6" label="赞助商地址" prop="sponsor_url">
            <el-input v-model="ruleForm.sponsor_url" :disabled="type" class="w200" placeholder="赞助商地址"></el-input>
          </el-form-item>
        </div>

        <div style="display:flex" v-if="value == 1 || value == 6">
          <el-form-item label="APPID" prop="app_id">
            <el-input v-model="ruleForm.app_id" :disabled="type" class="w200" placeholder="小程序appid"></el-input>
          </el-form-item>
          <el-form-item label="跳转页面/口碑参数" prop="sponsor_url">
            <el-input v-model="ruleForm.sponsor_url" :disabled="type" class="w200" placeholder="跳转指定小程序页面"></el-input>
          </el-form-item>
          <el-form-item v-if="value!=6" label="小程序参数" prop="skip_extra_data">
            <el-input v-model="ruleForm.skip_extra_data" :disabled="type" class="w200" placeholder="跳转小程序时带的参数"></el-input>
          </el-form-item>
        </div>

        <el-form-item label="赞助商描述" prop="sponsor_info">
            <el-input
                style="width:450px"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 8}"
                placeholder="请输入描述内容"
                v-model="ruleForm.sponsor_info"
                :disabled="type"
            ></el-input>
        </el-form-item>

        <!-- <el-form-item label="奖品封面图" required prop="smallImages">
          <div class="comm-dis">
            <div class="header-banner" v-for="(item,index) in ruleForm.smallImages" :key="index">
              <img v-if="item" :src="item" class="avatar">
              <span class="deletImg" v-show="ruleForm.smallImages">
                <span class="deletImg2" @click="handleDelete(index)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
            <div>
              <el-upload
                class="avatar-uploader"
                :action="uploadimgUrl"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
        </el-form-item> -->
        <el-form-item label="奖品封面图" required prop="img">
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
                
        <el-form-item label="商品描述:" required prop="note">
          <div class="components-container">
            <div class="editor-container">
              <div id="editor"></div>
            </div>
          </div>
        </el-form-item>
        
        <div style="display:flex">
          <el-form-item label="奖池是否配置" required prop="is_pond">
            <el-radio v-model="ruleForm.is_pond" :label="1" :disabled="type||hasLaunched">是</el-radio>
            <el-radio v-model="ruleForm.is_pond" :label="0" :disabled="type||hasLaunched">否</el-radio>
          </el-form-item>
          <el-form-item label="是否随机瓜分奖池" required prop="is_random">
            <el-radio v-model="ruleForm.is_random" :label="1" :disabled="type||hasLaunched||(ruleForm.is_pond===0)">是</el-radio>
            <el-radio v-model="ruleForm.is_random" :label="0" :disabled="type||hasLaunched||(ruleForm.is_pond===0)">否</el-radio>
          </el-form-item>
        </div>

        <div style="display:flex">
          <el-form-item label="奖池初始金额" class="fl" style="margin-bottom:0" prop="pond_amt">
            <el-input v-model="ruleForm.pond_amt" class="w200"
            placeholder="奖池初始金额" :disabled="type||(ruleForm.is_pond===0)||hasLaunched">
            </el-input>
          </el-form-item>
          <el-form-item label="奖池上线金额" prop="pond_amt_limit">
            <el-input v-model="ruleForm.pond_amt_limit" class="w200"
            placeholder="奖池上线金额" :disabled="type||(ruleForm.is_pond===0)||hasLaunched"></el-input>
          </el-form-item>  
        </div>      
        
        <div style="display:flex">
          <el-form-item label="奖池中奖比例" class="fl" style="margin-bottom:0" prop="pond_prod">
            <el-input v-model="ruleForm.pond_prod" class="w200"
            placeholder="中奖百分比，1-100" :disabled="type||(ruleForm.is_pond===0)||hasLaunched"></el-input>
          </el-form-item>
          <el-form-item label="助力金额范围" prop="pond_power_down">
            <el-input v-model="ruleForm.pond_power_down" class="w120"
            placeholder="最低0" :disabled="type||(ruleForm.is_pond===0)"
            @change="compareAmt"></el-input> -
            <el-input v-model="ruleForm.pond_power_up" class="w120"
            placeholder="最高10" :disabled="type||(ruleForm.is_pond===0)"
            @change="compareAmt"></el-input>
          </el-form-item>
        </div>

        <el-form-item label="抽奖用户引导是否配置" required prop="is_pond">
          <el-radio v-model="ruleForm.is_lead" :label="1" :disabled="type">是</el-radio>
          <el-radio v-model="ruleForm.is_lead" :label="0" :disabled="type">否</el-radio>
        </el-form-item>

        <el-form-item label="营销文案" prop="marketing_content">
            <el-input
                style="width:450px"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 8}"
                placeholder="请输入描述内容"
                v-model="ruleForm.marketing_content"
                :disabled="type||(ruleForm.is_lead===0)"
            ></el-input>
        </el-form-item>

        <div style="display:flex">
          <el-form-item label="按钮文案" prop="button_name">
            <el-input v-model="ruleForm.button_name" class="w200"
            placeholder="4字以内" maxlength="4" :disabled="type||(ruleForm.is_lead===0)"></el-input>
          </el-form-item> 
          <el-form-item label="跳转类型" prop="value">
            <el-select v-model="ruleForm.lead_url_type" :disabled="type||(ruleForm.is_lead===0)" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="ruleForm.lead_url_type == 1">
          </el-form-item>
          <el-form-item v-else-if="ruleForm.lead_url_type != 0 && ruleForm.lead_url_type != 6" label="赞助商地址" prop="sponsor_url">
            <el-input v-model="ruleForm.lead_url" :disabled="type||(ruleForm.is_lead===0)" class="w200" placeholder="赞助商地址"></el-input>
          </el-form-item>
        </div>
        <div style="display:flex" v-if="ruleForm.lead_url_type == 1 || ruleForm.lead_url_type == 6">
          <el-form-item label="APPID" prop="app_id">
            <el-input v-model="ruleForm.lead_app_id" :disabled="type||(ruleForm.is_lead===0)" class="w200" placeholder="小程序appid"></el-input>
          </el-form-item>
          <el-form-item label="跳转页面/口碑参数" prop="sponsor_url">
            <el-input v-model="ruleForm.lead_url" :disabled="type||(ruleForm.is_lead===0)" class="w200" placeholder="跳转指定小程序页面"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="是否隐藏活动" required prop="is_show">
          <el-radio v-model="ruleForm.is_show" :label="0" :disabled="type">是</el-radio>
          <el-radio v-model="ruleForm.is_show" :label="1" :disabled="type">否</el-radio>
        </el-form-item>

        <el-form-item>
          <el-button v-if="!type" type="primary" @click="submitForm('ruleForm')">编辑</el-button>
        </el-form-item>
      </el-form>
    </div>
    <app-loading :loadingShow="loadingShow"></app-loading>
  </div>
</template>
<script>
import activityService from '../../service/luckDrawManagement/lotteryManage.js'
import apiHost from '@/hostconfig/index'
import moment from '@/utils/moment'
import headTop from '../../components/headTop'
import UE from '../../components/ue/ue.vue'
import AppLoading from '../../components/loading'

export default {
  data() {
    return {
      loadingShow: false,
      ue1: 'ue1', // 不同编辑器必须不同的id
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
          value: 0,
          label: '实物奖品'
        },
        {
          value: 1,
          label: '虚拟奖品'
        }
      ],
      options3: [
        {
          value: 0,
          label: '时间到即开奖'
        },
        {
          value: 1,
          label: '人数满就开奖'
        }
      ],
      prizeList: [
      ],
      selectValue: {
        prizeType1: '',
        prizeType2: '',
        prize1:'',
        prize2: '',
      },
      value: '',
      ruleForm: {
        activity_name: '',
        limit_type: '',
        limit_num: '',
        note: '',
        start_time: '',
        end_time: '',
        sponsor_name: '',
        url_type: '',
        sponsor_url: '',
        skip_extra_data: '',
        app_id: '',
        sponsor_info: '',
        img: '',
        is_pond: '',
        is_random: '',
        is_lead: '',
        lead_url_type: '',
        is_show: '',
        pond_amt: '',
        pond_amt_limit: '',
        pond_prod: '',
        pond_power_down: '',
        pond_power_up: '',
        award: {
          name: '',
          num: '',
          lottery_id: '',
          type: '',
          bus_coupon_template_id: ''
        },
        award2: {
          name: '',
          num: '',
          lottery_id: '',
          type: '',
          bus_coupon_template_id: ''
        },
        activity_award_list: []
      },
      headers: {
        UserToken: ''
      },
      uploadimgUrl: `${apiHost.netImg}file/upload_file`,
      rules: {
        activity_name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          // { min: 1, max: 300, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        note: [
          { required: true, message: '请输入描述内容', trigger: 'blur' }
        ],
        pond_amt: [
          { required: true, message: '请输入奖池初始金额', trigger: 'blur' }
        ],
        pond_amt_limit: [
          { required: true, message: '请输入奖池上限金额', trigger: 'blur' }
        ],
        pond_prod: [
          { required: true, message: '请输入奖池中奖比例', trigger: 'blur' }
        ],
        sponsor_name: [
          { required: true, message: '请输入赞助商名称', trigger: 'blur' }
        ],
        sponsor_info: [
          { required: true, message: '请输入赞助商描述', trigger: 'blur' }
        ],
        pond_power_down: [
          { required: true, message: '请输入助力金额范围', trigger: 'blur' }
        ],
        pond_power_up: [
          { required: true, message: '请输入助力金额范围', trigger: 'blur' }
        ],
        // award_name: [{ required: true, message: '请输入奖品名称' }],
        // award_num: [{ required: true, message: '请输入奖品份数' }],
        img: [{ required: true, message: '封面图片' }],
      }
    }
  },
  created() {
    if (this.$route.query.type == 2) this.type = false
    if (this.$route.query.state == 1) this.hasLaunched = true

    this.getPrizeList()
  },
  updated() {
  },
  components: {
    AppLoading,
    UE
  },
  methods: {
    getLotteryDetail() {
      activityService.getLotteryDetail(this.$route.query.id).then(
        response => {
          this.ruleForm = JSON.parse(JSON.stringify(response))
          console.log(this.ruleForm)
          this.value = response.url_type
          if(response.start_time) this.ruleForm.start_time = new Date(response.start_time)
          this.ruleForm.end_time = new Date(response.end_time)
          this.ruleForm.award = response.activity_award_list[0]
            this.selectValue.prizeType1 = response.activity_award_list[0].type
            this.selectValue.prize1 = response.activity_award_list[0].lottery_id
          if(response.activity_award_list.length>1) {
            this.ruleForm.award2 = response.activity_award_list[1]
            this.selectValue.prizeType2 = response.activity_award_list[1].type
            this.selectValue.prize2 = response.activity_award_list[1].lottery_id
          } else {
            this.ruleForm.award2 = {
              name: '',
              num: '',
              lottery_id: '',
              type: ''
            }
            this.selectValue.prizeType2 = ''
            this.selectValue.prize2 = ''
          }
          this.ruleForm.pond_amt = response.pond_amt/100
          this.ruleForm.pond_amt_limit = response.pond_amt_limit/100
          this.ruleForm.pond_power_down = response.pond_power_down/100
          this.ruleForm.pond_power_up = response.pond_power_up/100
          this.editor.txt.html(response.note)
          if(!response.is_pond) {
            delete this.rules.pond_amt
            delete this.rules.pond_amt_limit
            delete this.rules.pond_power_down
            delete this.rules.pond_power_up
            delete this.rules.pond_prod
            console.log(this.rules)
          }
          console.log(this.ruleForm)
          console.log(this.selectValue)
        },
        response => {
          this.$message.error(response.message)
        }
      )
    },
    getPrizeList() {
      activityService.getPrizeList(this.$route.query.id).then(
        response => {
          let plist = {name: "公交乘车券", id: -1}
          let plist2 = {name: "中奖码", id: -2}
          response.unshift(plist)
          response.unshift(plist2)
          console.log(this.prizeList)
          this.prizeList = response
        },
        response => {
          this.$message.error(response.message)
        }
      )
    },
    compareAmt(val) {
      console.log(this.ruleForm.pond_power_down+','+this.ruleForm.pond_power_up)
      if(this.ruleForm.pond_power_down!=='' && this.ruleForm.pond_power_up!=='') {
        console.log('not null')
        if(Number(this.ruleForm.pond_power_down) > Number(this.ruleForm.pond_power_up)) {
          console.log(this.ruleForm.pond_power_down,this.ruleForm.pond_power_up)
          this.$message.error('右边数值须大于左边');
          this.ruleForm.pond_power_down = 0
          this.ruleForm.pond_power_up = 0
        }
      }
    },
    isSetPond(val) {
      if(val == 0) {
        delete this.rules.pond_amt
        delete this.rules.pond_amt_limit
        delete this.rules.pond_power_down
        delete this.rules.pond_power_up
        delete this.rules.pond_prod
        console.log(this.rules)
      }
      if(val==1) {
        this.rules.pond_amt = [
          { required: true, message: '请输入奖池初始金额', trigger: 'blur' }
        ]
        this.rules.pond_amt_limit = [
          { required: true, message: '请输入奖池上限金额', trigger: 'blur' }
        ]
        this.rules.pond_power_down = [
          { required: true, message: '请输入助力金额范围', trigger: 'blur' }
        ]
        this.rules.pond_power_up = [
          { required: true, message: '请输入助力金额范围', trigger: 'blur' }
        ]
        this.rules.pond_prod = [
          { required: true, message: '请输入奖池中奖比例', trigger: 'blur' }
        ]
        console.log(this.rules)
      }
    },
    handleDelete(index) {
      this.$confirm('是否删除图片?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.ruleForm.smallImages.splice(index, 1)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已撤销'
          })
        })
    },
    handleCoverDelete() {
      this.ruleForm.img = ''
    },
    submitForm(formName) {
      this.ruleForm.note = this.editor.txt.html() // 调用子组件方法
      let htmlInfo = this.ruleForm.note
      if(htmlInfo.slice(-8,-4) == '<br>') {
        console.log('末尾换行了')
        const start = htmlInfo.slice(0,-8)
        const end = htmlInfo.slice(-4)
        this.ruleForm.note = start+end
        console.log(this.ruleForm.note)
      }
      this.ruleForm.start_time = moment(this.ruleForm.start_time).formats()
      this.ruleForm.end_time = moment(this.ruleForm.end_time).formats()
      this.ruleForm.url_type = this.value
      console.log(this.ruleForm.note)
      this.ruleForm.award.type = this.selectValue.prizeType1
      this.ruleForm.award.lottery_id = this.selectValue.prize1
      this.ruleForm.award2.type = this.selectValue.prizeType2
      this.ruleForm.award2.lottery_id = this.selectValue.prize2
      const award = this.ruleForm.award
      const award2 = this.ruleForm.award2
      this.ruleForm.activity_award_list = []
      this.ruleForm.activity_award_list.push(award)
      if(this.ruleForm.award2.name) {
        this.ruleForm.activity_award_list.push(award2)
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm.award.type+'ttyyppee')
          if(this.ruleForm.award.type === ''){
            this.$message.error('请选择奖品1类别')
            return false
          } else if(this.ruleForm.note!='<p><br></p>' && this.ruleForm.note!='<p></p>'){
            this.ruleForm.pond_amt = this.ruleForm.pond_amt*100
            this.ruleForm.pond_amt_limit = this.ruleForm.pond_amt_limit*100
            this.ruleForm.pond_power_down = this.ruleForm.pond_power_down*100
            this.ruleForm.pond_power_up = this.ruleForm.pond_power_up*100
            const data = JSON.parse(JSON.stringify(this.ruleForm))
            delete data.award
            delete data.award2 
            activityService.editLottery(data).then(
              response => {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
                const router = `./lotteryList`
                this.$router.push(router)
              },
              response => {
                this.ruleForm.pond_amt = this.ruleForm.pond_amt/100
                this.ruleForm.pond_amt_limit = this.ruleForm.pond_amt_limit/100
                this.ruleForm.pond_power_down = this.ruleForm.pond_power_down/100
                this.ruleForm.pond_power_up = this.ruleForm.pond_power_up/100
                // this.$message.error(response.message)
                this.$confirm(`${response.message}`, '', {
                  confirmButtonText: '确定',
                  type: 'error',
                  center: true
                }).then(() => {
                }).catch(() => {
                });
              }
            )
          } else {
            this.$message.error('请填写商品描述')
          }             
        } else {
          this.$message.error('表单验证错误')
          console.log('error submit!!')
          return false
        }
      })
    },
    initEditor() {
      var E = window.wangEditor;
      var editor = new E("#editor");
      this.editor = editor;
      this.editor.customConfig.uploadImgServer = `${
        apiHost.netImg
      }/file/upload_file`;
      this.editor.customConfig.withCredentials = true;
      this.editor.customConfig.uploadFileName = "multipartFiles";
      this.editor.customConfig.uploadImgParams = {};
      this.editor.customConfig.linkImgCallback = function(url) {
        console.log(result);
        var appendStr =
          '<p style="text-align: center;"><img src="' +
          result.data +
          '" style="max-width:100%;"><br></p>';
        editor.cmd.do(
          "insertHTML",
          `<img src="https://sit-img-citytsm.oss-cn-hangzhou.aliyuncs.com/${result.data}" style="max-width:100%;"/>`
        );
      };
      this.editor.customConfig.uploadImgHooks = {
        before: function(xhr, editor, files) {
          const isLt10M = files[0].size / 1024 / 1024 < 10;
          const isimg = files[0].type.indexOf("image") > -1;
          if (!isimg) {
            this.$message.error("只能上传图片!");
          }
          if (!isLt10M) {
            this.$message.error("上传文件不能超过 10MB!");
          }
          return isLt10M && isimg;
        },
        success: function(xhr, editor, result) {
          var appendStr =
            '<p style="text-align: center;"><img src="' +
            result.data +
            '" style="max-width:100%;"><br></p>';
          editor.cmd.do(
            "insertHTML",
            `<img src="https://sit-img-citytsm.oss-cn-hangzhou.aliyuncs.com/${result.data}" style="max-width:100%;"/>`
          );
        },
        fail: function(xhr, editor, result) {},
        error: function(xhr, editor) {},
        timeout: function(xhr, editor) {},
        customInsert: function(insertImg, result, editor) {}
      };
      editor.create();
    },
    handleAvatarSuccess(res, file) {
      const url = `https://sit-img-citytsm.oss-cn-hangzhou.aliyuncs.com/${res.data}`
      this.ruleForm.smallImages.push(url)
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
  async mounted() {
    this.$nextTick(() => {
      this.initEditor()
    })    
    await this.getLotteryDetail()
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
  .redFlag {
  position: relative;
  left: 112px;
  top: 5px;
  color: #f56c6c;
  margin-right: 4px;
}
}
</style>

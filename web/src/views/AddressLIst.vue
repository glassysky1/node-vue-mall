<template>
  <div class="address-list">
    <div class="add-wrapper">
      <button class="add-btn" @click="addressShowFlag=true">新增收货地址</button>
    </div>
    <div class="content">
      <div class="address-item">
        
      </div>
    <div class="no-result">
      <span class="text">暂无地址哎</span>
    </div>
    </div>
    <div class="bounce-address" v-show="addressShowFlag">
      <div class="top">
        <h3 class="title font16">新建收货地址</h3>
        <i class="el-icon-close" @click="addressShowFlag=false"></i>
      </div>
      <div class="center">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="收货人" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="所在城市" prop="city">
            <el-input v-model="ruleForm.city"></el-input>
          </el-form-item>
          <el-form-item label="所在街道" prop="streetName">
            <el-input v-model="ruleForm.streetName"></el-input>
          </el-form-item>
          <el-form-item label="邮编" prop="postCode">
            <el-input v-model="ruleForm.postCode" maxlength="6"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="tel">
            <el-input v-model="ruleForm.tel" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="设为默认" prop="isDefault">
            <el-switch v-model="ruleForm.isDefault"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addressShowFlag: false,
      ruleForm: {
        username: "",
        city: "",
        streetName: "",
        postCode: "",
        tel: "",
        isDefault: false
      },
      rules: {
        username: [
          {
            required: true,
            type: "string",
            message: "请输入收货人",
            trigger: "blur"
          }
        ],
        city: [
          {
            required: true,
            type: "string",
            message: "请输入所在城市",
            trigger: "blur"
          }
        ],
        streetName: [
          {
            required: true,
            type: "string",
            message: "请输入所在街道",
            trigger: "blur"
          }
        ],
        postCode: [
          {
            required: true,
            type: "number",
            message: "请输入邮编",
            trigger: "blur"
          }
        ],
        tel: [
          {
            required: true,
            type: "number",
            message: "请输入手机号",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    save() {
      this.$refs["ruleForm"].validate(async valid => {
        if (valid) {
        }
      });
    }
  }
};
</script>
<style lang="stylus">
.address-list
  position relative
  .no-result
    width 100%
    text-align center
    margin-top 200px
    .text
      font-size 30px
  .bounce-address
    border 4px solid rgba(0, 0, 0, 0.3)
    position absolute
    background-color #fff
    width 800px
    left 0
    top 0
    height 500px
    .top
      position relative
      height 30px
      line-height 30px
      background-color #F3F3F3
      border-bottom 2px solid #cccccc
      padding 0 10px
      .title
        font-weight 700
      .el-icon-close
        position absolute
        right 10px
        top 5px
        font-size 20px
  .add-btn
    background-color #fff
    padding 5px 10px
    border 1px solid #cccccc
</style>
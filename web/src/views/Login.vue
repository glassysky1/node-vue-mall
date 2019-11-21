<template>
  <div class="register">
    <m-footer>
      <div class="w">
        <div class="logo">
          <img src="../assets/logo.jpg" height="120px" width="120" alt />
          <span class="text">欢迎登陆</span>
        </div>
        <el-card class="card">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input v-model="ruleForm.pwd" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login">登陆</el-button>
              <div class="error">{{error}}</div>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </m-footer>
  </div>
</template>
<script>
import _ from "lodash";
import MFooter from "../components/Footer";
import { async } from "q";
export default {
  data() {
    return {
      statusMsg: "",
      flag: false,
      usernames: [],
      error: "",
      ruleForm: {
        name: "",
        pwd: "",
        cpwd: ""
      },
      rules: {
        name: [
          {
            required: true,
            type: "string",
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        pwd: [
          {
            required: true,
            message: "创建密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {
    MFooter
  },
  methods: {
    login() {
      //验证整张表是否通过

      this.$refs["ruleForm"].validate(async valid => {
        if (valid) {
          let model = {
            username: this.ruleForm.name,
            password: this.ruleForm.pwd
          };
          await this.$http.post("rest/web_users", model);
          this.$router.push("/");
          this.$message({
            type: "success",
            message: "注册成功"
          });
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.register
  .w
    margin-top 30px
    .logo
      .text
        font-size 22px
    .card
      margin 0 auto
      width 500px
</style>



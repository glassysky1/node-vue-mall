<template>
  <div class="register">
    <m-footer>
      <div class="w">
        <div class="logo">
          <img src="../assets/logo.jpg" height="120px" width="120" alt />
          <span class="text">欢迎注册</span>
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
            <el-form-item label="确认密码" prop="cpwd">
              <el-input v-model="ruleForm.cpwd" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="register">注册</el-button>
              <div class="error">{{error}}</div>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </m-footer>
  </div>
</template>
<script>
import MFooter from "../components/Footer";
export default {
  data() {
    return {
      statusMsg: "",
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
        ],
        cpwd: [
          {
            required: true,
            message: "确认密码",
            trigger: "blur"
          },
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请再次输入密码"));
              } else if (value !== this.ruleForm.pwd) {
                callback(new Error("两次输入密码不一致"));
              } else {
                callback();
              }
            },
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
    async register() {
      if(this.ruleForm.pwd != this.ruleForm.cpwd){
         this.$message({
          type: "error",
          message: "两次密码不一致"
        });
        return
      }
      if (!this.ruleForm.name || !this.ruleForm.pwd) {
        this.$message({
          type: "error",
          message: "请完善信息"
        });
        return;
      }
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
    },
    async findUser(){

    }
  },
  created(){

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



<template>
  <div class="register">
    <header-footer
      title="欢迎登陆"
      :shortcutShow="shortcutShow"
      :slideShow="slideShow"
      :navShow="navShow"
    >
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
            <div class="error">{{ error }}</div>
          </el-form-item>
        </el-form>
      </el-card>
    </header-footer>
  </div>
</template>
<script>
import _ from "lodash";
import HeaderFooter from "../components/HeaderFooter";
export default {
  data() {
    return {
      navShow: false,
      slideShow: false,
      shortcutShow: false,
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
          },
          {
            validator: (rule, value, callback) => {
              if (value.length < 6 || value.length > 16) {
                callback(new Error("用户名长度不低于6位且不高于16位"));
              }else{
                callback()
              }
            },
            trigger: "blur"
          }
        ],
        pwd: [
          {
            required: true,
            message: "输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {
    HeaderFooter
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
          const res = await this.$http.post("login", model);
          localStorage.token = res.data.token;
          this.$router.push("/");
          this.$message({
            type: "success",
            message: "登陆成功"
          });
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.register
  .card
    margin 100px auto 200px
    width 500px
</style>

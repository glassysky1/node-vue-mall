<template>
  <div class="register">
    <header-footer
      title="欢迎注册"
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
          <el-form-item label="确认密码" prop="cpwd">
            <el-input v-model="ruleForm.cpwd" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register">注册</el-button>
            <div class="error">{{error}}</div>
          </el-form-item>
        </el-form>
      </el-card>
    </header-footer>
  </div>
</template>
<script>
import _ from "lodash";
import HeaderFooter from "../components/HeaderFooter";
import { async } from "q";
export default {
  data() {
    return {
      navShow: false,
      slideShow: false,
      shortcutShow: true,
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
              if (!this.usernames.length) {
                callback();
                return;
              }
              for (const username of this.usernames) {
                if (this.ruleForm.name === username) {
                  callback(new Error("用户名已存在"));
                } else {
                  callback();
                }
              }
            },
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
    HeaderFooter
  },
  methods: {
    register() {
      //验证整张表是否通过
      this.$refs["ruleForm"].validate(async valid => {
        if (valid) {
          let model = {
            username: this.ruleForm.name,
            password: this.ruleForm.pwd
          };
          await this.$http.post("rest/web_users", model);
          this.$router.push("/login");
          this.$message({
            type: "success",
            message: "注册成功"
          });
        }
      });
    },
    async findUser() {
      const res = await this.$http.get("rest/web_users");

      this.usernames = res.data.map(user => {
        return user.username;
      });
    }
  },
  created() {
    this.findUser();
  }
};
</script>

<style lang="stylus" scoped>
.register
  .card
    margin 100px auto 200px
    width 500px
</style>



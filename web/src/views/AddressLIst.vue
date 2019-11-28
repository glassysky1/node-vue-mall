<template>
  <div class="address-list">
    <div class="add-wrapper">
      <button class="add-btn" @click="addAddress">新增收货地址</button>
    </div>
    <div class="content" v-if="addressList.length">
      <div class="address-item" v-for="(address,index) in addressList" :key="index">
        <div class="top">
          <span class="title font16">{{address.username}}</span>
          <span class="default" v-show="address.isDefault">默认地址</span>
          <span class="el-icon-close" @click="deleteAddress(index)"></span>
        </div>
        <div class="content">
          <table>
            <tr>
              <td>收货人:</td>
              <td>{{address.username}}</td>
            </tr>
            <tr>
              <td>所在城市:</td>
              <td>{{address.city}}</td>
            </tr>
            <tr>
              <td>所在街道:</td>
              <td>{{address.streetName}}</td>
            </tr>
            <tr>
              <td>手机号:</td>
              <td>{{address.tel}}</td>
            </tr>
            <tr>
              <td>邮编 :</td>
              <td>{{address.postCode}}</td>
            </tr>
          </table>
        </div>
        <div class="setting">
          <a class="default" v-show="!address.isDefault" @click="setDefault(index)">设为默认</a>
          <a class="edit" @click="editAddress(address,index)">编辑</a>
        </div>
      </div>
    </div>
    <div class="no-result" v-else>
      <span class="text">暂无地址哎</span>
    </div>
    <div class="bg-layer" v-show="addressShowFlag">
      <div class="bounce-address" v-show="addressShowFlag">
        <div class="top">
          <h3 class="title font16">{{editFlag?'编辑':'新建'}}收货地址</h3>
          <i class="el-icon-close" @click="close"></i>
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
              <el-input v-model="ruleForm.postCode" type="number" maxlength="6"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="tel">
              <el-input v-model="ruleForm.tel" type="number" maxlength="11"></el-input>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      editIndex: "",
      addressList: [],
      editFlag: false,
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
            message: "请输入邮编",
            trigger: "blur"
          }
        ],
        tel: [
          {
            required: true,
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
          //如果是编辑状态
          if (this.editFlag) {
            const {
              username,
              city,
              streetName,
              postCode,
              tel,
              isDefault
            } = this.ruleForm;
            this.addressList[this.editIndex].username = username;
            this.addressList[this.editIndex].city = city;
            this.addressList[this.editIndex].streetName = streetName;
            this.addressList[this.editIndex].postCode = postCode;
            this.addressList[this.editIndex].tel = tel;
            this.addressList[this.editIndex].isDefault = isDefault;
            //如果你保存的时候，设为默认地址了，你得把这个item置顶，且把其他默认地址改成普通地址
            if (this.ruleForm.isDefault === true) {
              this.addressList.forEach((address, index) => {
                if (index != this.editIndex) {
                  address.isDefault = false;
                }
              });
              let defaultAddress = this.addressList.splice(this.editIndex, 1);
              this.addressList.unshift(defaultAddress[0]);
            }
            this.editFlag = false;
          } else {
            if (!this.ruleForm.isDefault) {
              this.addressList.push(this.ruleForm);
            } else {
              this.addressList.forEach((address, index) => {
                address.isDefault = false;
              });
              this.addressList.unshift(this.ruleForm);
            }
          }
          await this.$http.put("addressList", this.addressList);
          this.$message({
            type: "success",
            message: "操作成功"
          });
          this.addressShowFlag = false;
          this.ruleForm = {
            username: "",
            city: "",
            streetName: "",
            postCode: "",
            tel: "",
            isDefault: false
          };
        }
      });
    },
    //设为默认
    async setDefault(defaultIndex) {
      this.addressList.forEach((address, index) => {
        if (defaultIndex != index) {
          address.isDefault = false;
        }
      });
      this.addressList[defaultIndex].isDefault = true;
      let defaultAddress = this.addressList.splice(defaultIndex, 1);
      this.addressList.unshift(defaultAddress[0]);
      await this.$http.put("addressList", this.addressList);
    },
    editAddress(address, editIndex) {
      this.editFlag = true;
      this.editIndex = editIndex;
      const { username, city, streetName, postCode, tel, isDefault } = address;
      this.ruleForm = {
        username,
        city,
        streetName,
        postCode,
        tel,
        isDefault
      };
      this.addressShowFlag = true;
    },
    deleteAddress(index) {
      this.$confirm("确定删除此地址吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        this.addressList.splice(index, 1);
        await this.$http.put("addressList", this.addressList);
      });
    },
    addAddress() {
      this.addressShowFlag = true;
    },
    close() {
      this.addressShowFlag = false;
      this.editFlag = false;
      this.ruleForm = {
        username: "",
        city: "",
        streetName: "",
        postCode: "",
        tel: "",
        isDefault: false
      };
    },
    async _fetchUser() {
      const res = await this.$http.get("user");
      this.addressList = res.data.addressList;
    }
  },
  created() {
    this._fetchUser();
  }
};
</script>
<style lang="stylus">
.address-list
  position relative
  .content
    .address-item
      padding 5px
      border 2px solid #E6E6E6
      margin-top 10px
      position relative
      .top
        position relative
        .title
          font-weight bold
        .default
          margin-left 10px
          font-size 14px
          background-color #FFAA45
          color #fff
          padding 0 5px
        .el-icon-close
          position absolute
          right 0
          top 0
          font-size 20px
      .content
        table
          tr, td
            font-size 12px
            border none
          td
            &:first-child
              text-align right
              width 80px
              color #999
            &:last-child
              text-align left
              padding-left 10px
      .setting
        position absolute
        right 10px
        bottom 5px
        a
          color #005EA7
          &:hover
            color #ec393c
          &.edit
            margin-left 10px
  .no-result
    width 100%
    text-align center
    margin-top 200px
    .text
      font-size 30px
  .bg-layer
    position absolute
    height 100%
    width 100%
    top 0
    .bounce-address
      border 4px solid rgba(0, 0, 0, 0.3)
      position absolute
      background-color #fff
      top 50px
      left 50%
      transform translate3d(-50%,0,0)
      width 800px
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
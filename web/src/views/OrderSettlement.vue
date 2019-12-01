<template>
  <div class="order-settlement">
    <header-footer title="订单结算" :slideShow="slideShow" :navShow="navShow">
      <div class="w">
        <div class="select-address">
          <h2 class="title">收件人信息</h2>
          <a class="add-address" @click="addAddress">新增收货地址</a>
          <div ref="addressList" class="address-list">
            <div class="address-item" v-for="(address,index) in addressList" :key="index">
              <span
                @click="firstselect(index)"
                class="username"
                :class="{'active':index ===0}"
              >{{address.username}}</span>
              <span
                class="desc"
              >{{address.username}} {{address.city}} {{address.streetName}} {{address.tel}} {{address.postCode}}</span>
              <span class="default" v-show="address.isDefault">默认地址</span>
              <span class="right">
                <span
                  class="setDefault"
                  @click="setDefault(index)"
                  v-show="!address.isDefault"
                >设为默认地址</span>
                <span class="edit" @click="editAddress(address,index)">编辑</span>
                <span class="delete" @click="deleteAddress(index)">删除</span>
              </span>
            </div>
          </div>
          <div v-show="!moreFlag" style="padding-left:35px" class="more-address">
            <a @click="more">更多地址</a>
            <i class="el-icon-arrow-down"></i>
          </div>
          <div v-show="moreFlag" style="padding-left:35px" class="fold-address">
            <a @click="fold">收起地址</a>
            <i class="el-icon-arrow-up"></i>
          </div>
        </div>
        <div class="payment-method">
          <h1 class="title">支付方式</h1>
          <div class="payment-list">
            <span
              class="payment-item"
              @click="paymentMethod =0"
              :class="{'active':paymentMethod===0}"
            >在线支付</span>
            <span
              class="payment-item"
              @click="paymentMethod =1"
              :class="{'active':paymentMethod===1}"
            >货到付款</span>
          </div>
        </div>
        <div class="order">
          <h2 class="title">送货清单</h2>
          <table>
            <thead>
              <tr>
                <td>商品</td>
                <td>单价</td>
                <td>数量</td>
                <td>小计</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cart,index) in selectCartList" :key="index">
                <td class="al">
                  <div class="image">
                    <a>
                      <img :src="cart.productCoverImage" height="80" alt />
                    </a>
                  </div>
                  <div class="center">
                    <h2 class="desc-title" style="height:40px">
                      <a>{{cart.productName}} {{cart.productSubtitle}}</a>
                    </h2>
                  </div>
                  <div class="right">
                    <div class="storage">{{cart.storageName}}</div>
                    <div class="color">{{cart.colorName}}</div>
                  </div>
                </td>
                <td>
                  <span class="price">￥{{cart.productPrice}}</span>
                </td>
                <td>
                  <span class="count">{{cart.productNum}}</span>
                </td>
                <td>
                  <span class="total-price">￥{{cart.productPrice * cart.productNum}}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="settle clearfix">
          <div class="settle-right fr">
            <div class="top">
              <span class="selected-num">
                一共
                <i>{{selectCount}}</i>件商品
              </span>
              <span class="total-price">
                总价:
                <span class="text">￥{{selectTotalProductPrice}}</span>
              </span>
            </div>
            <div class="address fr" v-if="addressList.length">
              寄送至:
              <span class="desc">{{addressList[0].city}} {{addressList[0].streetName}}</span> 收货人:
              <span class="username">{{addressList[0].username}} {{addressList[0].tel}}</span>
            </div>
            <div class="submit">
              <button class="btn fr" @click="submitOrder">{{paymentMethod===0?'提交订单':'货到付款'}}</button>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-layer" v-show="addressShowFlag">
        <div class="bounce-address" v-show="addressShowFlag">
          <div class="top">
            <!-- <h3 class="title font16">{{editFlag?'编辑':'新建'}}收货地址</h3> -->
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
    </header-footer>
  </div>
</template>

<script>
import HeaderFooter from "../components/HeaderFooter";
export default {
  data() {
    return {
      editIndex: "",
      editFlag: false,
      selectIndex: 0,
      slideShow: false,
      navShow: false,
      selectCount: "",
      selectTotalProductPrice: "",
      selectCartList: [],
      paymentMethod: 0,
      addressList: [],
      moreFlag: false,
      showRight: false,
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
  components: {
    HeaderFooter
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
    //首选
    async firstselect(selectIndex) {
      this.selectIndex = selectIndex;
      let firstAddress = this.addressList.splice(selectIndex, 1);
      this.addressList.unshift(firstAddress[0]);
      await this.$http.put("addressList", this.addressList);
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
    more() {
      this.moreFlag = true;
      this._fetchUser();
      this.$refs.addressList.style.height = "120px";
    },
    fold() {
      this.moreFlag = false;
      this._fetchUser();
    },
    async submitOrder() {
      if(!this.addressList.length){
          this.$message({
        type: "waring",
        message: "请添加地址"
      });
        return
      }
      this.orderList.unshift({
        address: this.addressList[0],
        cartList: this.selectCartList,
        status: 0,
        totalPrice: this.selectTotalProductPrice,
        totalNumber: this.selectCount,
        paymentMethod: this.paymentMethod,
        createTime:Date.now()
      });
      await this.$http.put("orderList", this.orderList);
      this.$message({
        type: "success",
        message: "购买成功"
      });
      //把用户购物车里面已勾选的全删除
      let unSelectCartList = [];
      this.cartList.forEach((cart, index) => {
        if (!cart.checked) {
          unSelectCartList.push(cart);
        }
      });
      this.$http.put("cartList", unSelectCartList);
      //把默认地址放在首位
      let defaultIndex = 0;
      this.addressList.forEach((address, index) => {
        if (address.isDefault) {
          defaultIndex = index;
        }
      });
      let defaultAddress = this.addressList.splice(defaultIndex, 1);
      this.addressList.unshift(defaultAddress[0]);
      await this.$http.put("addressList", this.addressList);
      this.$router.push('/')
    },
    async _fetchUser() {
      const res = await this.$http.get("user");
      this.addressList = res.data.addressList;
      this.orderList = res.data.orderList;
      if (!this.moreFlag) {
        this.$refs.addressList.style.height = "40px";
        this.addressList = this.addressList.slice(0, 1);
      }
    },
    async _fechCartList() {
      const res = await this.$http.get("user");
      this.cartList = res.data.cartList;
      let count = 0;
      this.selectCount = 0;
      this.selectTotalProductPrice = 0;
      this.cartList.forEach((cart, index) => {
        if (cart.checked) {
          this.selectCartList.push(cart);
          this.selectCount += cart.productNum;
          this.selectTotalProductPrice += cart.productNum * cart.productPrice;
        }
      });
    }
  },
  created() {
    this._fetchUser();
    this._fechCartList();
  }
};
</script>

<style lang="stylus" scoped>
.order-settlement
  table
    font-size 12px
    margin-top 15px
    thead
      line-height 50px
      background-color #F3F3F3
      border 1px solid #cccccc
    tbody
      background-color #FFF4E8
      tr
        border-top 2px solid #cccccc
    tr, td
      border none
    td
      &:nth-child(1)
        width 450px
    .image, .center, .right
      display inline-block
      margin-left 15px
      vertical-align top
      text-overflow ellipsis
      overflow hidden
    .center
      margin-top 20px
      width 180px
    .right
      margin-top 20px
  .payment-method, .order
    margin-top 50px
    border 1px solid #eeeeee
    position relative
    padding-bottom 20px
    .title
      font-size 14px
      font-weight bold
      padding-left 20px
      color #000
    .payment-list
      margin-top 10px
      .payment-item
        cursor pointer
        padding 0 10px
        margin-left 35px
        display inline-block
        line-height 20px
        border 2px solid #fff
        &:hover
          border 2px solid #ec393c
        &.active
          border 2px solid #ec393c
  .bg-layer
    height 100%
    width 100%
    background-color rgba(0, 0, 0, 0.5)
    position absolute
    top 0
    .bounce-address
      border 4px solid rgba(0, 0, 0, 0.3)
      position absolute
      background-color #fff
      position absolute
      left 50%
      top 200px
      width 800px
      transform translate3d(-50%, 0, 0)
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
  .select-address
    border 1px solid #eeeeee
    position relative
    padding-bottom 20px
    .title
      font-size 14px
      font-weight bold
      padding-left 20px
      color #000
    .add-address
      position absolute
      right 5px
      top 5px
      color #3B6DB0
    .address-list
      height 100px
      overflow auto
      .address-item
        padding 0 35px
        margin-top 10px
        line-height 20px
        position relative
        .right
          display none
        &:hover
          .right
            display block
            position absolute
            right 100px
            top 0
            line-height 20px
            color #3B6DB0
            cursor pointer
            .edit
              margin 0 10px
        .username
          width 80px
          text-align center
          display inline-block
          vertical-align top
          text-overflow ellipsis
          overflow hidden
          white-space nowrap
          cursor pointer
          padding-top 2px
          border 2px solid #ffffff
          &:hover
            border 2px solid #ec393c
          &.active
            border 2px solid #ec393c
        .desc
          display inline-block
          width 640px
          padding 0 10px
          text-overflow ellipsis
          padding-top 2px
          overflow hidden
          vertical-align top
          white-space nowrap
          line-height 20px
        .default
          padding-top 2px
          vertical-align top
          display inline-block
          background-color #999999
          color #fff
          width 80px
          line-height 20px
          text-align center
  .settle
    margin-top 20px
    .settle-right
      .address
        margin-right 15px
        margin-bottom 20px
      .top
        text-align right
        .selected-num
          margin-right 5px
          i
            font-weight bold
            color #E4231A
            padding 0 2px
        .total-price
          margin-right 10px
          .text
            font-size 16px
            font-weight bold
            color #E4231A
      .submit
        .btn
          height 50px
          padding 0 50px
          background-color #E4231A
          color #fff
          font-size 18px
          font-weight bold
    .more-address, .fold-address
      padding-left 50px
      margin-top 10px
</style>
<template>
  <div>
    <h1>订单列表</h1>
    <el-table height="780px" :data="items">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form
            label-position="left"
            style="margin-bottom:1rem"
            v-for="(cart,index) in props.row.cartList"
            :key="index"
            inline
            class="demo-table-expand"
          >
            <el-form-item label="商品ID">
              <span>{{ cart._id }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ cart.productName }}</span>
            </el-form-item>
            <el-form-item label="机身存储">
              <span>{{ cart.storageName}}</span>
            </el-form-item>
            <el-form-item label="机身颜色">
              <span>{{ cart.colorName }}</span>
            </el-form-item>
            <el-form-item label="数量">
              <span>{{ cart.productNum }}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>￥ {{cart.productPrice }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="_id" label="订单编号" width="230"></el-table-column>
      <el-table-column label="支付方式">
        <template v-slot="scope">{{scope.row.paymentMethod===0?'在线支付':'货到付款'}}</template>
      </el-table-column>
      <el-table-column prop="totalNumber" label="数量"></el-table-column>
      <el-table-column prop="totalPrice" label="总价"></el-table-column>
      <el-table-column
        label="状态 "
        :filters="[{ text: '待发货', value:0  }, { text: '已发货', value: 1 }, { text: '已收货', value:2 }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template v-slot="scope">
          <el-button
            @click="delivery(scope.row._id)"
            v-show="scope.row.status===0"
            type="primary"
            size="small"
          >发货</el-button>
          <span v-show="scope.row.status===1">已发货</span>
          <span v-show="scope.row.status===2">已收货</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    filterTag(value, row) {
      // console.log(row.status,value);
      return row.status === value
    },
    async delivery(id) {
      console.log(id);
      await this.$http.put(`orderList/${id}`);
      this._fetch();
    },
    async _fetch() {
      const res = await this.$http.get("orderList");
      this.items = res.data;
    }
  },
  created() {
    this._fetch();
  }
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
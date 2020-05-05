<template>
  <el-container style="height: 100vh;">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <!-- :default-openeds="['1']" -->
      <el-menu router  unique-opened :default-active="$route.path">
        <el-submenu index="1" >
          <template slot="title">
            <i class="el-icon-message"></i>商品管理
          </template>
          <el-menu-item-group>
            <template slot="title">品牌管理</template>
            <el-menu-item index="/brands/create">新建品牌</el-menu-item>
            <el-menu-item index="/brands/list">品牌列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">商品</template>
            <el-menu-item index="/products/create">新建商品</el-menu-item>
            <el-menu-item index="/products/list">商品列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">销量与库存</template>
            <el-menu-item index="/sales_volumes/list">销量</el-menu-item>
            <el-menu-item index="/stocks/list">库存</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2" >
          <template slot="title">
            <i class="el-icon-message"></i>运营管理
          </template>
          <el-menu-item-group>
            <template slot="title">广告位管理</template>
            <el-menu-item index="/ads/create">新建广告位</el-menu-item>
            <el-menu-item index="/ads/list">广告位列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3" >
          <template slot="title">
            <i class="el-icon-message"></i>用户管理
          </template>
          <el-menu-item-group>
            <template slot="title">用户管理</template>
            <el-menu-item index="/web_users/list">用户列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4" >
          <template slot="title">
            <i class="el-icon-message"></i>订单管理
          </template>
          <el-menu-item-group>
            <template slot="title">订单管理</template>
            <el-menu-item index="/orders/list">订单列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5" >
          <template slot="title">
            <i class="el-icon-message"></i>系统设置
          </template>
          <el-menu-item-group>
            <template slot="title">管理员</template>
            <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
            <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{user.username}}</span>
      </el-header>

      <el-main>
        <router-view :key="$route.path"></router-view>
        <!-- <el-table :data="tableData">
          <el-table-column prop="date" label="日期" width="140"></el-table-column>
          <el-table-column prop="name" label="姓名" width="120"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  data(){
    return{
      user:{}
    }
  },
  methods:{
    logout(){
       this.$confirm("确定退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        localStorage.token = "";
        this.$message({
          type: "sucess",
          message: "退出成功"
        });   
        this.$router.push('/login')
      });
    },
    async _fetchUser(){
      const res = await this.$http.get('user')
      console.log(res.data)
      this.user = res.data
    }
  },
  created(){
    this._fetchUser()
  }
};
</script>
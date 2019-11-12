<template>
  <div>
    <h1>{{id?"编辑":"新建"}}品牌</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
       <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data(){
    return{
      model:{}
    }
  },
  props:{
    id:{
      type:String
    }
  }
  ,
  methods:{
    async save(){
      let res
      if(this.id){
        res = await this.$http.put(`rest/brands/${this.id}`,this.model)
      } else{

         res = await this.$http.post('rest/brands',this.model)
      }
      this.$router.push('/brands/list')
      this.$message({
        type:'success',
        message:'保存成功'
      })
    },
    async _fetch(){
      const res = await this.$http.get(`rest/brands/${this.id}`)
      this.model = res.data
    }
  },
  created(){
    this.id && this._fetch()
  }
}
</script>

<style>

</style>
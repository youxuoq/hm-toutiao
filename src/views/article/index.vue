/* eslint-disable no-unused-expressions */
<template>
  <!-- 内容管理 -->
  <div class="container-article">
    <el-card>
      <!-- 头部 面包屑导航 -->
       <div slot="header" class="clearfix">
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 筛选表单 -->
      <el-form v-model="formData" label-width="50px" size="small">
        <el-form-item label="状态:">
          <el-radio-group v-model="formData.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道:">
          <el-select v-model="formData.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间:">
          <el-date-picker
            v-model="setTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label>
          <el-button type="primary" @click.native="getArticles">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>卡片2</el-card>
  </div>
</template>

<script>

export default {
  data () {
    return {
      // 表单数据
      formData: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null

      },
      // 筛选时间
      setTime: [],
      // 频道数据
      channelData: [
        { id: 1, name: 'Java' }
      ]
    }
  },
  methods: {
    // 获取文章数据
    getArticles () {
      this.formData.begin_pubdate = this.setTime[0]
      this.formData.end_pubdate = this.setTime[1]
      console.log(this.formData)
    }

  }
}
</script>

<style lang="less" scoped>
.container-article {
  .el-card {
    margin-bottom: 20px;
  }
}
</style>

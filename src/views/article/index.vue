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
          <my-channel v-model="formData.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="时间:">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="setTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label>
          <el-button type="primary" @click.native="filterArticle">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">
        根据筛选条件功能查询到
        <b>{{totals}}</b> 条数据：
      </div>
      <!-- 筛选结果 -->
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width: 100px; height: 75px" lazy>
              <div slot="error" class="image-slot">
                <img width="100" height="75" src="../../assets/images/error.gif" alt />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-show="scope.row.status === 2">审核通过</el-tag>
            <el-tag v-show="scope.row.status === 1" type="success">待审核</el-tag>
            <el-tag v-show="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-show="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-show="scope.row.status === 4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              plain
              circle
              @click.native="editAticle(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              plain
              circle
              @click.native="deleteArticle(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="paging">
        <el-pagination background layout="prev, pager, next" :current-page="formData.page" :total="totals" :page-size="formData.per_page" @current-change="switchPage"></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 表单数据
      formData: {
        // 当前页数
        page: 1,
        // 每页显示数量
        per_page: 10,
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 筛选时间
      setTime: [],
      // 文章数据
      articles: [],
      // 文章的总条数
      totals: null

    }
  },
  created () {
    // 获取列表数据
    this.getArticle()
  },
  methods: {
    // 获取文章列表数据
    async getArticle () {
      const {
        data: { data }
      } = await this.axios.get('articles', { params: this.formData })
      this.articles = data.results
      this.totals = data.total_count
    },
    // 筛选文章
    filterArticle () {
      this.formData.begin_pubdate = this.setTime[0]
      this.formData.end_pubdate = this.setTime[1]
      // 将当前页码为1
      this.formData.page = 1
      this.getArticle()
    },
    // 分页页码切换
    switchPage (page) {
      // 参数page是 分页器中当前选中页码
      this.formData.page = page
      this.getArticle()
    },
    // 删除文章
    deleteArticle (articleId) {
      this.$confirm('你要删除该条文章吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(async () => {
        await this.axios.delete(`articles/${articleId}`)
        this.getArticle()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
      })
    },
    // 修改文章
    editAticle (articleId) {
      this.$router.push({ path: '/publish?articleId=' + articleId })
    }
  }
}
</script>

<style lang="less" scoped>
.container-article {
  .el-card {
    margin-bottom: 20px;
    .paging {
      margin-top: 20px;
      text-align: center;
    }
  }
}
</style>

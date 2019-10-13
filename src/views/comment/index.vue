<template>
  <!-- 评论管理 -->
  <div class="container-comment">
    <el-card>
        <!-- 头部 -->
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <!-- 表格数据 -->
      <el-table :data="resData.results" style="width: 100%; text-align: center">
        <el-table-column prop="title" label="标题" width="400"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="状态">
            <template slot-scope="scope">
                {{scope.row.comment_status ? '正常' : '关闭'}}
            </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
            <template slot-scope="scope">
                <el-button v-if="scope.row.comment_status" type="danger" size="mini" @click="changeStatus(scope.row)">关闭评论</el-button>
                <el-button v-else type="success" size="mini" @click="changeStatus(scope.row)">打开评论</el-button>
            </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div style="text-align: center; margin-top: 20px">
          <el-pagination background layout="prev, pager, next" :page-size="resData.per_page" :total="resData.total_count" :current-page="resData.page" @current-change="pageChabge"></el-pagination>
      </div>

    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 请求参数
      reqData: {
        page: 1,
        per_page: 20,
        response_type: 'comment'
      },
      // 响应数据
      resData: {}
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    // 获取评论数据
    async getComments () {
      const { data } = await this.axios.get('articles', { params: this.reqData })
      this.resData = data.data
    },
    // 切换分页
    pageChabge (page) {
      this.reqData.page = page
      this.getComments()
    },
    // 修改文章的状态
    async changeStatus (row) {
      if (row.comment_status) {
        this.$confirm('是否要关闭评论', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const { data } = await this.axios.put(`comments/status?article_id=${row.id}`, { allow_comment: !row.comment_status })
          row.comment_status = data.data.allow_comment
          this.$message({
            type: 'success',
            message: '评论已关闭!'
          })
        }).catch(() => {})
      } else {
        const { data } = await this.axios.put(`comments/status?article_id=${row.id}`, { allow_comment: !row.comment_status })
        row.comment_status = data.data.allow_comment
        this.$message({
          type: 'success',
          message: '评论已打开!'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>

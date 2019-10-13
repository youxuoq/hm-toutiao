<template>
  <!-- 素材管理 -->
  <div class="container-material">
    <el-card v-loading="isLoading">
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <el-radio-group size="small" v-model="reqData.collect">
        <el-radio-button :label="false" @click.native="getAllMaterial">全部</el-radio-button>
        <el-radio-button :label="true" @click.native="getCollected">收藏</el-radio-button>
      </el-radio-group>
      <el-button type="success" size="small" style="float: right" @click="controlBounced">上传素材</el-button>
      <!-- 全部素材 -->
      <ul class="material-main" v-if="!reqData.collect">
        <li v-for="item in this.reslist" :key="item.id">
          <img :src="item.url" alt />
          <div>
            <span class="el-icon-star-off" :class="{spanhover: item.is_collected}" @click="toCollect(item)"></span>
            <span
              class="el-icon-delete"
              :class="{spanhover: item.id === selectSpan}"
              @mouseenter="enterSpan(item.id)"
              @mouseleave="leaveSpan"
              @click="toDelete(item.id)"
            ></span>
          </div>
        </li>
      </ul>
      <!-- 收藏素材 -->
      <ul class="material-main" v-else>
        <li v-for="item in this.reslist" :key="item.id">
          <img :src="item.url" alt />
        </li>
      </ul>
      <div class="material-paging">
        <el-pagination background layout="prev, pager, next" :total="resData.total_count" :page-size="resData.per_page" :current-page="resData.page" @current-change="switchPage"></el-pagination>
      </div>

      <!-- 弹框 -->
      <el-dialog title="上传素材" :visible.sync="isBounced" >
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :on-success="upSuccess"
            name="image"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 控制弹框的数据
      isBounced: false,
      // 请求数据
      reqData: {
        collect: false,
        page: 1,
        per_page: 10
      },
      // 响应数据
      resData: {},
      // 列表数据
      reslist: [],
      // 上传的图片的地址
      imageUrl: null,
      // 上传图片的头部信息
      headers: {
        Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('TOKEN')).token
      },
      // 加载状态
      isLoading: false,
      // span的样式的显示
      selectSpan: null

    }
  },
  created () {
    this.getMaterial()
  },
  methods: {
    // 控制弹框的显示
    controlBounced () {
      this.isBounced = !this.isBounced
      this.imageUrl = null
    },
    // 获取素材列表数据
    async getMaterial () {
      this.isLoading = true
      const { data: { data } } = await this.axios.get('user/images', { params: this.reqData })
      this.resData = data
      this.reslist = data.results
      this.isLoading = false
    },
    // 获取全部的素材数据列表
    getAllMaterial () {
      this.reqData.collect = false
      this.getMaterial()
    },
    // 获取收藏素材列表数据
    getCollected () {
      this.reqData.collect = true
      this.getMaterial()
    },
    // 图片上传成功后的钩子函数
    upSuccess (response) {
      this.imageUrl = response.data.url
      this.getMaterial()
      this.$message({
        message: '上传成功',
        type: 'success'
      })
    },
    // 收藏素材
    async toCollect (item) {
      await this.axios.put(`user/images/${item.id}`, { collect: !item.is_collected })
      this.getMaterial()
      this.$message({
        message: '操作成功',
        type: 'success'
      })
    },
    // 删除素材
    async toDelete (id) {
      this.$confirm('确定要删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.axios.delete('user/images/' + id)
        this.getMaterial()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => { })
    },
    // 分页切换
    switchPage (page) {
      this.reqData.page = page
      this.getMaterial()
    },
    // 删除图片的样式
    enterSpan (id) {
      this.selectSpan = id
    },
    leaveSpan () {
      this.selectSpan = null
    }
  }
}
</script>

<style lang="less" scoped>
.container-material {
  .material-main {
    width: 100%;
    height: auto;
    overflow: hidden;
    li {
      box-sizing: border-box;
      list-style: none;
      width: 300px;
      height: 280px;
      margin-top: 20px;
      margin-right: 20px;
      border: 1px dashed #eee;
      position: relative;
      float: left;
      img {
        width: 100%;
        height: 100%;
      }
      div {
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.1);
        span {
          font-size: 18px;
          color: #fff;
        }
        span:nth-child(1) {
          margin-right: 10px;
        }
        span:nth-child(2) {
          margin-left: 10px;
        }
        .spanhover {
          color: red;
        }
      }
    }
  }
  .material-paging {
    margin-top: 20px;
    text-align: center;
  }
  .el-dialog {
      overflow: hidden;
  }

}
</style>

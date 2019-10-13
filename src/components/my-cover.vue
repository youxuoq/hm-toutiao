<template>
  <div class="container-cover">
    <!-- 封面按钮 -->
    <div class="cover-image" @click="openDialog">
      <img :src=" value ? value : defaultImage" alt />
    </div>
    <!-- 封面弹框 -->
    <el-dialog :visible.sync="isShowDialog" width="50%">
      <!-- tag栏 -->
      <div class="dialog-tag">
        <el-tabs v-model="tagName" type="card" v-loading="isLoading">
          <!-- 素材库 -->
          <el-tab-pane label="素材库" name="material">
            <!-- 素材区 -->
            <div>
              <el-radio-group size="small" v-model="reqData.collect">
                <el-radio-button :label="false" @click.native="getAllMaterial">全部</el-radio-button>
                <el-radio-button :label="true" @click.native="getCollted">收藏</el-radio-button>
              </el-radio-group>
              <!-- 全部素材 -->
              <ul class="cover-main" v-if="!reqData.collect">
                <li
                  v-for="item in resData.results"
                  :key="item.id"
                  class="cover-image"
                  style="margin-left: 20px"
                  @click.prevent="getSelectUrl(item.url)"
                >
                  <img :src="item.url" alt />
                  <i :class="{mySelected: item.url === selectUrl}">
                    <span @click.stop="noSeleted">
                      <i></i>
                      <i></i>
                    </span>
                  </i>
                </li>
              </ul>
              <!-- 收藏素材 -->
              <ul class="cover-main" v-else>
                <li
                  v-for="item in resData.results"
                  @click.prevent="getSelectUrl(item.url)"
                  :key="item.id"
                  class="cover-image"
                  style="margin-left: 20px"
                >
                  <img :src="item.url" alt />
                  <i :class="{mySelected: item.url === selectUrl}">
                    <span @click.stop="noSeleted">
                      <i></i>
                      <i></i>
                    </span>
                  </i>
                </li>
              </ul>
            </div>
            <!-- 分页器 -->
            <div class="cover-paging">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="resData.total_count"
                :page-size="resData.per_page"
                :current-page="resData.page"
                @current-change="switchPage"
              ></el-pagination>
            </div>
          </el-tab-pane>
          <!-- 上传图片 -->
          <el-tab-pane label="上传图片" name="puload">
            <el-upload
              class="cover-image upload-image"
              :show-file-list="false"
              action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
              name="image"
              :headers="headers"
              :on-success="uploadSuccess"
            >
              <img v-if="upImageUrl" :src="upImageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- 底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import defaultImage from '../assets/images/default.png'
export default {
  name: 'my-cover',
  props: ['value'],
  data () {
    return {
      // 控制弹框的显示
      isShowDialog: false,
      // 当前选中的tag的name值
      tagName: 'material',
      // 请求数据
      reqData: {
        collect: false,
        per_page: 10,
        page: 1
      },
      // 响应数据
      resData: {},
      // 上传的图片
      upImageUrl: null,
      // 加载状态
      isLoading: false,
      // 选中的图片的地址
      selectUrl: null,
      defaultImage: defaultImage,
      // 上传图片请求头
      headers: {
        Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('TOKEN')).token
      },
      // props中的数据
      coverValue: null
    }
  },
  methods: {
    // 打开弹框 获取素材数据
    openDialog () {
      this.reqData.collect = false
      this.isShowDialog = true
      this.selectUrl = null
      this.upImageUrl = null
      this.tagName = 'material'
      this.getMaterial()
    },
    // 获取素材
    async getMaterial () {
      this.isLoading = true
      console.log(this.reqData.collect)
      const { data } = await this.axios.get('user/images', {
        params: this.reqData
      })
      this.resData = data.data
      this.isLoading = false
    },
    // 获取全部素材
    getAllMaterial () {
      this.reqData.collect = false
      this.getMaterial()
    },
    // 获取收藏素材
    getCollted () {
      this.reqData.collect = true
      this.getMaterial()
    },
    // 分页切换
    switchPage (page) {
      this.reqData.page = page
      this.getMaterial()
    },
    // 选中的图片的id
    getSelectUrl (url) {
      this.upImageUrl = null
      this.selectUrl = url
    },
    // 取消选中图片
    noSeleted () {
      this.selectUrl = null
    },
    // 图片上传成功后
    uploadSuccess (res) {
      console.log(res)
      this.upImageUrl = res.data.url
      this.selectUrl = null
      this.$message({
        message: '图片上传成功',
        type: 'success'
      })
    },
    // 确定选好的图片
    confirmImage () {
      this.isShowDialog = false
      this.coverValue = this.upImageUrl || this.selectUrl
      this.$emit('input', this.coverValue)
    }
  }
}
</script>

<style lang="less" scoped>
.container-cover {
    display: inline-block;
    width: 150px;
    height: 150px;
    margin-right: 20px;
  .cover-image {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: 1px dashed #ccc;
    overflow: hidden;
    margin-top: 10px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .upload-image {
    i {
      font-size: 40px;
      line-height: 150px;
      width: 150px;
      height: 150px;
      text-align: center;
      color: #eee;
    }
  }
  .mySelected {
    display: inline-block;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1) url(../assets/images/selected.png) no-repeat
      center / 60px 60px;
    position: absolute;
    top: 0px;
    left: 0px;
    span {
      display: inline-block;
      width: 20px;
      height: 20px;
      position: absolute;
      top: 0px;
      right: 0px;
      transform: rotateZ(30deg);
      i {
        display: inline-block;
      }
      i:nth-child(1) {
        width: 100%;
        height: 2px;
        position: absolute;
        top: 45%;
        right: 0px;
        vertical-align: center;
        background-color: #666;
      }
      i:nth-child(2) {
        width: 2px;
        height: 100%;
        position: absolute;
        top: 0px;
        right: 45%;
        vertical-align: center;
        background-color: #666;
      }
    }
  }
}
</style>

<template>
  <!-- 个人设置 -->
  <div class="container-setting">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form v-model="userData" label-width="100px">
            <el-form-item label="用户ID: ">{{userData.id}}</el-form-item>
            <el-form-item label="手机号: ">{{userData.mobile}}</el-form-item>
            <el-form-item label="邮箱: ">
              <el-input v-model="userData.email"></el-input>
            </el-form-item>
            <el-form-item label="用户名称: ">
              <el-input v-model="userData.name" placeholder="请输入汉字"></el-input>
            </el-form-item>
            <el-form-item label="用户介绍: ">
              <el-input type="textarea" :rows="4" v-model="userData.intro"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                style=" transform: translate(0px, 15px)"
                @click="changeUser"
              >保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12" style="margin-top: 15px">
          <el-upload
            class="avatar-uploader"
            action="fakezction"
            :http-request="setuserphoto"
            :show-file-list="false"
          >
            <img v-if="userData.photo" :src="userData.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div style="margin-top: 20px; text-align: center">
            <el-button disabled>上传图片</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import eventBus from '@/eventBus/index'
export default {
  data () {
    return {
      // 请求数据
      userData: {
        id: null,
        name: null,
        intro: null,
        photo: null,
        email: null,
        mobile: null
      }
    }
  },
  created () {
    this.getUserMessage()
  },
  methods: {
    // 获取用户信息
    async getUserMessage () {
      const { data } = await this.axios.get('user/profile')
      this.userData = data.data
    },
    // 修改用户信息
    async changeUser () {
      const {
        data: { data }
      } = await this.axios.patch('user/profile', {
        name: this.userData.name,
        intro: this.userData.intro,
        email: this.userData.email
      })
      this.$message({
        message: '修改成功',
        type: 'success'
      })
      // 传递name数据到 home页面
      eventBus.$emit('getName', data.name)
      // 更新本地保存的name信息
      const localUser = JSON.parse(window.sessionStorage.getItem('TOKEN'))
      localUser.name = data.name
      window.sessionStorage.setItem('TOKEN', JSON.stringify(localUser))
    },
    // 修改用户头像
    async setuserphoto (userFile) {
      const formData = new FormData()
      formData.append('photo', userFile.file)
      const { data: { data } } = await this.axios.patch('user/photo', formData)
      this.userData.photo = data.photo
      this.$message({
        message: '头像上传成功',
        type: 'success'
      })
      // 传递name数据到 home页面
      eventBus.$emit('getPhoto', data.photo)
      // 更新本地保存的name信息
      const localUser = JSON.parse(window.sessionStorage.getItem('TOKEN'))
      localUser.photo = data.photo
      window.sessionStorage.setItem('TOKEN', JSON.stringify(localUser))
    }
  }
}
</script>

<style lang="less" scoped>
</style>

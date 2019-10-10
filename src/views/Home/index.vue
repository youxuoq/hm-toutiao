<template>
  <el-container class="container-home">
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse == false ? '200px' : '64px'" class="aside">
        <div :class="{'logo': !isCollapse, 'cutLogo': isCollapse}"></div>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#001E32"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
      >

        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/material">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-line-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-star-off"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <!-- 右边 -->
    <el-container>
      <!-- 头部 -->
      <el-header class="header">
        <span class="my-icon" :class="{'el-icon-s-fold': !isCollapse, 'el-icon-s-unfold': isCollapse}" @click="cutAside"></span>
        <span style="vertical-align: middle;">江苏传智播客教育有限公司</span>
        <div style="float: right">
          <img width="35" height="35" :src="userData.photo" alt />
          <el-dropdown>
            <span class="el-dropdown-link">
              <b>{{userData.name}}</b>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-setting" @click.native="setting">个人设置</el-dropdown-item>
              <el-dropdown-item icon="el-icon-unlock" @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 内容区域 -->
      <el-main>
        <!-- 二级路由渲染的位置 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false,
      userData: {
        name: '',
        photo: ''
      }
    }
  },
  created () {
    const user = JSON.parse(window.sessionStorage.getItem('TOKEN'))
    this.userData.name = user.name
    this.userData.photo = user.photo
    console.log(user)
  },
  methods: {
    // 切换侧边栏
    cutAside () {
      this.isCollapse = !this.isCollapse
      console.log(this.isCollapse)
    },
    // 前往个人设置
    setting () {
      this.$router.push('/setting')
    },
    // 退出登录
    logout () {
      window.sessionStorage.removeItem('TOKEN')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.container-home {
  width: 100%;
  height: 100%;
  .aside {
      height: 100%;
      display: flex;
      flex-direction: column;
      .logo {
          height: 60px;
          width: 200px;
          position: fixed;
          background: #00263E url(../../assets/images/logo_admin.png) no-repeat center / 140px auto
      }
      .cutLogo {
          box-sizing: border-box;
          height: 60px;
          width: 64px;
          position: fixed;
          background: #00263E url(../../assets/images/logo_admin.png) no-repeat -17% 48% / auto 38px;
      }
      .el-menu-vertical-demo[data-v-1d9b105c] {
          margin-top: 60px;
          flex: 1;
          border-right: none;
          i {
              font-size: 20px;
          }
      }
  }
  .header {
    line-height: 60px;
    border-bottom: 1px solid #dedede;
    .my-icon {
      font-size: 25px;
      vertical-align: middle;
      padding-right: 5px;
    }
    div img {
      vertical-align: middle;
      margin-right: 10px;
    }
  }
}
</style>

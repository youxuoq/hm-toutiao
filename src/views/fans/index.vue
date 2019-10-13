<template>
  <!-- 粉丝管理 -->
  <div class="container-fans">
    <el-card>
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <el-tabs v-model="tagActive" type="card">
        <el-tab-pane label="粉丝列表" name="fansList">
          <ul style="overflow: hidden">
            <li class="fans-list" v-for="item in 10" :key="item">
              <span>
                <img src="../../assets/images/avatar.jpg" alt />
              </span>
              <p>用户名称</p>
              <el-button type="primary" plain size="mini" style="margin-top: 20px">+关注</el-button>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="fansImg">粉丝画像</el-tab-pane>
      </el-tabs>
      <el-pagination background layout="prev, pager, next" :total="1000" style="text-align: center"></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tagActive: 'fansList'
    }
  }
}
</script>

<style lang="less" scoped>
.container-fans {
  .fans-list {
    list-style: none;
    float: left;
    width: 200px;
    height: 240px;
    border: 1px solid #eee;
    margin-right: 30px;
    margin-bottom: 30px;
    text-align: center;
    box-sizing: border-box;
    span {
      display: inline-block;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      margin-top: 20px;
      margin-bottom: 20px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>

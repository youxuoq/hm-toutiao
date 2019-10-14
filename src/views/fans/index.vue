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
            <li class="fans-list" v-for="item in resData" :key="item.name">
              <span>
                <img :src="item.photo" alt />
              </span>
              <p>{{item.name}}</p>
              <el-button type="primary" plain size="mini" style="margin-top: 20px" @click="attention">+关注</el-button>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="fansImg" style=" width: 100%">
            <div style="width: 600px; height: 425px; float: left; margin-right: 200px;" ref="bar1">
            </div>
            <div style="width: 600px; height: 400px; float: left; margin-left: 20px; margin-top: 50px" ref="bar2">
            </div>
        </el-tab-pane>
      </el-tabs>
      <div v-show="tagActive === 'fansList'">
        <el-pagination background layout="prev, pager, next" current_page="reqData.page" :total="total" style="text-align: center" :page-size="reqData.per_page" @current-change="switchPage"></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      // tag栏的状态
      tagActive: 'fansList',
      // 请求数据
      reqData: {
        page: 1,
        per_page: 21
      },
      //   响应数据
      resData: [],
      // 总条数
      total: null
    }
  },
  created () {
    this.getFans()
  },
  mounted () {
    const DOM1 = this.$refs.bar1
    const DOM2 = this.$refs.bar2
    const myEcharts1 = echarts.init(DOM1)
    const myEcharts2 = echarts.init(DOM2)
    const option1 = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
    const option2 = {
      title: {
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    myEcharts1.setOption(option1)
    myEcharts2.setOption(option2)
  },
  methods: {
    // 获取粉丝列表
    async getFans () {
      const { data: { data } } = await this.axios.get('followers', { params: this.reqData })
      this.total = data.total_count
      this.resData = data.results
    },
    // 关注粉丝
    attention () {
      this.$message({
        message: '抱歉！ 此功能暂时未开通',
        type: 'warning'
      })
    },
    //            切换分页
    switchPage (page) {
      this.reqData.page = page
      this.getFans()
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
      border:1px solid #eee;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>

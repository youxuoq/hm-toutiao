<template>
    <div>
        <el-select :value="value" @change="changeVal" placeholder="请选择">
            <el-option
              v-for="item in channelData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
        </el-select>
    </div>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      channelData: []
    }
  },
  created () {
    this.getChannel()
  },
  methods: {
    // 获取频道数据
    async getChannel () {
      const {
        data: { data }
      } = await this.axios.get('channels')
      this.channelData = data.channels
    },
    changeVal (val) {
      this.$emit('input', val)
    }
  }

}
</script>
<style lang="">

</style>

<template>
  <!-- 发布文章 -->
  <div class="container-publish">
    <el-card>
      <div slot="header">
        <my-bread>发布文章</my-bread>
      </div>
      <el-form v-model="reqData" label-width="80px">
        <el-form-item label="标题: ">
          <el-input style="width: 350px" v-model="reqData.title"></el-input>
        </el-form-item>
        <el-form-item label="内容: ">
          <quill-editor v-model="reqData.content" :options="editorOption" style="width: 800px"></quill-editor>
        </el-form-item>
        <el-form-item label="封面: ">
            <el-radio-group v-model="reqData.cover.type" @change="typeChange">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
          <!-- 上传按钮 -->
          <div v-show="reqData.cover.type === 1">
              <my-cover v-model="reqData.cover.images[0]"></my-cover>
          </div>
          <div v-show="reqData.cover.type === 3">
              <my-cover v-model="reqData.cover.images[0]"></my-cover>
              <my-cover v-model="reqData.cover.images[1]"></my-cover>
              <my-cover v-model="reqData.cover.images[2]"></my-cover>
          </div>
          <div v-show="reqData.cover.type === -1" style="height: 150px; width: 250px">
          </div>
          <div v-show="reqData.cover.type === 0" style="height: 150px; width: 250px">
          </div>
        </el-form-item>
        <el-form-item label="频道">
          <my-channel v-model="reqData.channel_id"></my-channel>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="publish(false)">发布文章</el-button>
          <el-button @click="publish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 富文本组件
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  components: {
    quillEditor
  },
  data () {
    return {
      // 请求参数
      reqData: {
        title: null,
        content: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      // 富文本配置对象
      editorOption: {
        placeholder: '前请输入文章内容',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }]
          ]
        }
      }
    }
  },
  methods: {
    typeChange () {
      this.reqData.cover.images = []
    },
    async publish (draft) {
      await this.axios.post('articles?draft=' + draft, this.reqData)
      if (draft) {
        this.$message({
          message: '存入草稿成功',
          type: 'success'
        })
      } else {
        this.$message({
          message: '发布文章成功',
          type: 'success'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>

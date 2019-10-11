<template>
  <!-- 发布文章 -->
  <div class="container-publish">
    <el-card>
      <div slot="header">
        <my-bread>发布文章</my-bread>
      </div>
      <el-form v-model="articleData" label-width="80px">
        <el-form-item label="标题: ">
          <el-input style="width: 350px" v-model="articleData.title"></el-input>
        </el-form-item>
        <el-form-item label="内容: ">
            <quill-editor v-model="articleData.content" :options="editorOption" style="width: 800px"></quill-editor>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="articleData.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div class="cover-image">
              <span style="display: inline-block; width: 150px; height: 150px; border: 1px dashed #ccc; overflow: hidden; margin-top: 10px">
                  <img width="150" height="150" src="../../assets/images/default.png" alt="">
              </span>
          </div>
        </el-form-item>
        <el-form-item label="频道">
            <my-channel v-model="articleData.channel_id"></my-channel>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">发布文章</el-button>
            <el-button>存入草稿</el-button>
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
      articleData: {
        title: null,
        content: null,
        cover: {
          type: 1,
          images: []
        }
      },
      // 富文本配置对象
      editorOption: {
        placeholder: '前请输入文章内容',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }], // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }]

          ]
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>

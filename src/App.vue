<template>
    <div id="app">
        <!-- 一级路由渲染的位置 -->
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: 'app',
  components: {}
}
</script>

<style lang="less">
html, body, #app {
    width: 100%;
    height: 100%;
}
* {
    margin: 0px;
    padding: 0px;
}
</style>

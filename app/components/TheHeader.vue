<template>
  <el-menu mode="horizontal" :router="true">
    <el-menu-item index="1" style="pointer-events:none;">
      Nuxt Diary App
    </el-menu-item>
    <el-menu-item index="2" :route="{ path: '/posts/' }">
      投稿一覧
    </el-menu-item>

    <el-menu-item
      v-if="user"
      index="3"
      style="float:right;"
      :route="{ path: `/users/${user.id}` }"
      ><span>{{ user.id }}</span></el-menu-item
    >
    <el-menu-item index="4" style="float:right;" :route="{ path: '/' }">
      <span>ログイン</span>
    </el-menu-item>
    <el-menu-item
      index="5"
      style="float: right"
      :route="{ path: '/posts/new' }"
    >
      新規投稿</el-menu-item
    >
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

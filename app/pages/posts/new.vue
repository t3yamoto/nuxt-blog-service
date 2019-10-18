<template>
  <section class="container posts-page">
    <el-card style="flex:1">
      <div slot="header" class="clearfix">
        <el-input
          v-model="formData.title"
          placeholder="タイトルを入力"
        ></el-input>
      </div>
      <div>
        <el-input
          v-model="formData.body"
          placeholder="本文を入力"
          type="textarea"
          rows="15"
        ></el-input>
      </div>
      <div class="text-right" style="margin-top:16px">
        <el-button type="primary" round @click="publish">
          <span class="el-icon-upload2"></span>
          <span>Publish</span>
        </el-button>
      </div>
    </el-card>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['user'])
  },
  asyncData({ redirect, store }) {
    if (!store.getters.user) {
      redirect('/')
    }
    return {
      formData: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    async publish() {
      const payload = {
        user: this.user,
        ...this.formData
      }
      await this.publishPost({ payload })
      this.$router.push('/posts')
    },
    // ...mapActions('users', ['updateUser']),
    ...mapActions('posts', ['publishPost'])
  }
}
</script>

<style scoped>
.posts-page .el-table__row {
  cursor: pointer;
}
</style>

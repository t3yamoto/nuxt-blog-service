import moment from '~/plugins/moment'

export const state = () => ({
  posts: []
})

export const getters = {
  posts: (state) => state.posts
}

export const mutations = {
  addPost(state, { post }) {
    state.posts.push(post)
  },
  updatePost(state, { post }) {
    state.posts = state.posts.map((p) => (p.id === post.id ? post : p))
  },
  clearPosts(state) {
    state.posts = []
  }
}

export const actions = {
  async fetchPost({ commit }, { id }) {
    const post = await this.$axios.$get(`/posts/${id}.json`)
    commit('addPost', { ...post, id })
  },
  async fetchPosts({ commit }) {
    const posts = await this.$axios.$get('/posts.json')
    commit('clearPosts')
    Object.entries(posts)
      .reverse()
      .forEach(([id, content]) =>
        commit('addPost', {
          post: {
            id,
            ...content
          }
        })
      )
  },
  async publishPost({ commit }, { payload }) {
    const user = await this.$axios.$get(`/users/${payload.user.id}.json`)
    const createdAt = moment().format()
    const postId = (await this.$axios.$post('/posts.json', {
      ...payload,
      created_at: createdAt
    })).name
    const post = { id: postId, ...payload, created_at: createdAt }
    const putData = { id: postId, ...payload, created_at: createdAt }
    delete putData.user
    await this.$axios.$put(`/users/${user.id}/posts.json`, [
      ...(user.posts || []),
      putData
    ])
    commit('addPost', { post })
  }
}

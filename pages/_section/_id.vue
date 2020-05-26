<template lang="pug">
  v-layout(column justify-center align-center)
    v-flex(xs12 sm8 md6)
      v-card.mb-5(flat tile)
        v-card-title.headline {{ post.title }}
        v-card-text
          post-content(:content="post.content.html")
</template>

<script>
import PostContent from '~/components/PostContent'

export default {
  components: {
    PostContent
  },
  asyncData({ params, app: { $hvnApi }, payload }) {
    if (payload) {
      return { post: payload }
    } else {
      return $hvnApi.get('posts/' + params.id).then((res) => {
        return { post: res.data }
      })
    }
  },
  head() {
    return {
      title: this.post.title,
      meta: [
        {
          property: 'og:url',
          content: process.env.baseUrl + this.$route.fullPath,
          hid: 'og:url'
        },
        { property: 'og:type', content: 'article', hid: 'og:type' },
        {
          property: 'og:title',
          content: this.post.title + ' - ' + process.env.siteTitle,
          hid: 'og:title'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.overflow-x-scroll {
  overflow-x: scroll;
}
</style>

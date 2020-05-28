<template lang="pug">
  v-layout(column justify-center align-center)
    v-container
      h2.headline {{ post.title }}
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
      return $hvnApi.get(params.section + '/' + params.id).then((res) => {
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

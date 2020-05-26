<template lang="pug">
  v-layout(column justify-center align-center)
    v-container
      v-data-iterator(
        :items="posts"
      )
        template(v-slot:default="props")
          v-row
            v-col(
              v-for="item in props.items"
              :key="item.slug"
              cols="12"
              sm="6"
              md="4"
            )
              v-card(
                style="height:400px;overflow-y:hidden;"
                :to="{name: 'blog-id', params: { id: (item.slug) } }"
              )
                v-card-title(class="subheading font-weight-bold" style="word-break: normal") {{ item.title }}
                v-card-subtitle(class="subheading font-weight-bold") {{ new Date(item.published_at).toLocaleDateString() }}
                v-card-text(v-html="item.content.html")
</template>

<script>
import PostContent from '~/components/PostContent'

export default {
  components: {
    PostContent
  },
  async asyncData({ params, app: { $hvnApi } }) {
    const template = await $hvnApi.get('posts/template').then((res) => {
      return res.data
    })
    const posts = await $hvnApi.get('posts').then((res) => {
      return res.data
    })
    return { template, posts }
  }
}
</script>

<style lang="scss">
.overflow-x-scroll {
  overflow-x: scroll;
}
</style>

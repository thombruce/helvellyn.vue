<template lang="pug">
  v-layout(column justify-center align-center)
    v-container
      v-data-iterator(
        :items="entities"
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
                :to="{name: 'section-id', params: { section: template.slug, id: (item.slug) } }"
              )
                v-card-title(class="subheading font-weight-bold" style="word-break: normal") {{ item.title }}
                v-card-subtitle(class="subheading font-weight-bold") {{ new Date(item.published_at).toLocaleDateString() }}
                v-card-text(v-html="item.content.html")
</template>

<script>
export default {
  async asyncData({ params, app: { $hvnApi }, payload }) {
    if (payload) {
      return { template: payload }
    } else {
      const template = await $hvnApi
        .get(params.section + '/template')
        .then((res) => {
          return res.data
        })
      const entities = await $hvnApi.get(params.section).then((res) => {
        return res.data
      })
      return { template, entities }
    }
  }
}
</script>

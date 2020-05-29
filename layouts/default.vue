<template lang="pug">
client-only
  v-app(slot="placeholder" :style="{background: $vuetify.theme.themes['light'].primary}")
    div
  v-app(v-if="loading" :style="{background: $vuetify.theme.themes['light'].primary}")
    v-content
      v-container.d-flex.justify-center.align-center.fill-height(fluid)
        v-progress-circular(indeterminate size="70" width="7" color="white")
        nuxt.d-none
  v-app(v-else :dark="$vuetify.theme.dark")
    v-navigation-drawer(
      v-model="drawer"
      :mini-variant="miniVariant"
      clipped
      fixed
      app
    )
      v-list(v-if="workspace")
        v-list-item(
          v-for="(item, i) in menuItems"
          :key="i"
          :to="item.to"
          router
        )
          v-list-item-action
            v-icon {{ item.icon }}
          v-list-item-content
            v-list-item-title(v-text="item.title")
      template(v-slot:append)
        v-list-item(
          @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark"
        )
          v-list-item-action
            v-icon mdi-{{ $vuetify.theme.dark ? 'eye' : 'eye-off' }}
          v-list-item-title {{ $vuetify.theme.dark ? 'Light' : 'Dark' }} Mode
        v-list-item(
          @click.stop="miniVariant = !miniVariant"
        )
          v-list-item-action
            v-icon mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}
          v-list-item-content
            v-list-item-title Minify
    v-app-bar(clipped-left fixed app color="primary")
      v-app-bar-nav-icon(@click.stop="drawer = !drawer")
      v-btn(to="/" text)
        v-toolbar-title(v-text="title")
    v-content
      v-container
        nuxt
      v-footer
        span &copy; {{ new Date().getFullYear() }} Thom Bruce
</template>

<script>
export default {
  data() {
    return {
      drawer: null, // [1]
      miniVariant: false,
      title: process.env.siteTitle,
      workspace: null,
      loading: true
    }
  },
  computed: {
    menuItems() {
      const baseArr = [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/'
        }
      ]
      const sections = this.workspace.templates.map((template) => {
        return {
          icon: 'mdi-folder-open',
          title: template.plural,
          to: '/' + template.slug
        }
      })
      return baseArr.concat(sections)
    }
  },
  created() {
    this.fetchWorkspace()
  },
  methods: {
    async fetchWorkspace() {
      await this.$hvnApi.get().then((res) => {
        this.workspace = res.data
        this.loading = false
      })
    }
  }
}

// [1] Using null as the starting value for its v-model will initialize the drawer as closed on mobile and as open on desktop.
//     https://vuetifyjs.com/en/components/navigation-drawers/#usage
</script>

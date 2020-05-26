<template lang="pug">
client-only
  v-app(slot="placeholder" :style="{background: $vuetify.theme.themes['light'].primary}")
    v-content
      v-container.d-flex.justify-center.align-center.fill-height(fluid)
        v-progress-circular(indeterminate size="70" width="7" color="white")
        nuxt.d-none
  v-app(:dark="$vuetify.theme.dark")
    v-navigation-drawer(
      v-model="drawer"
      :mini-variant="miniVariant"
      clipped
      fixed
      app
    )
      v-list
        v-list-item(
          v-for="(item, i) in items"
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
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-folder-open',
          title: 'Posts',
          to: '/posts'
        }
      ],
      miniVariant: false,
      title: process.env.siteTitle
    }
  }
}

// [1] Using null as the starting value for its v-model will initialize the drawer as closed on mobile and as open on desktop.
//     https://vuetifyjs.com/en/components/navigation-drawers/#usage
</script>

<template lang="pug">
  v-layout(column justify-center align-center)
    v-container
      h2.display-1 Welcome to {{ title }}
      p.headline {{ description }}
</template>

<script>
export default {
  data() {
    return {
      title: process.env.siteTitle,
      description: process.env.siteDescription
    }
  }
}
</script>

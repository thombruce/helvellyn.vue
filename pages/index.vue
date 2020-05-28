<template lang="pug">
  v-layout(column justify-center align-center)
    v-container
      h2 Welcome to {{ title }}
</template>

<script>
export default {
  data() {
    return {
      title: process.env.siteTitle
    }
  }
}
</script>

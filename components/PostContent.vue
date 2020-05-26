<template lang="pug">
  .api-content(v-html="content")
</template>

<script>
export default {
  props: ['content']
}
</script>

<style lang="scss">
@import 'node_modules/vuetify/src/styles/settings/_variables.scss';
@import 'node_modules/vuetify/src/styles/elements/_blockquote.sass';

.api-content {
  pre > code {
    padding: 10px;

    &:before,
    &:after {
      content: '';
    }
  }

  img {
    max-width: 100%;
  }

  table {
    width: 100%;
    text-align: center;
    th {
      // color: #eee;
      // background-color: #333;
    }
    td {
      // background-color: #eee;
    }
  }

  blockquote {
    @extend .blockquote;
  }
}
</style>

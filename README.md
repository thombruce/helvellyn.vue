# Helvellyn.vue

> A Nuxt template for the Helvellyn API.

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Environment Variables

Helvellyn.vue accepts a few environment variables for configuring your site. These are:

```
API_URL=[helvellyn api workspace url]
API_KEY=[helvallyn api key]

TITLE="My Awesome Website"
DESCRIPTION="My awesome website description!"
PRIMARY_COLOR=deepOrange
```

You can obtain the API key for your Helvellyn workspace from the workspace settings page in the Helvellyn admin interface.

`PRIMARY_COLOR` should be one of the base material colors found here: https://vuetifyjs.com/en/styles/colors/#material-colors. The variable should be written in camelCase (i.e. 'deepOrange' instead of 'deep-orange').

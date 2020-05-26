export default function({ $axios, redirect }, inject) {
  // Create a custom axios instance
  const hvnApi = $axios.create({
    headers: {
      common: {
        Accept: 'application/json',
        'Api-Token': process.env.apiKey // [1]
      }
    }
  })

  // Set baseURL to something different
  hvnApi.setBaseURL(process.env.apiUrl)

  // Inject to context as $hvnApi
  inject('hvnApi', hvnApi)
}

// TODO: Private! If you ever make the repo public, put this in an env variable.
//       AND REGENERATE THE TOKEN!
//       It will otherwise still be public in Git history.

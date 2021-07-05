<template>
  <div id="app">
    <Map></Map>
  </div>
</template>

<script>
import Map from './components/Map'

export default {
  name: 'App',
  components: {
    Map
  },
  data () {
    return {
      busNo: '150',
      result: {},
    }
  },
  computed: {
    _apiKey () {
      return process.env.VUE_APP_ODSAY_SERVER_KEY
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
*, *::after, *::before { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  position: relative;
  font-size: 16px;
}

button, input, select,
h1, h2, h3, h4, h5, h6 {
  margin: 0;
  padding: 0;
  font-size: 1rem;
  font-weight: normal;
}

ul, li {
  margin: 0;
  padding: 0;
  list-style: none;
}

p, span{
  margin: 0;
  padding: 0;
}

/* Anchor */
a {
  text-decoration: none;
  &:hover,
  &:active,
  &:focus { text-decoration: none; }
  color: inherit;
}

b, strong, em {
  font-style: normal;
  font-weight: normal;
}

</style>

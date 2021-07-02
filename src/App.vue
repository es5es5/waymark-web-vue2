<template>
  <div id="app">
    <input type="text" v-model="busNo">
    <button type="button" @click="searchBusLane">searchBusLane</button>
    <hr>
    <p>{{ result }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
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
    searchBusLane () {
      axios.get(
        `https://api.odsay.com/v1/api/searchBusLane?apiKey=${this._apiKey}&busNo=${this.busNo}`
      ).then(result => {
        this.result = result.data.result
        console.log(result)
      })
    }
  }
}
</script>

<style lang="scss">
</style>

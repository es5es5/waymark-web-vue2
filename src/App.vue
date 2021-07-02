<template>
  <div id="app">
    <input type="text" v-model="busNo">
    <button type="button" @click="searchBusLaneAJAX">searchBusLaneAJAX</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data () {
    return {
      busNo: '10',
      apiKey: encodeURI('uiRepkko8TxYUyVP2KqYeg')
    }
  },
  methods: {
    searchBusLaneAJAX () {
      axios.get(
        `https://api.odsay.com/v1/api/searchBusLane?apiKey=${this.apiKey}&busNo=${this.busNo}`
      ).then(result => {
        console.log(result)
      })
    }
  }
}
</script>

<style lang="scss">
</style>

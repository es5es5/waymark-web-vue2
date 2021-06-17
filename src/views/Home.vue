<template>
  <div class="home">
    Hi
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
  async mounted () {
    await this.$loadScript.loadScript(
      `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.VUE_APP_NAVER_MAPS_CLIENT_ID}`
    ).then(result => {
      console.log(result)
    })
  }
}
</script>

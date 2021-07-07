<template>
  <div id="app">
    <div class="left">
      <Map></Map>
    </div>
    <div class="right">
      <h2>
        지금까지 검색한 경로
      </h2>
      <hr>
      <ul class="path" v-for="(item, index) in _waymarks" :key="index" @click="setSelectPath(item)">
        <li>
          <h3>{{ item.pathType | pathTypeFilter }}</h3>
          <h4>{{ item.info.firstStartStation }} -> {{ item.info.lastEndStation }}</h4>
          <p class="totalTime">총 소요시간: {{ item.info.totalTime }}분</p>
          <p>비용: {{ item.info.payment }}분</p>
          <hr>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Map from './components/Map'

export default {
  name: 'App',
  components: {
    Map
  },
  filters: {
    pathTypeFilter (pathType) {
      switch (pathType) {
        case 1: return '지하철'
        case 2: return '버스'
        case 3: return '버스+지하철'
      }
    },
    trafficTypeFilter (trafficType) {
      switch (trafficType) {
        case 1: return '지하철'
        case 2: return '버스'
        case 3: return '도보'
      }
    }
  },
  data () {
    return {
      busNo: '150',
      result: {},
    }
  },
  computed: {
    _waymarks () { return this.$store.getters.getWaymarks },
    _apiKey () { return process.env.VUE_APP_ODSAY_SERVER_KEY }
  },
  methods: {
    setSelectPath (item) {
      this.$eventBus.$emit('abc', item)
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin clearfix() {
  &::after {
    content: '';
    display: table;
    clear: both;
  }
}

#app {
  @include clearfix
}

.left {
  float: left;
  width: 80%;
}

.right {
  float: right;
  width: 20%;
}

.path {
  cursor: pointer;

  &:hover { color: mediumaquamarine; }
}

.totalTime {
  color: red;
}
</style>

<style lang="scss">
*, *::after, *::before { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  position: relative;
  font-size: 16px;
}

button, input, select {
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

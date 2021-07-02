<template>
  <div class="map">
    <div id="map" style="width:100%;height:1000px;"></div>
    <hr>
    <!-- 검색결과 전체 -->
    <div class="info_wrap">
      <div class="left">
        <ul class="path" v-for="(item, index) in resultPath.path" :key="index" @click="setSelectPath(index)">
          <li>
            <span>{{ index }}</span>
            <p class="pathType">{{ item.pathType | pathTypeFilter }}</p>
            <span class="firstStartStation">{{ item.info.firstStartStation }}</span>
            <span>-></span>
            <span class="lastEndStation">{{ item.info.lastEndStation }}</span>
          </li>
        </ul>
      </div>
      <div class="right">
        <h3>{{ selectPath.pathType | pathTypeFilter }}</h3>
        <h4>{{ selectPath.info.firstStartStation }} -> {{ selectPath.info.lastEndStation }}</h4>
        <hr>
        <ul class="subPath" v-for="(item, index) in selectPath.subPath" :key="index">
          <li>
            <p>{{ index }} {{ item.trafficType | trafficTypeFilter }}</p>
            <p>소요시간: {{ item.sectionTime }}분</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- 검색 결과 중 첫번째 방법으로 보여주기 -->
  </div>
</template>

<script type="text/javascript" src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=222me2bsgh"></script>
<script>
import axios from 'axios'
export default {
  name: 'Map',
  data () {
    return {
      resultPath: [{
        path: {}
      }],
      selectPath: {
        info: {},
        subPath: []
      },
      MAP: null,
      mapOptions: {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10,
      },
      position: {
        sx: 127.07925877487092,
        sy: 37.60255986568403,
        ex: 126.98176654690147,
        ey: 37.48525981337354,
      }
    }
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
  mounted () {
    this.MAP = new naver.maps.Map('map', this.mapOptions)
    this.searchPubTransPathAJAX()
  },
  methods: {
    searchPubTransPathAJAX () {
      axios.get(
        `https://api.odsay.com/v1/api/searchPubTransPath?SX=${this.position.sx}&SY=${this.position.sy}&EX=${this.position.ex}&EY=${this.position.ey}&apiKey=ZJNssgraICbHJnjme0WTc7Lo4h3IY%2F4%2BHtKWJ0g%2BfQM`
      ).then(result => {
        this.resultPath = result.data.result
      })
    },
    setSelectPath (index) {
      this.selectPath = this.resultPath.path[index]
    },
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

.info_wrap {
  @include clearfix;
}

.left {
  float: left;
  width: 50%;
}

.right {
  float: right;
  width: 50%;
  border-left: 1px solid gray;
}

.path {
  cursor: pointer;

  &:hover { color: mediumaquamarine; }
}

// subPath
.subPath {
  margin-bottom: 20px;
}
</style>

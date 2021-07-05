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
        <p>총 소요시간: {{ selectPath.info.totalTime }}분</p>
        <p>비용: {{ selectPath.info.payment }}분</p>
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

<script>
/* eslint-disable */
import axios from 'axios'
import MixinSubway from './MixinSubway.vue'

export default {
  name: 'Map',
  mixins: [MixinSubway],
  computed: {
    _apiKey () { return process.env.VUE_APP_ODSAY_SERVER_KEY },
    // _zoom () { return this.MAP.zoom },
  },
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
        `https://api.odsay.com/v1/api/searchPubTransPath?SX=${this.position.sx}&SY=${this.position.sy}&EX=${this.position.ex}&EY=${this.position.ey}&apiKey=${this._apiKey}`
      ).then(result => {
        this.resultPath = result.data.result
      })
    },
    callMapObjApiAJAX () {
      if (!this.selectPath.info.mapObj) return false

      axios.get(
        `https://api.odsay.com/v1/api/loadLane?mapObject=0:0@${this.selectPath.info.mapObj}&apiKey=${this._apiKey}`
      ).then(result => {
        this.drawNaverMarker(this.position.sx, this.position.sy)
        this.drawNaverMarker(this.position.ex, this.position.ey)
        this.drawNaverPolyLine(result.data)
        console.log(result)
      })
    },
    drawNaverMarker (x, y) {
      let marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(y, x),
        map: this.MAP
      })
    },
    drawNaverPolyLine (data) {
      let lineArray

      for(var i = 0 ; i < data.result.lane.length; i++){
        for(var j=0 ; j <data.result.lane[i].section.length; j++){
          lineArray = null;
          lineArray = new Array();
          for(var k=0 ; k < data.result.lane[i].section[j].graphPos.length; k++){
            lineArray.push(new naver.maps.LatLng(data.result.lane[i].section[j].graphPos[k].y, data.result.lane[i].section[j].graphPos[k].x));
          }

        if (data.result.lane[i].class === 1) {
          // 버스
          new naver.maps.Polyline({
              map: this.MAP,
              path: lineArray,
              strokeWeight: 3,
              strokeColor: '#386DE8'
          })
        } else {
          // 지하철
          new naver.maps.Polyline({
            map: this.MAP,
              path: lineArray,
              strokeWeight: 3,
              strokeColor: this.getSubwayColor(data.result.lane[i].type)
            })
          }
        }
      }
      console.log('this.MAP', this.MAP)
    },
    setSelectPath (index) {
      const prevMapOption = {
        center: new naver.maps.LatLng(this.MAP.center._lat, this.MAP.center._lng),
        zoom: this.MAP.zoom
      }
      this.MAP = new naver.maps.Map('map', prevMapOption)
      this.selectPath = this.resultPath.path[index]
      this.callMapObjApiAJAX()
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

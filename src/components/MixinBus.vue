<template>
  <div></div>
</template>

<script>
export default {
  name: 'MixinBus',
  methods: {
    getBusColor (type) {
      if (!type) return false
      switch (parseInt(type)) {
        case 1: return '#111111' // 일반
        case 2: return '#222222' // 좌석
        case 3: return '#70ad47' // 마을버스
        case 4: return '#444444' // 직행버스
        case 5: return '#8b4513' // 공항버스
        case 6: return '#666666' // 간선급행
        case 10: return '#AAAAAA' // 외곽
        case 11: return '#3d5bab' // 간선
        case 12: return '#5bb025' // 지선
        case 13: return '#f99d1c' // 순환
        case 14: return '#f72f08' // 광역
        case 15: return '#151515' // 급행
        case 20: return '#202020' // 농어촌버스
        case 21: return '#212121' // 제주도 시외행버스
        case 22: return '#2E2E2E' // 경기도 시외행버스
        case 26: return '#262626' // 급행간선
        default: return '#000000'
      }
    },
  }
}
</script>

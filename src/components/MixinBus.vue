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
        // case 1: return '' // 일반
        // case 2: return '' // 좌석
        case 3: return '#70ad47' // 마을버스
        // case 4: return '' // 직행버스
        case 5: return '#8b4513' // 공항버스
        // case 6: return '' // 간선급행
        // case 10: return '' // 외곽
        case 11: return '#3d5bab' // 간선
        case 12: return '#5bb025' // 지선
        case 13: return '#f99d1c' // 순환
        case 14: return '#f72f08' // 광역
        // case 15: return '' // 급행
        // case 20: return '' // 농어촌버스
        // case 21: return '' // 제주도 시외행버스
        // case 22: return '' // 경기도 시외행버스
        // case 26: return '' // 급행간선
        default: return '#000000'
      }
    },
  }
}
</script>

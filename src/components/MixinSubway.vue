<template>
  <div></div>
</template>

<script>
export default {
  name: 'MixinSubway',
  methods: {
    getSubwayColor (type) {
      if (!type) return false

      switch (parseInt(type)) {
        case 1: return '#0052A4' // 서울 지하철 1호선
        case 2: return '#009D3E' // 서울 지하철 2호선
        case 3: return '#EF7C1C' // 서울 지하철 3호선
        case 4: return '#00A5DE' // 서울 지하철 4호선
        case 5: return '#996CAC' // 서울 지하철 5호선
        case 6: return '#CD7C2F' // 서울 지하철 6호선
        case 7: return '#747F00' // 서울 지하철 7호선
        case 8: return '#EA545D' // 서울 지하철 8호선
        case 9: return '#BDB092' // 서울 지하철 9호선
        default: return '#DDDDDD'
      }
    }
  }
}
</script>

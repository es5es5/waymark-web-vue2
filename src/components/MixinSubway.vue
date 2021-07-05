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
        case 1: return '#0052A4'
        case 2: return '#009D3E'
        case 3: return '#EF7C1C'
        case 4: return '#00A5DE'
        case 5: return '#996CAC'
        case 6: return '#CD7C2F'
        case 7: return '#747F00'
        case 8: return '#EA545D'
        case 9: return '#BDB092'
      }
    }
  }
}
</script>

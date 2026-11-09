<script setup lang="ts">
const paths = {
  'arrow-up-right': 'M5 19 19 5M5 5h14v14',
  'arrow-down': 'M12 3v18m-7-7 7 7 7-7',
  'arrow-up': 'M12 21V3m-7 7 7-7 7 7',
  'arrow-left': 'M21 12H3m7-7-7 7 7 7',
  'arrow-right': 'M3 12h18m-7-7 7 7-7 7',
  close: 'm6 6 12 12M6 18 18 6',
  plus: 'M12 4v16M4 12h16',
}
defineProps<{ name: keyof typeof paths }>()
</script>
<template>
  <svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path :d="paths[name]" /></svg>
</template>
<style scoped>
.ui-icon { display: inline-block; width: 1em; height: 1em; min-width: 1em; vertical-align: -.12em; flex-shrink: 0; }
</style>

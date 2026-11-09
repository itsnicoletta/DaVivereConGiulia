<script setup lang="ts">
const publicAsset = usePublicAsset()
import { site } from '~/data/site'
const playing = ref(false)
let motion: MediaQueryList | undefined
function respectMotion() { playing.value = !motion?.matches }
onMounted(() => {
  motion = matchMedia('(prefers-reduced-motion: reduce)')
  respectMotion()
  motion.addEventListener('change', respectMotion)
})
onBeforeUnmount(() => motion?.removeEventListener('change', respectMotion))
</script>
<template>
  <section id="copertina" class="cover" aria-labelledby="d3-masthead">
    <div class="cover-edition"><span>Il diario delle cose belle</span><span>Brescia, Italia</span></div>
    <div class="cover-welcome"><h1 id="d3-masthead">Le cose belle, da vivere.<span>Con Giulia</span></h1><p class="cover-description">Scopri <strong>eventi, luoghi e incontri</strong> scelti da Giulia. <mark class="cover-highlight">Scegli quello che ti piace</mark> e trova la tua prossima occasione <mark class="cover-highlight">per esserci</mark>.</p><a class="cover-cta" href="#esperienze">Scopri gli eventi <span aria-hidden="true"><UiIcon name="arrow-down" /></span></a></div>
    <div class="cover-composition">
      <aside class="cover-index"><figure><NuxtImg src="/images/tavola.jpg" alt="Calici e fiori su una tavola illuminata da candele" width="400" height="500" sizes="40vw md:17vw" format="webp" loading="eager" /><figcaption>Dettagli che restano.</figcaption></figure></aside>
      <figure class="cover-main"><NuxtImg src="/images/demo-three-cover.jpg" alt="Una persona sfoglia un menu a tavola, fotografia editoriale dall’archivio fornito" width="1000" height="1253" sizes="70vw md:35vw" format="webp" preload loading="eager" fetchpriority="high" /><figcaption><span>01 / Un momento, da vicino.</span><span>Archivio visivo</span></figcaption></figure>
      <div class="cover-margin"><figure><div class="margin-video"><NuxtImg src="/images/cover-poster.jpg" alt="Un fotogramma del diario video di Giulia, sotto i portici" width="848" height="480" sizes="100vw md:22vw" format="webp" loading="eager" /><video v-if="playing" autoplay muted loop playsinline preload="metadata" aria-hidden="true" @error="playing = false"><source :src="publicAsset(site.coverVideo)" type="video/webm"><source :src="publicAsset(site.coverVideoFallback)" type="video/mp4"></video></div><figcaption>La voglia di andare.</figcaption></figure></div>
    </div>
  </section>
</template>
<style scoped>
.cover { width: min(1720px, calc(100% - 88px)); margin-inline: auto; min-height: 82svh; padding-block: 80px; display: grid; grid-template-columns: minmax(0, .9fr) minmax(0, 1.45fr); grid-template-rows: auto minmax(0, 1fr); column-gap: clamp(32px, 3vw, 56px); row-gap: 32px; align-items: start; }
.cover-edition { grid-column: 1/-1; display: flex; justify-content: space-between; gap: 20px; font-size: 16px; text-transform: uppercase; letter-spacing: .07em; }
.cover-welcome { min-width: 0; align-self: start; padding: 0; }
h1 { font-size: clamp(64px, 7.4vw, 124px); font-weight: 800; line-height: .98; letter-spacing: -.055em; text-wrap: balance; }
h1 > span { display: block; font-size: clamp(26px, 2.4vw, 36px); font-weight: 400; letter-spacing: -.035em; margin-top: 22px; }
.cover-description { max-width: 470px; font-size: 20px; line-height: 1.55; margin-top: 28px; }
.cover-description br { display: none; }
.cover-cta { display: inline-flex; justify-content: space-between; align-items: center; gap: 42px; min-height: 54px; margin-top: 28px; padding: 14px 22px; border: 1px solid #242020; background: #242020; color: #fff; font-size: 18px; line-height: 1.35; transition: background-color .3s; }
.cover-cta:hover { background: #403936; }
.cover-composition { min-width: 0; align-self: end; margin-top: 64px; display: grid; grid-template-columns: minmax(0, .8fr) minmax(0, 1.45fr) minmax(0, .85fr); gap: 18px; align-items: start; padding: 0 0 40px; }
.cover-main { grid-column: 3; grid-row: 1; margin-top: 40px; }
.cover-main img { aspect-ratio: 4/5.3; object-position: center; }
.cover-main figcaption { display: flex; justify-content: space-between; gap: 12px; }
.cover-main figcaption > span:last-child { display: none; }
.cover-index { grid-column: 1; grid-row: 1; margin-top: 160px; }
.cover-index img { aspect-ratio: 4/5; }
.cover-margin { grid-column: 2; grid-row: 1; }
.margin-video { position: relative; aspect-ratio: 4/5.5; overflow: hidden; }
.margin-video video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: saturate(1.85) contrast(1.1) brightness(1.14); }
figcaption { font-size: 16px; color: #66615f; line-height: 1.35; margin-top: 10px; }
@media (min-width: 768px) and (max-width: 1100px) { .cover { column-gap: 32px; grid-template-columns: 1fr 1fr; grid-template-rows: auto minmax(0, 1fr); } h1 { font-size: clamp(52px, 6.8vw, 80px); } .cover-description { font-size: 18px; } .cover-index { margin-top: 125px; } }
@media (max-width: 767px) { .cover { width: calc(100% - 48px); min-height: 90svh; padding-block: 48px; grid-template-columns: 1fr; grid-template-rows: auto; row-gap: 30px; } .cover-edition { gap: 16px; } .cover-welcome { padding: 0; } h1 { font-size: clamp(52px, 13vw, 88px); max-width: 540px; } h1 > span { font-size: 28px; margin-top: 32px; } .cover-description { font-size: 18px; margin-top: 22px; } .cover-cta { margin-top: 24px; } .cover-composition { margin-top: 12px; padding: 10px 0 40px; gap: 12px; } .cover-index { margin-top: 100px; } .cover-main { margin-top: 40px; } }
@media (prefers-reduced-motion: reduce) { .cover-cta { transition: none; } }

.cover-highlight { background: #e6d4cf; color: inherit; padding: .08em .22em; -webkit-box-decoration-break: clone; box-decoration-break: clone; }
@media (max-width: 767px) {
  .cover { padding-block: 56px; row-gap: 60px; }
  .cover-composition { grid-row: 2; }
  .cover-welcome { grid-row: 3; }
  .cover-edition { font-size: 16px; text-transform: none; letter-spacing: 0; }
  .cover-edition > span:last-child { display: none; }
  h1 { font-size: clamp(48px, 12.8vw, 78px); line-height: 1; }
  .cover-description { font-size: 18px; line-height: 1.65; margin-top: 36px; }
  .cover-cta { width: auto; min-height: 48px; padding: 12px 18px; gap: 24px; font-size: 16px; margin-top: 40px; }
  .cover-composition { margin-top: 0; padding: 0; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
  .cover-margin { grid-column: 1 / -1; grid-row: 1; }
  .margin-video { aspect-ratio: 4/3; }
  .cover-index { grid-column: 1; grid-row: 2; margin-top: 24px; }
  .cover-index img { aspect-ratio: 4/3; }
  .cover-main { grid-column: 2; grid-row: 2; margin-top: 0; }
  .cover-main img { aspect-ratio: 4/3; object-position: center 30%; }
  figcaption { display: none !important; }
}
@media (max-width: 767px) {
  .cover { position: relative; isolation: isolate; width: 100%; min-height: 90svh; padding: 48px 24px; grid-template-rows: auto 1fr; row-gap: 48px; color: #fff; overflow: hidden; }
  .cover-composition { position: absolute; grid-area: auto; inset: 0; z-index: -2; display: block; width: 100%; height: 100%; margin: 0; padding: 0; }
  .cover-index, .cover-main { display: none; }
  .cover-margin, .cover-margin > figure, .margin-video { width: 100%; height: 100%; margin: 0; }
  .margin-video { aspect-ratio: auto; }
  .margin-video > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .cover::after { content: ''; position: absolute; inset: 0; z-index: -1; background: linear-gradient(180deg, rgb(20 16 14 / .48), rgb(20 16 14 / .68) 55%, rgb(20 16 14 / .8)); pointer-events: none; }
  .cover-edition { position: relative; grid-row: 1; }
  .cover-welcome { position: relative; grid-row: 2; align-self: end; padding: 0; }
  .cover-description { color: #fff; }
  .cover-highlight { color: #242020; background: #e6d4cf; }
  .cover-cta { background: #fff; border-color: #fff; color: #242020; }
  .cover-cta:hover { background: #e6dcd9; border-color: #e6dcd9; }
}
</style>
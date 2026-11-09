<script setup lang="ts">
import { site } from '~/data/site'
const proposalUrl = `mailto:${site.email}?subject=${encodeURIComponent('Vorrei proporre la mia attività per la guida')}&body=${encodeURIComponent('Ciao Giulia,\n\nmi piacerebbe raccontarti la mia attività.\n\nNome dell’attività:\nDove si trova:\nSito o profilo social:\nChe cosa la rende speciale:\n\nA presto!')}`
</script>

<template>
  <section id="entra-nella-guida" class="guide-proposal section wrap" aria-labelledby="proposal-heading">
    <div class="section-label"><span>04 / Per le attività e i luoghi da scoprire</span><span>Facciamo conoscenza.</span></div>
    <div class="proposal-layout">
      <div><p class="eyebrow">Dietro ogni bel posto, c’è una storia.</p><h2 id="proposal-heading">Vuoi far parte<br>della <span class="accent">mia guida?</span></h2></div>
      <div class="proposal-copy"><p>Hai un <strong>ristorante</strong>, una <strong>struttura ricettiva</strong> o un’esperienza da far conoscere? Mi piacerebbe scoprire che cosa rende <strong>speciale il tuo progetto</strong>.</p><p>Raccontami il tuo luogo, le persone che lo animano e la tua idea. Partiamo da una <strong>conversazione</strong>.</p><a class="hero-primary" :href="proposalUrl"><span>Proponi la tua attività</span><span aria-hidden="true"><UiIcon name="arrow-up-right" /></span></a></div>
    </div>
  </section>
</template>

<style scoped>
.proposal-layout { display: grid; grid-template-columns: 1.2fr 1fr; gap: 10%; align-items: center; padding-top: 60px; }
.proposal-layout h2 { font-size: clamp(42px, 5vw, 76px); }
.proposal-copy > p { font-size: 19px; margin-bottom: 20px; max-width: 450px; }
.proposal-copy .hero-primary { margin-top: 8px; }
@media (max-width: 767px) {
  .proposal-layout { grid-template-columns: 1fr; gap: 28px; padding-top: 36px; }
  .proposal-layout h2 { font-size: clamp(40px, 10.5vw, 70px); }
  .proposal-copy > p { font-size: 17px; }
  .proposal-copy .hero-primary { width: 100%; font-size: 16px; padding: 14px 18px; }
}
</style>

<script setup lang="ts">
import { site } from '~/data/site'
defineProps<{ instagramEmbed?: boolean }>()
const email = ref('')
const previewSubmitted = ref(false)
function previewSignup() {
  previewSubmitted.value = true
  email.value = ''
}
</script>
<template>
  <section id="community" class="community section wrap" aria-labelledby="community-heading">
    <div class="section-label"><span>03 / La community</span><span>Restiamo vicini.</span></div>
    <div class="community-intro">
      <p class="eyebrow">Un posto anche per te.</p>
      <h2 id="community-heading">Le cose belle,<br><span class="accent">condividiamole.</span></h2>
      <p><strong>Nuovi eventi</strong>, piccole scoperte e un invito a ritrovarci.<br>Entra nella <strong>community</strong> e continua a esplorare con me.</p>
      <p class="community-invitation">Su Instagram, tra un racconto e l’altro.<br>Nella <strong>newsletter</strong>, con una bella notizia ogni tanto.</p>
    </div>
    <div class="community-strip" :class="{ 'community-with-embed': instagramEmbed }">
      <div v-if="instagramEmbed" class="community-embed"><iframe scrolling="no" src="https://www.instagram.com/giuliarag_/embed/" title="Il profilo Instagram di Giulia" width="400" height="540" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe></div><figure v-else class="community-visual"><NuxtImg src="/images/incontri.jpg" alt="Un brindisi a tavola dall’archivio del sito originale" width="720" height="900" sizes="100vw sm:50vw lg:25vw" format="webp" loading="lazy" /></figure>
      <a class="community-instagram" :href="site.instagram" target="_blank" rel="noopener noreferrer"><span class="community-card-label">Il diario di ogni giorno</span><span class="community-card-arrow" aria-hidden="true"><UiIcon name="arrow-up-right" /></span><div><h3>Ci vediamo<br>su Instagram.</h3><span class="instagram-handle">{{ site.instagramLabel }}</span></div><span class="sr-only"> (nuova scheda)</span></a>
      <div class="community-newsletter"><p class="eyebrow">La newsletter</p><h3>Una bella notizia,<br>ogni tanto.</h3><p><strong>Eventi, scoperte</strong> e nuovi motivi per incontrarci.<br>Direttamente nella tua casella.</p>
        <a v-if="site.newsletterUrl" class="text-link" :href="site.newsletterUrl" target="_blank" rel="noopener noreferrer">Iscriviti alla newsletter <span aria-hidden="true"><UiIcon name="arrow-up-right" /></span></a>
        <template v-else><form class="newsletter-form" @submit.prevent="previewSignup"><label for="newsletter-email">La tua email</label><div class="newsletter-input-row"><input id="newsletter-email" v-model="email" type="email" required maxlength="254" autocomplete="email" placeholder="nome@esempio.it" @input="previewSubmitted = false"><button type="submit">Iscriviti <span aria-hidden="true"><UiIcon name="arrow-up-right" /></span></button></div></form><p v-if="previewSubmitted" class="newsletter-feedback" role="status">Le iscrizioni apriranno presto.</p></template>
      </div>
    </div>
  </section>
</template>

<style scoped>
.community-with-embed { grid-template-columns: minmax(320px, 1fr) .85fr 1.65fr; }
.community-embed { min-width: 0; align-self: start; overflow: hidden; container-type: inline-size; background: #fff; border: 1px solid #e9e5e4; }
.community-embed iframe { display: block; width: 100%; height: calc(150px + 66.667cqw); border: 0; }
@media (max-width: 1100px) { .community-with-embed { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); } }
@media (max-width: 767px) { .community-with-embed { grid-template-columns: minmax(0, 1fr); } .community-embed, .community-with-embed .community-instagram, .community-with-embed .community-newsletter { grid-column: 1; } .community-with-embed .community-instagram { min-height: 230px; } }
</style>
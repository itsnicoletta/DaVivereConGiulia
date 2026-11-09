<script setup lang="ts">
import { site } from '~/data/site'
import { events, type DemoEvent } from '~/data/events'

definePageMeta({ standalone: true, alias: ['/demo'] })
useSeoMeta({ title: 'Da Vivere con Giulia | Demo', description: 'Luoghi, incontri e nuove prospettive. Un invito a vivere le cose belle, con Giulia.', robots: 'noindex, nofollow' })
const menuOpen = ref(false)
const menuButton = ref<HTMLButtonElement>()
const mobileMenuDialog = ref<HTMLDialogElement>()
function openMobileMenu() { mobileMenuDialog.value?.showModal(); menuOpen.value = true }
const nav = [{ title: 'Esperienze', href: '#esperienze' }, { title: 'Giulia Chat', href: '#con-giulia' }, { title: 'Community', href: '#community' }, { title: 'Partner', href: '#entra-nella-guida' }]
const ready = ref(false)
onMounted(() => { ready.value = true })
const view = ref('Lista')
const category = ref('Tutte')
const visibleCount = ref(6)
const demoEvents: DemoEvent[] = [...events,
  { ...events[0]!, id: 'dicembre-tavola', coordinates: [45.55, 10.24], title: 'Un posto anche per te.', date: '4 dicembre 2026 · ore 20:00', startsAt: '2026-12-04T20:00:00+01:00' },
  { ...events[1]!, id: 'dicembre-calice', coordinates: [45.62, 10.03], title: 'Un brindisi d’inverno.', date: '10 dicembre 2026 · ore 18:30', startsAt: '2026-12-10T18:30:00+01:00' },
  { ...events[2]!, id: 'dicembre-pausa', coordinates: [45.58, 10.57], title: 'Il tempo per noi.', date: '13 dicembre 2026 · ore 10:00', startsAt: '2026-12-13T10:00:00+01:00' },
]
watch(category, () => { visibleCount.value = 6 })
const categories = ['Tutte', ...new Set(demoEvents.map(event => event.category))]
const filtered = computed(() => demoEvents.filter(event => category.value === 'Tutte' || event.category === category.value))
const dialog = ref<HTMLDialogElement>()
const selected = ref(events[0]!)
function openEvent(event: DemoEvent) { selected.value = event; dialog.value?.showModal() }
const month = ref(new Date(2026, 10, 1))
const monthLabel = computed(() => new Intl.DateTimeFormat('it-IT', { month: 'long', year: 'numeric' }).format(month.value))
const monthKey = computed(() => `${month.value.getFullYear()}-${String(month.value.getMonth() + 1).padStart(2, '0')}`)
const calendarDays = computed(() => {
  const offset = (month.value.getDay() + 6) % 7
  const count = new Date(month.value.getFullYear(), month.value.getMonth() + 1, 0).getDate()
  return Array.from({ length: Math.ceil((offset + count) / 7) * 7 }, (_, index) => index >= offset && index < offset + count ? index - offset + 1 : null)
})
const scheduled = computed(() => filtered.value.filter(event => event.startsAt?.startsWith(monthKey.value)))
function changeMonth(amount: number) { month.value = new Date(month.value.getFullYear(), month.value.getMonth() + amount, 1) }
function onDay(day: number) { return scheduled.value.filter(event => Number(event.startsAt?.slice(8, 10)) === day) }
const question = ref('')
const answer = ref('')
function ask(value = question.value) {
  question.value = value.trim()
  if (!question.value) return
  // shortcut: conversazione locale del prototipo; collegare i contenuti approvati al servizio AI nella fase CMS.
  answer.value = /event|cena|tavola|incontr/i.test(question.value)
    ? 'Per una serata da condividere, partirei da «Ci vediamo a tavola», il 7 novembre a Brescia. Una bella occasione per conoscersi, con calma. Ti va di dare un’occhiata alle esperienze?'
    : 'Che bello lasciarsi un po’ di spazio per scoprire. Tra «Il lusso di una pausa» e «Un’altra prospettiva» puoi scegliere il ritmo che ti somiglia di più. Hai voglia di rallentare o di camminare all’aria aperta?'
}
const year = new Date().getFullYear()
</script>

<template>
  <div class="d2 demo-mix">
    <header class="d2-header d2-shell" @keydown.esc="menuOpen = false; menuButton?.focus()">
      <a href="#copertina" class="d2-logo" aria-label="Da Vivere con Giulia, inizio"><img src="/images/logo.png" width="1642" height="660" alt="Da Vivere! con Giulia"></a>
      <button ref="menuButton" class="d2-menu" :disabled="!ready" :aria-expanded="menuOpen" aria-controls="mobile-navigation" @click="openMobileMenu">Menu <span class="demo-menu-icon" aria-hidden="true"><i></i><i></i></span></button>
      <nav id="d2-navigation" aria-label="Navigazione principale"><a v-for="(item, index) in nav" :key="item.href" :href="item.href" @click="menuOpen = false"><span>0{{ index + 1 }}</span>{{ item.title }}</a></nav>
      <button class="d2-button demo-contact-button" type="button" disabled>Facciamo conoscenza <span aria-hidden="true">↗</span></button>
    </header>

    <dialog ref="mobileMenuDialog" class="demo-mobile-menu" aria-label="Menu principale" @close="menuOpen = false">
      <div class="demo-mobile-menu-top"><a class="demo-menu-logo" href="#copertina" @click="mobileMenuDialog?.close()"><img src="/images/logo.png" width="1642" height="660" alt="Da Vivere! con Giulia"></a><button class="demo-menu-close" type="button" @click="mobileMenuDialog?.close()">Chiudi <span aria-hidden="true">×</span></button></div>
      <nav id="mobile-navigation" aria-label="Navigazione mobile"><a v-for="(item, index) in nav" :key="item.href" :href="item.href" @click="mobileMenuDialog?.close()"><span class="demo-menu-number">0{{ index + 1 }}</span><span>{{ item.title }}</span><span aria-hidden="true">↗</span></a></nav>
      <div class="demo-menu-bottom"><p>Luoghi, incontri e cose belle.<br>Da vivere, con Giulia.</p><button class="d2-button" type="button" disabled>Facciamo conoscenza <span aria-hidden="true">↗</span></button></div>
    </dialog>
    <main id="contenuto">
      <DemoCover />

      <div class="demo-events-background"><section id="esperienze" class="d2-experiences d2-shell" aria-labelledby="d2-events-title">
        <div class="d2-section-index"><span>01 / Incontriamoci</span><span>Occasioni per dire: ci sono.</span></div>
        <div class="d2-section-heading"><h2 id="d2-events-title">Da segnare.<br><em>Da vivere.</em></h2><p>A volte basta <strong>un invito</strong>.<br>Una tavola, un panorama,<br>una bella ragione per uscire.</p></div>
        <div class="d2-event-tools"><div role="group" aria-label="Visualizzazione eventi"><button v-for="option in ['Lista', 'Mappa', 'Calendario']" :key="option" :aria-pressed="view === option" @click="view = option">{{ option }}</button></div><label><span class="sr-only demo-filter-label">Tipo di esperienza</span><select v-model="category"><option v-for="option in categories" :key="option" :value="option">{{ option === 'Tutte' ? 'Tutte le esperienze' : option }}</option></select></label></div>
        <div v-if="view === 'Lista'" id="d2-event-list" class="d2-event-grid"><article v-for="(event, index) in filtered.slice(0, visibleCount)" :key="event.id" class="d2-event"><button class="d2-event-photo" :aria-label="`Scopri ${event.title}`" @click="openEvent(event)"><NuxtImg :src="event.image" :alt="event.alt" width="720" height="900" sizes="100vw sm:50vw lg:33vw" format="webp" loading="lazy" /><span class="d2-event-number">0{{ index + 1 }}</span><span class="d2-event-photo-arrow" aria-hidden="true">↗</span></button><div class="d2-event-copy"><p>{{ event.category }}</p><h3><button @click="openEvent(event)">{{ event.title }}</button></h3><span>{{ event.location }} / {{ event.date }}</span></div></article><div v-if="visibleCount < filtered.length" class="d2-events-more"><button class="d2-button" :disabled="!ready" aria-controls="d2-event-list" @click="visibleCount += 6">Mostra di più <span aria-hidden="true">+</span></button></div></div>
        <HomeEventMap v-else-if="view === 'Mappa'" :events="filtered" @open="openEvent" />
        <div v-else class="d2-calendar"><div class="d2-calendar-top"><h3>{{ monthLabel }}</h3><div><button aria-label="Mese precedente" @click="changeMonth(-1)">←</button><button aria-label="Mese successivo" @click="changeMonth(1)">→</button></div></div><table :aria-label="`Calendario eventi: ${monthLabel}`"><thead><tr><th v-for="day in ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']" :key="day">{{ day }}</th></tr></thead><tbody><tr v-for="week in calendarDays.length / 7" :key="week"><td v-for="(day, index) in calendarDays.slice((week - 1) * 7, week * 7)" :key="index" :class="{ 'has-events': day && onDay(day).length > 0 }"><template v-if="day"><span>{{ day }}</span><button v-for="event in onDay(day)" :key="event.id" :aria-label="event.title" @click="openEvent(event)"><span>{{ event.title }}</span><i aria-hidden="true">●</i></button></template></td></tr></tbody></table><div class="d2-calendar-agenda"><h3>Le esperienze del mese</h3><p v-if="!scheduled.length" class="d2-calendar-empty">Nessun evento in programma per questo mese.</p><button v-for="event in scheduled" :key="event.id" @click="openEvent(event)"><strong>{{ event.startsAt?.slice(8, 10) }}</strong><span>{{ event.title }}<small>{{ event.location }} · {{ event.date }}</small></span><span aria-hidden="true">↗</span></button></div></div>
      </section>

      </div><section id="con-giulia" class="d2-chat-section d2-shell" aria-labelledby="d2-chat-title"><div class="d2-section-index"><span>02 / Due chiacchiere</span><span>Giulia Chat</span></div><div class="d2-chat-layout"><div><p class="d2-kicker">Ogni scoperta comincia così.</p><h2 id="d2-chat-title">E se<br><em>ti dicessi…</em></h2><p class="d2-chat-intro">Dimmi che cosa ti va.<br>Ti accompagno tra <strong>luoghi, idee</strong><br>e <strong>nuove possibilità</strong>.</p><figure class="d2-chat-photo"><NuxtImg src="/images/panorama.jpg" alt="Una pausa tra le montagne" width="540" height="680" sizes="100vw md:30vw" format="webp" loading="lazy" /><figcaption>Cambiare prospettiva, ogni tanto.</figcaption></figure></div><div class="d2-conversation"><span class="d2-chat-mark" aria-hidden="true">g.</span><p class="d2-kicker">Giulia Chat</p><h3>Ciao, che bello<br>trovarti qui.</h3><p>Che cosa ti va di scoprire oggi?</p><div class="d2-chat-prompts"><button @click="ask('Una cena da condividere')">Una cena da condividere <span aria-hidden="true">↗</span></button><button @click="ask('Un posto per staccare')">Un posto per staccare <span aria-hidden="true">↗</span></button></div><form @submit.prevent="ask()"><label class="sr-only" for="d2-question">La tua domanda per Giulia Chat</label><input id="d2-question" v-model="question" required maxlength="500" placeholder="Raccontami che cosa ti piacerebbe…"><button type="submit" aria-label="Invia la domanda">↗</button></form><div v-if="answer" class="d2-chat-answer" role="status"><p>{{ answer }}</p><a class="d2-underlink" href="#esperienze">Diamo un’occhiata insieme ↗</a></div></div></div></section>

      <DemoCommunity instagram-embed />
      <DemoPartner />
    </main>
    <footer class="demo-footer">
      <div class="demo-footer-inner">
        <div class="demo-footer-top"><a class="demo-footer-logo" href="#copertina"><img src="/images/logo.png" width="1642" height="660" alt="Da Vivere! con Giulia"></a><p>Le cose belle iniziano<br>con un ciao.</p></div>
        <div class="demo-footer-columns"><nav aria-label="Esplora il sito"><h2>Esplora</h2><a href="#esperienze">Esperienze</a><a href="#con-giulia">Giulia Chat</a><a href="#community">Community</a></nav><div><h2>Restiamo in contatto</h2><a :href="`mailto:${site.email}`">{{ site.email }}</a><a :href="site.instagram" target="_blank" rel="noopener noreferrer">Instagram ↗</a></div><div><h2>Per le attività</h2><a href="#entra-nella-guida">Entra nella guida ↗</a></div></div>
        <div class="demo-footer-bottom"><span>© {{ year }} {{ site.name }}</span><span>Demo</span><a href="#copertina">Torna su ↑</a></div>
      </div>
    </footer>
    <dialog ref="dialog" class="editorial-dialog" aria-labelledby="d2-event-dialog-title" @click="($event.target === dialog) && dialog?.close()"><div class="dialog-body"><button class="dialog-close" aria-label="Chiudi dettagli evento" @click="dialog?.close()">Chiudi ×</button><p class="eyebrow">{{ selected.category }}</p><h2 id="d2-event-dialog-title">{{ selected.title }}</h2><p>{{ selected.detail }}</p><p class="small-note">{{ selected.location }} · {{ selected.date }}</p><button class="text-link" @click="dialog?.close()">Torna alle esperienze ↗</button></div></dialog>
  </div>
</template>

<style scoped src="~/assets/css/demo-two.css"></style>

<style scoped>
.demo-contact-button:disabled { cursor: default; opacity: .65; background: #242020; color: #fff; }
@media (max-width: 767px) { .demo-contact-button { width: 100%; margin-bottom: 16px; } }
.demo-events-background { background: #e6dcd9; color: #242020; padding-block: 48px 56px; margin-top: 48px; }
.demo-events-background .d2-event { color: #242020; background: #fff; align-self: start; }
.demo-events-background .d2-event-copy { padding: 22px 24px 26px; }
.demo-events-background .d2-event-copy h3 button { background: transparent; }
.demo-events-background .d2-section-index, .demo-events-background .d2-event-tools { border-color: #ffffff55; }
.demo-events-background .d2-section-heading > p { color: #51433f; }
.demo-events-background em { color: #80645f; }
.demo-events-background .d2-event-tools button { background: #fff; color: #242020; border: 1px solid #fff; }
.demo-events-background .d2-event-tools button[aria-pressed=true] { background: #fff; color: #242020; border-color: #242020; font-weight: 700; }
.demo-events-background .d2-event-tools select { background: #fff; color: #242020; border-color: #aa9690; color-scheme: light; }
.demo-events-background .d2-events-more .d2-button { background: #fff; color: #242020; border-color: #fff; }
.demo-events-background .d2-events-more .d2-button:hover { background: #e9e5e4; }
.demo-events-background .d2-calendar { background: #fff; color: #242020; padding: 24px; }
.demo-events-background :focus-visible { outline-color: #c3a29b; }
@media (max-width: 767px) { .demo-events-background .d2-calendar { padding: 12px; } }
@media (max-width: 767px) { .demo-events-background { margin-top: 32px; padding-block: 32px 40px; } }
.demo-footer { background: #242020; color: #fff; margin-top: 110px; padding: 60px 0 24px; }
.demo-footer-inner { width: min(1520px, calc(100% - 96px)); margin-inline: auto; }
.demo-footer-top { display: flex; justify-content: space-between; align-items: center; gap: 40px; padding-bottom: 45px; border-bottom: 1px solid #514b49; }
.demo-footer-logo { display: block; width: 230px; }
.demo-footer-logo img { width: 100%; height: auto; }
.demo-footer-top p { font-size: clamp(28px, 3vw, 44px); line-height: 1.15; letter-spacing: -.035em; }
.demo-footer-columns { display: grid; grid-template-columns: 1fr 1.5fr 1fr; gap: 50px; padding-block: 42px; }
.demo-footer-columns > * { display: flex; flex-direction: column; align-items: flex-start; }
.demo-footer-columns h2 { font-size: 16px; font-weight: 500; letter-spacing: 0; color: #c5bab6; margin-bottom: 16px; line-height: 1.5; }
.demo-footer a { min-height: 44px; padding-block: 10px; font-size: 16px; overflow-wrap: anywhere; }
.demo-footer a:hover { text-decoration: underline; text-underline-offset: 5px; }
.demo-footer-bottom { border-top: 1px solid #514b49; display: flex; justify-content: space-between; align-items: center; gap: 20px; padding-top: 18px; font-size: 16px; color: #fff; }
@media (max-width: 767px) { .demo-footer { margin-top: 70px; padding-top: 40px; } .demo-footer-inner { width: calc(100% - 40px); } .demo-footer-top { flex-direction: column; align-items: flex-start; gap: 24px; padding-bottom: 30px; } .demo-footer-logo { width: 190px; } .demo-footer-columns { grid-template-columns: 1fr; gap: 28px; padding-block: 30px; } .demo-footer-bottom { flex-wrap: wrap; gap: 12px 20px; } }
</style>
<style scoped>
.demo-mix { --section-space: 120px; }
.demo-mix > main { display: flex; flex-direction: column; gap: 0; }
.demo-mix > main > .demo-events-background { margin-top: 0; }
.demo-mix > main > .d2-chat-section { margin-top: var(--section-space); }
.demo-mix > main > .demo-events-background { padding-block: 72px; }

.demo-mix > main > :deep(.community), .demo-mix > main > :deep(.guide-proposal) { padding-top: 0; margin-top: var(--section-space); }
.demo-mix > .demo-footer { margin-top: var(--section-space); }
@media (max-width: 767px) { .demo-mix { --section-space: 80px; } .demo-mix > main > .demo-events-background { padding-block: 48px; } }
</style>
<style scoped>
.demo-mobile-menu { border: 0; padding: 24px; margin: 0; width: 100%; max-width: none; height: 100dvh; max-height: none; background: #faf9f9; color: #242020; }
.demo-mobile-menu[open] { display: flex; flex-direction: column; }
.demo-mobile-menu::backdrop { background: #24202066; }
.demo-mobile-menu-top { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding-bottom: 28px; }
.demo-menu-logo { display: block; width: 140px; }
.demo-menu-logo img { height: auto; filter: brightness(0); }
.demo-menu-close { display: inline-flex; align-items: center; gap: 14px; min-height: 48px; padding: 8px; border: 0; background: transparent; font-size: 16px; }
.demo-menu-close span { font-size: 30px; line-height: 1; }
.demo-mobile-menu nav { display: flex; flex-direction: column; margin-top: 28px; }
.demo-mobile-menu nav a { display: grid; grid-template-columns: 28px 1fr 24px; align-items: center; gap: 14px; min-height: 78px; padding-block: 18px; border-bottom: 1px solid #e0d8d5; font-size: clamp(25px, 7vw, 34px); font-weight: 500; letter-spacing: -.025em; }
.demo-mobile-menu nav a:first-child { border-top: 1px solid #e0d8d5; }
.demo-menu-number { font-size: 16px; color: #80645f; letter-spacing: 0; }
.demo-menu-bottom { margin-top: auto; padding-top: 36px; padding-bottom: env(safe-area-inset-bottom, 0px); }
.demo-menu-bottom p { font-size: 17px; color: #66615f; margin-bottom: 24px; }
.demo-menu-bottom button { width: 100%; opacity: .6; }
:global(html:has(.demo-mobile-menu[open])) { overflow: hidden; }
@media (max-width: 767px) {
  .demo-mix .d2-header { min-height: 84px; flex-wrap: nowrap; padding-block: 16px; }
  .demo-mix .d2-header > .demo-contact-button, .demo-mix .d2-header > nav { display: none; }
  .demo-mix .d2-menu { display: inline-flex; align-items: center; gap: 14px; min-height: 48px; padding: 10px 0 10px 16px; }
  .demo-menu-icon { width: 22px; display: grid; gap: 6px; }
  .demo-menu-icon i { display: block; height: 1px; background: currentColor; }
  .demo-mix .d2-section-index { align-items: flex-start; gap: 20px; }
  .demo-mix .d2-section-index > span:last-child { display: none; }
.demo-mix :deep(.section-label) { gap: 16px; line-height: 1.5; }
.demo-mix :deep(.section-label > span:last-child) { display: none; }
  .demo-mix .d2-section-heading > p br { display: none; }
  .demo-mix .d2-event-copy { padding: 20px; }
  .demo-mix .d2-event-tools button { min-height: 48px; }
  .demo-mix .d2-chat-photo { display: none; }
  .demo-mix .d2-chat-layout { margin-top: 30px; gap: 28px; }
  .demo-mix .d2-conversation { padding: 24px 20px; }
  .demo-mix .d2-conversation input { font-size: 16px; }
  .demo-mix .demo-footer-bottom > span:nth-child(2) { display: none; }
}
</style>
<style scoped>
@media (max-width: 767px) {
  .demo-mix { --section-space: 120px; }
  .demo-mix > main > .demo-events-background { padding-block: 80px; }
  .demo-mix .d2-section-heading { margin-top: 40px; margin-bottom: 36px; gap: 28px; }
  .demo-mix .d2-event-tools { gap: 20px; margin-bottom: 32px; padding-bottom: 24px; }
  .demo-mix .d2-event-grid { gap: 40px; }
  .demo-mix .d2-event-copy { padding: 24px 22px 28px; }
  .demo-mix .d2-event-copy > p { margin-bottom: 14px; }
  .demo-mix .d2-event-copy h3 { margin-bottom: 16px; line-height: 1.1; }
  .demo-mix .d2-events-more { margin-top: 0; }
  .demo-mix .d2-chat-layout { margin-top: 48px; gap: 48px; }
  .demo-mix .d2-chat-intro { margin-top: 28px; line-height: 1.65; }
  .demo-mix .d2-conversation { padding: 32px 22px; }
  .demo-mix .d2-chat-prompts { margin-block: 32px; }
  .demo-mix .d2-chat-prompts button { min-height: 60px; padding-block: 20px; }
  .demo-mix :deep(.community-intro) { margin: 48px auto 56px; }
  .demo-mix :deep(.community-intro .eyebrow) { margin-bottom: 24px; }
  .demo-mix :deep(.community-intro h2) { margin-bottom: 28px; line-height: 1.08; }
  .demo-mix :deep(.community-invitation) { margin-top: 28px; }
  .demo-mix :deep(.community-strip) { gap: 36px; }
  .demo-mix :deep(.community-instagram) { padding: 28px 22px; }
  .demo-mix :deep(.community-newsletter) { margin-top: 0; padding: 32px 22px; }
  .demo-mix :deep(.newsletter-form) { margin-top: 32px; }
  .demo-mix :deep(.proposal-layout) { padding-top: 40px; gap: 32px; }
  .demo-mix :deep(.proposal-copy > p) { margin-bottom: 24px; line-height: 1.65; }
  .demo-mix :deep(.proposal-copy .hero-primary) { margin-top: 12px; }
}
</style>
<style scoped>
@media (max-width: 767px) {
  .demo-mix .d2-shell, .demo-mix .demo-footer-inner, .demo-mix :deep(.wrap) { width: calc(100% - 48px); }
}
</style>
<style scoped>
@media (max-width: 767px) {
  .demo-mix .d2-event-tools { gap: 24px; border-bottom: 0; padding-bottom: 0; margin-bottom: 36px; }
  .demo-mix .d2-event-tools > div { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0; width: 100%; padding: 4px; background: #fff; border: 1px solid #c8b6b0; }
  .demo-mix .demo-events-background .d2-event-tools button { min-width: 0; min-height: 52px; padding: 12px 4px; background: transparent; border: 0; border-bottom: 3px solid transparent; color: #66615f; font-weight: 400; }
  .demo-mix .demo-events-background .d2-event-tools button[aria-pressed=true] { background: #f4efed; color: #242020; border-bottom-color: #80645f; font-weight: 700; }
  .demo-mix .d2-event-tools label { display: grid; gap: 10px; width: 100%; }
  .demo-filter-label { position: static; width: auto; height: auto; padding: 0; margin: 0; overflow: visible; clip: auto; white-space: normal; font-size: 16px; color: #51433f; }
  .demo-mix .demo-events-background .d2-event-tools select { min-height: 54px; padding: 14px 36px 14px 16px; width: 100%; border-color: #c8b6b0; font-size: 16px; border-radius: 0; }
}
</style>
<style scoped>
@media (max-width: 767px) {
  .demo-mix > main > * { min-height: 90svh; }
  .demo-mix > main > .d2-chat-section, .demo-mix > main > :deep(.community), .demo-mix > main > :deep(.guide-proposal) { display: flex; flex-direction: column; justify-content: center; }
  .demo-mix .d2-chat-layout { margin-top: 56px; gap: 56px; }
  .demo-mix :deep(.community-intro) { margin-block: 56px 64px; }
  .demo-mix :deep(.community-strip) { gap: 48px; }
  .demo-mix :deep(.proposal-layout) { padding-top: 56px; gap: 48px; }
  .demo-mix .d2-event-grid { gap: 56px; }
  .demo-mix > .demo-footer { min-height: 90svh; }
}
</style>
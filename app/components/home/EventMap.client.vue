<script setup lang="ts">
const publicAsset = usePublicAsset()
import type { DemoEvent } from '~/data/events'
import type { Map, FeatureGroup } from 'leaflet'
import 'leaflet/dist/leaflet.css'

const props = defineProps<{ events: DemoEvent[] }>()
const emit = defineEmits<{ open: [event: DemoEvent] }>()
const container = ref<HTMLDivElement>()
const failed = ref(false)
let map: Map | undefined
let markers: FeatureGroup | undefined
let leaflet: typeof import('leaflet') | undefined
let disposed = false
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function updateMarkers() {
  if (!map || !markers || !leaflet) return
  markers.clearLayers()
  map.closePopup()
  props.events.forEach(event => {
    if (!event.coordinates) return
    const card = document.createElement('div')
    card.className = 'map-event-card'
    const image = document.createElement('img')
    image.src = publicAsset(event.image)
    image.alt = event.alt
    image.width = 240
    image.height = 130
    const title = document.createElement('h3')
    title.textContent = event.title
    const location = document.createElement('p')
    location.textContent = event.location
    const date = document.createElement('p')
    date.textContent = event.date
    const button = document.createElement('button')
    button.type = 'button'
    button.textContent = 'Scopri l’evento ↗'
    button.addEventListener('click', () => emit('open', event))
    card.append(image, title, location, date, button)
    leaflet!.marker(event.coordinates, {
      icon: leaflet!.divIcon({ className: 'event-map-pin', html: '<span aria-hidden="true"></span>', iconSize: [44, 44], iconAnchor: [22, 22], popupAnchor: [0, -22] }),
      title: event.title,
      alt: event.title,
      keyboard: true,
    }).bindPopup(card, { maxWidth: 260, minWidth: 220, className: 'event-map-popup', autoPanPadding: [25, 25] }).addTo(markers!)
  })
  if (markers.getLayers().length) map.fitBounds(markers.getBounds(), { padding: [55, 55], maxZoom: 12, animate: false })
}

onMounted(async () => {
  try {
    leaflet = await import('leaflet')
    if (disposed || !container.value) return
    map = leaflet.map(container.value, { scrollWheelZoom: false, zoomAnimation: !reducedMotion(), fadeAnimation: !reducedMotion() }).setView([45.62, 10.22], 9)
    leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>', maxZoom: 19 }).addTo(map)
    markers = leaflet.featureGroup().addTo(map)
    map.zoomControl.setPosition('topright')
    map.zoomControl.getContainer()?.querySelector('.leaflet-control-zoom-in')?.setAttribute('aria-label', 'Ingrandisci la mappa')
    map.zoomControl.getContainer()?.querySelector('.leaflet-control-zoom-out')?.setAttribute('aria-label', 'Riduci la mappa')
    updateMarkers()
  } catch {
    failed.value = true
  }
})
watch(() => props.events, updateMarkers)
onBeforeUnmount(() => { disposed = true; map?.remove() })
</script>

<template>
  <div class="event-map-explorer">
    <div ref="container" class="event-map-canvas" role="region" aria-label="Mappa interattiva degli eventi" />
    <div v-if="failed" class="map-unavailable"><p>La mappa non è disponibile in questo momento.</p><button v-for="event in events" :key="event.id" class="text-link" @click="emit('open', event)">{{ event.title }} ↗</button></div>
  </div>
</template>

<style>
.event-map-explorer { position: relative; }
.event-map-canvas { width: 100%; height: 560px; border: 1px solid var(--color-line); background: #fff; z-index: 0; font-family: var(--font-sans); }
.event-map-canvas .leaflet-control-zoom a { width: 44px; height: 44px; line-height: 44px; color: var(--color-ink); }
.event-map-pin { display: grid !important; place-items: center; }
.event-map-pin > span { width: 24px; height: 24px; background: var(--color-ink); border: 5px solid white; border-radius: 50%; outline: 1px solid var(--color-accent); transition: background-color .2s; }
.event-map-pin:is(:hover, :focus-visible) > span { background: var(--color-accent); }
.event-map-popup .leaflet-popup-content-wrapper { border-radius: 0; padding: 0; box-shadow: none; border: 1px solid var(--color-line); }
.event-map-popup .leaflet-popup-content { margin: 0; width: 240px !important; font-family: var(--font-sans); }
.map-event-card { padding: 14px; }
.map-event-card img { width: 100%; height: 115px; object-fit: cover; margin-bottom: 15px; }
.map-event-card h3 { font-size: 23px; line-height: 1.1; margin-bottom: 10px; }
.map-event-card p { font-size: 16px; line-height: 1.5; margin: 5px 0; }
.map-event-card button { display: flex; align-items: center; min-height: 46px; margin-top: 12px; font: inherit; font-size: 16px; border: 0; border-bottom: 1px solid var(--color-ink); color: var(--color-ink); background: #fff; padding: 8px 0; }
.event-map-popup a.leaflet-popup-close-button { color: var(--color-ink); background: white; width: 34px; height: 34px; font-size: 24px; line-height: 34px; }
.map-unavailable { padding: 25px; border: 1px solid var(--color-line); }
.map-unavailable .text-link { margin-right: 20px; }
@media (max-width: 767px) { .event-map-canvas { height: 460px; } }
.event-map-popup .leaflet-popup-tip, .event-map-canvas .leaflet-bar { box-shadow: none; }
</style>

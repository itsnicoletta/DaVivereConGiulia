# Da Vivere! con Giulia

Unica demo da presentare a Giulia: homepage editoriale con testi a sinistra, collage fotografico e video locale a destra, eventi con lista/mappa/calendario, Giulia Chat, community, newsletter e proposta per le attività. Footer scuro.

## Avvio

Richiede Node >=22.22.3.

```sh
npm ci
npm run dev
```

La homepage è `/`. `/demo` è un alias della stessa pagina. Le precedenti demo non sono accessibili; le copie locali sono conservate in `archive/previous-demos/`, escluso da Git e dal sito.

## Verifiche

```sh
npm test
npm run typecheck
npm run test:browser
npm run build
```

Per i test browser installare Chromium con `npx playwright install chromium`. Il server di sviluppo viene avviato automaticamente se non presente.

## Limiti del prototipo

- Eventi, date e coordinate sono dimostrativi.
- Giulia Chat usa parole chiave e risposte locali predefinite: non consulta un CMS e non usa un modello generativo.
- La newsletter non registra iscrizioni e mostra un avviso di apertura futura.
- Il pulsante “Facciamo conoscenza” è disabilitato: il form verrà realizzato in seguito.
- Instagram è incorporato dal profilo pubblico; la sua disponibilità dipende dal servizio esterno.
- La proposta per le attività apre un’email precompilata.
- Le pagine sono marcate `noindex, nofollow` per la presentazione.

## Stack e media

Nuxt 4, Vue 3, TypeScript, Tailwind CSS 4, Nuxt Image e Leaflet. Mappe OpenStreetMap con attribuzione. Cabinet Grotesk tramite Fontshare. Fotografie e logo dall’archivio fornito; video Vimeo fornito dall’utente, convertito in WebM con fallback MP4 e senza audio.

I file `.env`, gli output di build, gli strumenti temporanei e l’archivio del vecchio sito sono esclusi dal repository. `.env.example` contiene soltanto la variabile opzionale `NUXT_PUBLIC_SITE_URL`.
export interface DemoEvent {
  id: string
  title: string
  category: string
  location: string
  date: string
  startsAt?: string
  coordinates?: [number, number]
  image: string
  alt: string
  description: string
  detail: string
}
export const events: DemoEvent[] = [
  { id: 'tavola', title: 'Ci vediamo a tavola.', category: 'Sapori & incontri', location: 'Brescia', date: '7 novembre 2026 · ore 20:00', startsAt: '2026-11-07T20:00:00+01:00', coordinates: [45.54, 10.22], image: '/images/tavola.jpg', alt: 'Una lunga tavola illuminata da candele e decorata con fiori', description: 'Una tavola da condividere. Il tempo di conoscersi, un calice alla volta.', detail: 'Una serata attorno a una tavola curata, tra sapori da scoprire e conversazioni che continuano oltre il dessert. Vieni con la curiosità di conoscere qualcuno di nuovo.' },
  { id: 'calice', title: 'Storie in un calice.', category: 'Vino & territorio', location: 'Franciacorta', date: '12 novembre 2026 · ore 18:30', startsAt: '2026-11-12T18:30:00+01:00', coordinates: [45.6, 9.99], image: '/images/cantina.jpg', alt: 'Fotografia di una cantina dall’archivio del sito originale', description: 'Luoghi, persone e piccoli racconti da scoprire con curiosità.', detail: 'Un calice, un territorio e le storie di chi lo vive. Un incontro per avvicinarsi al vino con curiosità, prendendosi il tempo di apprezzarne ogni sfumatura.' },
  { id: 'pausa', title: 'Il lusso di una pausa.', category: 'Luoghi & sensazioni', location: 'Lago di Garda', date: '15 novembre 2026 · ore 10:00', startsAt: '2026-11-15T10:00:00+01:00', coordinates: [45.6, 10.55], image: '/images/relax.jpg', alt: 'Un luogo dedicato al relax dall’archivio fotografico del sito', description: 'Rallentare, cambiare prospettiva. E ritrovare il gusto delle piccole cose.', detail: 'Una giornata per rallentare, respirare e concedersi un po’ di tempo. Il paesaggio fa il resto: basta lasciargli spazio.' },
  { id: 'aperitivo', title: 'Ancora un aperitivo.', category: 'Sapori & incontri', location: 'Brescia', date: '20 novembre 2026 · ore 19:00', startsAt: '2026-11-20T19:00:00+01:00', coordinates: [45.5, 10.27], image: '/images/ristorante.jpg', alt: 'Tavoli apparecchiati sotto le volte di un ristorante', description: 'Il piacere di fermarsi dopo una giornata piena. Due chiacchiere e qualcosa di buono.', detail: 'Lasciamo fuori la fretta e ritroviamoci per un aperitivo. Un momento semplice, con qualcosa di buono da assaggiare e tante cose da raccontarsi.' },
  { id: 'dimora', title: 'Dietro quella porta.', category: 'Luoghi & sensazioni', location: 'Lago d’Iseo', date: '25 novembre 2026 · ore 15:00', startsAt: '2026-11-25T15:00:00+01:00', coordinates: [45.72, 10.07], image: '/images/ospitalita.jpg', alt: 'Interni di una dimora storica dall’archivio fotografico', description: 'Una dimora, i suoi dettagli e il tempo di guardarli davvero. Un pomeriggio fuori dall’ordinario.', detail: 'Ci sono luoghi che invitano a guardare meglio. Un pomeriggio tra stanze, dettagli e piccole storie, con il piacere di scoprire insieme.' },
  { id: 'panorama', title: 'Un’altra prospettiva.', category: 'Natura & scoperte', location: 'Valle Camonica', date: '29 novembre 2026 · ore 09:30', startsAt: '2026-11-29T09:30:00+01:00', coordinates: [45.82, 10.28], image: '/images/panorama.jpg', alt: 'Una pausa su una panchina panoramica tra le montagne', description: 'Una passeggiata, l’aria fresca e un panorama da portare a casa. Con la compagnia giusta.', detail: 'Una passeggiata da vivere con calma, tra aria fresca e panorami aperti. Un’occasione per cambiare prospettiva e condividere il cammino.' },
]

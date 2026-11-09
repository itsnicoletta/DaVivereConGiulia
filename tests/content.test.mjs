import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync, readdirSync } from 'node:fs'

test('la demo selezionata è l’unica pagina disponibile', () => {
  assert.deepEqual(readdirSync('app/pages'), ['index.vue'])
  const page = readFileSync('app/pages/index.vue', 'utf8')
  assert.ok(page.includes("alias: ['/demo']"))
  assert.ok(page.includes('<DemoCover />'))
  assert.ok(page.includes('<DemoCommunity instagram-embed />'))
  assert.ok(page.includes('<DemoPartner />'))
})

test('le immagini e i video della demo sono disponibili localmente', () => {
  const data = ['events', 'site'].map(name => readFileSync(`app/data/${name}.ts`, 'utf8')).join('\n')
  for (const [, asset] of data.matchAll(/'(\/(?:images|videos)\/[^']+)'/g)) assert.ok(existsSync(`public${asset}`), asset)
})
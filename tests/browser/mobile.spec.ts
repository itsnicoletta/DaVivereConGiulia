import { test, expect } from '@playwright/test'

test.use({ isMobile: true, hasTouch: true, deviceScaleFactor: 2 })
for (const width of [320, 360, 390, 430]) {
  test(`menu e percorso mobile a ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 })
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto('/')
    const menu = page.getByRole('button', { name: 'Menu', exact: true })
    await expect(menu).toBeEnabled()
    expect((await page.locator('.margin-video').boundingBox())!.width).toBeGreaterThan(width * .8)
    await expect(page.locator('.cover-index')).not.toBeVisible()
    await expect(page.locator('.cover-main')).not.toBeVisible()
    expect((await page.locator('.cover').boundingBox())!.height).toBeGreaterThanOrEqual(844 * .9 - .1)
    const heroBox = (await page.locator('.cover').boundingBox())!
    const videoBox = (await page.locator('.margin-video').boundingBox())!
    expect(Math.abs(videoBox.height - heroBox.height)).toBeLessThan(1)
    expect((await page.locator('.d2-header').boundingBox())!.height).toBeLessThanOrEqual(100)
    await menu.click()
    const panel = page.getByRole('dialog', { name: 'Menu principale' })
    await expect(panel).toBeVisible()
    await expect(menu).toHaveAttribute('aria-expanded', 'true')
    await expect(panel.getByRole('link')).toHaveCount(5)
    for (const link of await panel.locator('nav a').all()) {
      expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(48)
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await page.screenshot({ path: `test-results/mobile-menu-${width}.png` })
    await panel.getByRole('button', { name: 'Chiudi' }).click()
    await expect(panel).not.toBeVisible()
    await expect(menu).toBeFocused()
    await menu.click()
    await panel.getByRole('link', { name: /Esperienze/ }).click()
    await expect(panel).not.toBeVisible()
    await expect(page).toHaveURL(/#esperienze$/)
    await page.getByRole('button', { name: 'Scopri Ci vediamo a tavola.' }).click()
    await expect(page.getByRole('dialog')).toContainText('Ci vediamo a tavola.')
    await page.getByRole('button', { name: 'Chiudi dettagli evento' }).click()
    await page.getByRole('button', { name: 'Una cena da condividere' }).click()
    await expect(page.locator('.d2-chat-answer')).toBeVisible()
    await page.locator('#newsletter-email').fill('demo@example.com')
    await page.getByRole('button', { name: 'Iscriviti' }).click()
    await expect(page.locator('.newsletter-feedback')).toContainText('Le iscrizioni apriranno presto.')
    await page.evaluate(async () => {
      await document.fonts.ready
      const images = Array.from(document.images)
      images.forEach(image => { image.loading = 'eager' })
      await Promise.all(images.map(image => image.decode().catch(() => {})))
      scrollTo({ top: 0, behavior: 'instant' })
    })
    expect(errors).toEqual([])
    await expect(page.locator('.demo-mix')).toHaveCount(1)
    await page.screenshot({ path: `test-results/mobile-home-${width}.png`, fullPage: true })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  })
}
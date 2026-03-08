import { test, expect } from '@playwright/test';

test.describe('Language Switching (i18n)', () => {
    test.beforeEach(async ({ page }) => {
        // Clear localStorage before each test
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await page.waitForLoadState('domcontentloaded');
    });

    test('page defaults to German', async ({ page }) => {
        await expect(page.locator('h1').first()).toContainText(/Energie der Natur/);
        await expect(page.locator('nav')).toContainText(/Produkte|Vorteile|Technologie/);
    });

    test('switching to English translates hero section', async ({ page }) => {
        // Click EN button
        const enButton = page.locator('button', { hasText: 'EN' }).first();
        await enButton.click();

        // Verify English content
        await expect(page.locator('h1').first()).toContainText(/natural energy/i);
    });

    test('switching back to German works', async ({ page }) => {
        // Switch to EN
        const enButton = page.locator('button', { hasText: 'EN' }).first();
        await enButton.click();
        await expect(page.locator('h1').first()).toContainText(/natural energy/i);

        // Switch back to DE
        const deButton = page.locator('button', { hasText: 'DE' }).first();
        await deButton.click();
        await expect(page.locator('h1').first()).toContainText(/Energie der Natur/);
    });

    test('language preference persists across page reload', async ({ page }) => {
        // Switch to EN
        const enButton = page.locator('button', { hasText: 'EN' }).first();
        await enButton.click();
        await expect(page.locator('h1').first()).toContainText(/natural energy/i);

        // Reload
        await page.reload();
        await page.waitForLoadState('domcontentloaded');

        // Should still be English
        await expect(page.locator('h1').first()).toContainText(/natural energy/i);
    });

    test('footer translates when switching language', async ({ page }) => {
        // Default DE
        await expect(page.locator('footer')).toContainText('Rechtliches');

        // Switch to EN
        const enButton = page.locator('button', { hasText: 'EN' }).first();
        await enButton.click();

        await expect(page.locator('footer')).toContainText('Legal');
    });
});

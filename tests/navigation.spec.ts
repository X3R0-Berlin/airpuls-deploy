import { test, expect } from '@playwright/test';

test.describe('Navigation and Page Rendering', () => {
    test('homepage loads without errors', async ({ page }) => {
        const errors: string[] = [];
        page.on('pageerror', error => errors.push(error.message));

        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');
        await expect(page.locator('h1').first()).toBeVisible();
        expect(errors.length).toBe(0);
    });

    test('products page loads', async ({ page }) => {
        await page.goto('/produkte');
        await page.waitForLoadState('domcontentloaded');
        await expect(page.locator('h1')).toContainText(/Produkte/i);
    });

    test('FAQ page loads', async ({ page }) => {
        await page.goto('/faq');
        await page.waitForLoadState('domcontentloaded');
        await expect(page.locator('h1')).toContainText(/Fragen/i);
    });

    test('contact page loads', async ({ page }) => {
        await page.goto('/kontakt');
        await page.waitForLoadState('domcontentloaded');
        await expect(page.locator('h1')).toContainText(/Kontakt/i);
    });

    test('product detail page loads', async ({ page }) => {
        await page.goto('/product/vitair');
        await page.waitForLoadState('domcontentloaded');
        await expect(page.locator('h1')).toBeVisible();
    });

    test('comparison page loads', async ({ page }) => {
        await page.goto('/vergleich');
        await page.waitForLoadState('domcontentloaded');
        await expect(page.locator('main')).toBeVisible();
    });

    test('partner page loads', async ({ page }) => {
        await page.goto('/partner');
        await page.waitForLoadState('domcontentloaded');
        await expect(page.locator('h1')).toContainText(/Partner|Luft/i);
    });

    test('legal pages load', async ({ page }) => {
        for (const path of ['/impressum', '/datenschutz', '/agb', '/versand', '/widerruf']) {
            await page.goto(path);
            await page.waitForLoadState('domcontentloaded');
            await expect(page.locator('main')).toBeVisible();
        }
    });

    test('404 page shows for unknown routes', async ({ page }) => {
        const response = await page.goto('/this-page-does-not-exist');
        expect(response?.status()).toBe(404);
    });

    test('skip-to-content link exists and targets main', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');

        const skipLink = page.locator('a[href="#main-content"]');
        await expect(skipLink).toBeAttached();

        const mainContent = page.locator('#main-content');
        await expect(mainContent).toBeAttached();
    });
});

import { test, expect } from '@playwright/test';

test.describe('Shop Functionality', () => {
    test('cart panel opens and shows empty state', async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await page.waitForLoadState('domcontentloaded');

        // Open cart
        const cartButton = page.locator('button[aria-label*="Warenkorb"]').first();
        await expect(cartButton).toBeVisible();
        await cartButton.click();

        // Should show empty cart
        await expect(page.locator('text=Warenkorb')).toBeVisible();
    });

    test('cookie banner appears and can be accepted', async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await page.waitForLoadState('domcontentloaded');

        // Wait for banner to appear (1500ms delay)
        const banner = page.locator('text=Cookies');
        await expect(banner).toBeVisible({ timeout: 5000 });

        // Click accept all
        const acceptButton = page.locator('button', { hasText: /akzeptieren|Accept/i }).first();
        await acceptButton.click();

        // Banner should disappear
        await expect(banner).not.toBeVisible();
    });

    test('cookie banner does not reappear after acceptance', async ({ page }) => {
        // First visit: accept cookies
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await page.waitForLoadState('domcontentloaded');

        // Wait for and accept banner
        const acceptButton = page.locator('button', { hasText: /akzeptieren|Accept/i }).first();
        await expect(acceptButton).toBeVisible({ timeout: 5000 });
        await acceptButton.click();

        // Reload
        await page.reload();
        await page.waitForLoadState('domcontentloaded');

        // Wait a bit (banner has 1500ms delay)
        await page.waitForTimeout(2500);

        // Banner should NOT be visible
        const banner = page.locator('text=Cookies');
        await expect(banner).not.toBeVisible();
    });

    test('product page has add-to-cart button', async ({ page }) => {
        await page.goto('/product/vitair');
        await page.waitForLoadState('domcontentloaded');

        // Should have an add-to-cart or buy button
        const addToCartBtn = page.locator('button', { hasText: /Warenkorb|In den|Add to|kaufen|buy/i }).first();
        await expect(addToCartBtn).toBeVisible();
    });
});

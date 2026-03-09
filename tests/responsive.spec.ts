import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
    test('mobile: hamburger menu opens and shows navigation', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 });
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');

        // Desktop nav should be hidden
        const desktopNav = page.locator('ul.hidden.lg\\:flex');
        await expect(desktopNav).not.toBeVisible();

        // Hamburger should be visible
        const hamburger = page.locator('button[aria-label*="Menü"]').first();
        await expect(hamburger).toBeVisible();

        // Open mobile menu
        await hamburger.click();

        // Mobile drawer should show products
        await expect(page.locator('text=Produkte').first()).toBeVisible();
    });

    test('tablet: uses mobile navigation (not desktop)', async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');

        // At 768px (tablet), should show hamburger menu, not desktop nav
        const hamburger = page.locator('button[aria-label*="Menü"]').first();
        await expect(hamburger).toBeVisible();
    });

    test('desktop: shows full navigation with language switcher', async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');

        // Desktop nav should be visible
        await expect(page.locator('text=Produkte').first()).toBeVisible();
        await expect(page.locator('text=Vorteile').first()).toBeVisible();

        // Language switcher should be visible
        const deButton = page.locator('button', { hasText: 'DE' }).first();
        await expect(deButton).toBeVisible();
    });
});

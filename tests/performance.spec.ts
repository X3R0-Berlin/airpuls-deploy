import { test, expect } from '@playwright/test';

test.describe('Performance and Compatibility', () => {
    test('homepage renders dynamic imports without JavaScript errors', async ({ page }) => {
        const errors: string[] = [];

        // Catch uncaught exceptions
        page.on('pageerror', error => errors.push(error.message));

        // Catch console errors (excluding 404s like missing favicons)
        page.on('console', msg => {
            if (msg.type() === 'error' && !msg.text().includes('favicon')) {
                errors.push(msg.text());
            }
        });

        await page.goto('/');

        await page.waitForLoadState('domcontentloaded');

        // Verify core UI is present
        await expect(page.locator('h1').first()).toBeVisible();

        // Verify dynamic Lottie canvas/svg or logo fallback created no errors
        // Instead of querying deep Lottie nodes, we just ensure no JS errors occurred during hydration

        // Output errors if any
        if (errors.length > 0) {
            console.log("Captured JS Errors:", errors);
        }
        expect(errors.length, `Found JavaScript errors during rendering: \n${errors.join('\n')}`).toBe(0);
    });

    test('cart panel dynamically loads without errors', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');

        // Trigger cart lazy load via shopping bag click
        const cartButton = page.locator('button[aria-label="Warenkorb öffnen"]');
        await expect(cartButton).toBeVisible();
        await cartButton.click();

        // The panel should appear (which means the dynamic chunk loaded)
        await expect(page.locator('text=Dein Warenkorb')).toBeVisible();
    });
});

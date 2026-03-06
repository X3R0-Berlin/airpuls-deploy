import { test, expect } from '@playwright/test';

test.describe('Dev Debugging', () => {
    test('catch dev hydration error', async ({ page }) => {
        const errors: string[] = [];

        page.on('pageerror', error => errors.push(error.message));
        page.on('console', msg => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
            }
        });

        await page.goto('http://localhost:3001/');
        await page.waitForLoadState('networkidle');

        console.log("DEV ERRORS:", errors);
        expect(errors.length).toBe(0);
    });
});

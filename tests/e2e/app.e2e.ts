import { test, expect } from '@playwright/test';

test.describe('Inventory Tracker E2E Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000'); // Adjust the URL as needed for your local setup
    });

    test('should display the inventory tracker title', async ({ page }) => {
        const title = await page.locator('h1'); // Assuming there's an <h1> for the title
        await expect(title).toHaveText('Inventory Tracker');
    });

    test('should add a new lot', async ({ page }) => {
        await page.fill('input[name="lotNumber"]', 'LOT123');
        await page.fill('input[name="expirationDate"]', '2023-12-31');
        await page.click('button#add-lot'); // Assuming there's a button with id 'add-lot'
        
        const lotList = await page.locator('.lot-list'); // Assuming there's a container for the lot list
        await expect(lotList).toContainText('LOT123');
    });

    test('should add a new site', async ({ page }) => {
        await page.click('button:text("Add New Site")');
        await page.fill('input[name="siteName"]', 'Site A');
        await page.click('button#add-site');
        
        const siteList = await page.locator('.site-list');
        await expect(siteList).toContainText('Site A');
    });

    test('should show error for invalid lot number', async ({ page }) => {
        await page.fill('input[name="lotNumber"]', ''); // Empty lot number
        await page.click('button#add-lot');
        
        const errorMessage = await page.locator('.error-message'); // Assuming there's a container for error messages
        await expect(errorMessage).toHaveText('Lot number is required');
    });
});
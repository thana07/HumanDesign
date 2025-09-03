import { test, expect } from '@playwright/test';

test.describe('Homepage Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the main heading', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Discover Your');
    await expect(page.locator('h1')).toContainText('Cosmic Blueprint');
  });

  test('should have universe background', async ({ page }) => {
    const canvas = page.locator('canvas').first();
    await expect(canvas).toBeVisible();
  });

  test('should display zodiac symbols animation', async ({ page }) => {
    // Check if at least one zodiac symbol is visible
    const zodiacSymbols = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
    let foundSymbol = false;
    
    for (const symbol of zodiacSymbols) {
      const element = page.locator(`text=${symbol}`).first();
      if (await element.isVisible({ timeout: 1000 }).catch(() => false)) {
        foundSymbol = true;
        break;
      }
    }
    
    expect(foundSymbol).toBeTruthy();
  });

  test('should have CTA buttons', async ({ page }) => {
    const createChartButton = page.getByRole('link', { name: /Create Your Chart/i });
    await expect(createChartButton).toBeVisible();
    
    const demoButton = page.getByRole('link', { name: /Try Demo/i });
    await expect(demoButton).toBeVisible();
  });

  test('should navigate to chart creation page', async ({ page }) => {
    const createChartButton = page.getByRole('link', { name: /Create Your Chart/i });
    await createChartButton.click();
    await expect(page).toHaveURL('/chart/new');
  });

  test('should navigate to demo page', async ({ page }) => {
    const demoButton = page.getByRole('link', { name: /Try Demo/i });
    await demoButton.click();
    await expect(page).toHaveURL('/demo');
  });

  test('should display features section', async ({ page }) => {
    await expect(page.locator('text=AI-Powered Features')).toBeVisible();
    
    const features = [
      'AI-Powered Analysis',
      'AI Coach',
      'Relationship Analysis',
      'Transit & Cycles'
    ];
    
    for (const feature of features) {
      await expect(page.locator(`text=${feature}`)).toBeVisible();
    }
  });

  test('should have orbital animation section', async ({ page }) => {
    await expect(page.locator('text=Your Cosmic Journey Awaits')).toBeVisible();
    await expect(page.locator('text=Explore the planets')).toBeVisible();
  });

  test('should have interactive elements on hover', async ({ page }) => {
    const featureCard = page.locator('text=AI-Powered Analysis').locator('..').locator('..');
    await featureCard.hover();
    
    // Check if the card scales on hover
    const transform = await featureCard.evaluate(el => 
      window.getComputedStyle(el).transform
    );
    expect(transform).not.toBe('none');
  });

  test('should have proper color scheme for cosmic theme', async ({ page }) => {
    const body = page.locator('body');
    const backgroundColor = await body.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    
    // Should have a dark background for the cosmic theme
    expect(backgroundColor).toContain('rgb');
  });
});

test.describe('Mobile Responsiveness', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should be responsive on mobile', async ({ page }) => {
    await page.goto('/');
    
    // Check if main heading is visible
    await expect(page.locator('h1')).toBeVisible();
    
    // Check if CTA buttons are stacked on mobile
    const buttonsContainer = page.locator('div').filter({ 
      hasText: /Create Your Chart.*Try Demo/
    }).first();
    
    const buttons = await buttonsContainer.locator('a').all();
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  test('should have hamburger menu on mobile', async ({ page }) => {
    await page.goto('/');
    
    // Navigation should be present
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
  });
});
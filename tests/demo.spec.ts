import { test, expect } from '@playwright/test';

test.describe('Demo Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo');
  });

  test('should display demo page heading', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Human Design Demo');
  });

  test('should display Einstein chart by default', async ({ page }) => {
    await expect(page.locator('h2').first()).toContainText('Albert Einstein');
    await expect(page.locator('text=March 14, 1879')).toBeVisible();
    await expect(page.locator('text=11:30 AM')).toBeVisible();
    await expect(page.locator('text=Ulm, Germany')).toBeVisible();
  });

  test('should display bodygraph canvas', async ({ page }) => {
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
    
    // Check if canvas has proper dimensions
    const dimensions = await canvas.boundingBox();
    expect(dimensions?.width).toBeGreaterThan(0);
    expect(dimensions?.height).toBeGreaterThan(0);
  });

  test('should display chart details panel', async ({ page }) => {
    await expect(page.locator('text=Chart Details')).toBeVisible();
    await expect(page.locator('text=Type')).toBeVisible();
    await expect(page.locator('text=Manifestor')).toBeVisible();
    await expect(page.locator('text=Authority')).toBeVisible();
    await expect(page.locator('text=Strategy')).toBeVisible();
    await expect(page.locator('text=Profile')).toBeVisible();
    await expect(page.locator('text=5/1')).toBeVisible();
  });

  test('should have randomize button functionality', async ({ page }) => {
    const randomizeButton = page.locator('button:has-text("Randomize")');
    await expect(randomizeButton).toBeVisible();
    
    // Get initial type
    const initialType = await page.locator('text=Manifestor').first().textContent();
    
    // Click randomize
    await randomizeButton.click();
    
    // Type might change (or might randomly be the same)
    // We just check that the button is clickable and doesn't cause errors
    await expect(page.locator('h2').first()).toContainText('Albert Einstein');
  });

  test('should display celebrity charts section', async ({ page }) => {
    await expect(page.locator('text=Celebrity Charts')).toBeVisible();
    
    const celebrities = [
      'Albert Einstein',
      'Marie Curie',
      'Steve Jobs',
      'Oprah Winfrey',
      'Leonardo da Vinci'
    ];
    
    for (const celebrity of celebrities) {
      await expect(page.locator(`button:has-text("${celebrity}")`)).toBeVisible();
    }
  });

  test('should switch between celebrity charts', async ({ page }) => {
    const marieButton = page.locator('button:has-text("Marie Curie")');
    await marieButton.click();
    
    // Chart name should update
    await expect(page.locator('h2').first()).toContainText('Marie Curie');
    await expect(page.locator('text=Projector')).toBeVisible();
    await expect(page.locator('text=3/5')).toBeVisible();
  });

  test('should highlight selected celebrity', async ({ page }) => {
    const steveButton = page.locator('button:has-text("Steve Jobs")');
    await steveButton.click();
    
    // Check if button has active styling
    const backgroundColor = await steveButton.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    
    // Active button should have primary color background
    expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
  });

  test('should have CTA section', async ({ page }) => {
    await expect(page.locator('text=Ready for Your Chart?')).toBeVisible();
    await expect(page.locator('text=Create your personalized Human Design chart')).toBeVisible();
    
    const ctaButton = page.locator('button:has-text("Create My Chart")');
    await expect(ctaButton).toBeVisible();
  });

  test('should navigate to chart creation from CTA', async ({ page }) => {
    const ctaButton = page.locator('button:has-text("Create My Chart")');
    await ctaButton.click();
    await expect(page).toHaveURL('/chart/new');
  });
});

test.describe('Demo Page Interactive Elements', () => {
  test('should have interactive chart elements', async ({ page }) => {
    await page.goto('/demo');
    
    // Try to interact with the canvas
    const canvas = page.locator('canvas');
    const box = await canvas.boundingBox();
    
    if (box) {
      // Click on different parts of the canvas
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      
      // Canvas should still be visible after interaction
      await expect(canvas).toBeVisible();
    }
  });

  test('should be responsive on mobile', async ({ page, viewport }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/demo');
    
    // Check if layout adapts
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('canvas')).toBeVisible();
    
    // Celebrity cards should be visible but might be stacked
    await expect(page.locator('text=Celebrity Charts')).toBeVisible();
  });
});
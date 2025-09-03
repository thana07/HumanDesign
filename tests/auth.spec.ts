import { test, expect } from '@playwright/test';

test.describe('Authentication Tests', () => {
  test.describe('Sign Up Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/auth/signup');
    });

    test('should display sign up form', async ({ page }) => {
      await expect(page.locator('h1')).toContainText('Create Account');
      await expect(page.locator('input[type="text"]')).toBeVisible();
      await expect(page.locator('input[type="email"]')).toBeVisible();
      await expect(page.locator('input[type="password"]')).toHaveCount(2);
    });

    test('should show validation errors for empty form', async ({ page }) => {
      const submitButton = page.locator('button[type="submit"]');
      await submitButton.click();
      
      // HTML5 validation should prevent submission
      const emailInput = page.locator('input[type="email"]');
      const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
      expect(isInvalid).toBeTruthy();
    });

    test('should show error for mismatched passwords', async ({ page }) => {
      await page.fill('input[placeholder="Your name"]', 'Test User');
      await page.fill('input[type="email"]', 'test@example.com');
      await page.fill('input[placeholder="Create a password"]', 'password123');
      await page.fill('input[placeholder="Confirm your password"]', 'password456');
      
      await page.locator('button[type="submit"]').click();
      
      // Should show error toast
      await expect(page.locator('text=Passwords do not match')).toBeVisible();
    });

    test('should successfully create account', async ({ page }) => {
      await page.fill('input[placeholder="Your name"]', 'Test User');
      await page.fill('input[type="email"]', 'test@example.com');
      await page.fill('input[placeholder="Create a password"]', 'password123');
      await page.fill('input[placeholder="Confirm your password"]', 'password123');
      
      await page.locator('button[type="submit"]').click();
      
      // Should show success message and redirect
      await expect(page.locator('text=Account created successfully')).toBeVisible();
      await page.waitForURL('/chart/new', { timeout: 3000 });
    });

    test('should navigate to login page', async ({ page }) => {
      const loginLink = page.locator('a[href="/auth/login"]');
      await loginLink.click();
      await expect(page).toHaveURL('/auth/login');
    });
  });

  test.describe('Login Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/auth/login');
    });

    test('should display login form', async ({ page }) => {
      await expect(page.locator('h1')).toContainText('Welcome Back');
      await expect(page.locator('input[type="email"]')).toBeVisible();
      await expect(page.locator('input[type="password"]')).toBeVisible();
    });

    test('should have remember me checkbox', async ({ page }) => {
      const checkbox = page.locator('input[type="checkbox"]');
      await expect(checkbox).toBeVisible();
      await checkbox.check();
      expect(await checkbox.isChecked()).toBeTruthy();
    });

    test('should have social login buttons', async ({ page }) => {
      await expect(page.locator('button:has-text("Google")')).toBeVisible();
      await expect(page.locator('button:has-text("GitHub")')).toBeVisible();
    });

    test('should successfully login', async ({ page }) => {
      await page.fill('input[type="email"]', 'test@example.com');
      await page.fill('input[type="password"]', 'password123');
      
      await page.locator('button[type="submit"]').click();
      
      // Should show success message and redirect
      await expect(page.locator('text=Welcome back!')).toBeVisible();
      await page.waitForURL('/chart/new', { timeout: 3000 });
    });

    test('should navigate to signup page', async ({ page }) => {
      const signupLink = page.locator('a[href="/auth/signup"]');
      await signupLink.click();
      await expect(page).toHaveURL('/auth/signup');
    });

    test('should have forgot password link', async ({ page }) => {
      const forgotLink = page.locator('a[href="/auth/reset-password"]');
      await expect(forgotLink).toBeVisible();
      await expect(forgotLink).toContainText('Forgot password?');
    });
  });
});
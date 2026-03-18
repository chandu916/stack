const { test, expect } = require('@playwright/test');

test.describe('Stack Overflow clone smoke/regression', () => {
  const userData = {
    name: `e2euser${Date.now()}`,
    email: `e2euser${Date.now()}@example.com`,
    password: 'E2ePass123!'
  };

  test('1. default dark mode and theme toggle persistence', async ({ page }) => {
    await page.goto('/');

    const body = await page.locator('body');
    await expect(body).toHaveClass(/dark-theme/);

    await page.goto('/Auth');
    await page.locator('button.handle-switch-btn').click(); // to sign-up mode
    await page.fill('[id="name"]', userData.name);
    await page.fill('[id="email"]', userData.email);
    await page.fill('[id="password"]', userData.password);
    await page.click('button[type="submit"]');

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const currentURL = page.url();
    const authError = await page.locator('.auth-error');
    if (await authError.isVisible()) {
      throw new Error('Auth request failed: ' + (await authError.textContent()));
    }

    await expect(currentURL).toBe('http://localhost:3000/');

    const navAvatar = page.locator('.navbar-2 a, .navbar-2 button').first();
    await expect(navAvatar).toBeVisible();

    await page.click(`a[href^='/Users/']`);

    const themeBtn = page.locator('button', { hasText: 'Theme:' });
    await expect(themeBtn).toBeVisible();

    await themeBtn.click();

    const selectedTheme = await page.evaluate(() => localStorage.getItem('site-theme'));
    expect(['dark', 'light']).toContain(selectedTheme);

    const updatedIsDark = selectedTheme === 'dark';
    await expect(page.locator('body')).toHaveClass(updatedIsDark ? /dark-theme/ : /light-theme/);

    await page.reload();
    await expect(page.locator('body')).toHaveClass(updatedIsDark ? /dark-theme/ : /light-theme/);
  });

  test('2. login should work for existing user and profile section is visible', async ({ page }) => {
    await page.goto('/Auth');
    await page.fill('[id="email"]', userData.email);
    await page.fill('[id="password"]', userData.password);
    await page.click('button[type="submit"]');

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const currentURL = page.url();
    const authError = await page.locator('.auth-error');
    if (await authError.isVisible()) {
      throw new Error('Auth request failed: ' + (await authError.textContent()));
    }

    await expect(currentURL).toBe('http://localhost:3000/');

    await page.click(`a[href^='/Users/']`);

    await expect(page.locator('h1')).toBeVisible();
    const editProfileBtn = page.locator('button', { hasText: 'Edit Profile' });
    await expect(editProfileBtn).toBeVisible();
  });

  test('3. profile edit should save user data and refresh', async ({ page }) => {
    await page.goto('/Auth');
    await page.fill('[id="email"]', userData.email);
    await page.fill('[id="password"]', userData.password);
    await page.click('button[type="submit"]');

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const currentURL = page.url();
    const authError = await page.locator('.auth-error');
    if (await authError.isVisible()) {
      throw new Error('Auth request failed: ' + (await authError.textContent()));
    }

    await expect(currentURL).toBe('http://localhost:3000/');

    await page.click(`a[href^='/Users/']`);
    
    const editProfile = page.locator('button', { hasText: 'Edit Profile' });
    await expect(editProfile).toBeVisible({ timeout: 15000 });
    await editProfile.click();

    const newName = `${userData.name}-changed`;
    await page.fill('input[type="text"]', newName);
    await page.click('button[type="submit"]');

    await page.waitForTimeout(1000);
    await expect(page.locator('.user-name h1')).toHaveText(newName);
  });
});

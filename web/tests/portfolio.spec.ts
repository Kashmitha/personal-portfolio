import { test, expect } from '@playwright/test';

test('folder cover, role shortcuts and project details work', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'Portfolio — Kashmitha Madushan', exact: true }),
  ).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator('.game-cover-photo img')
        .evaluate((image: HTMLImageElement) => image.naturalWidth),
    )
    .toBeGreaterThan(0);
  await page.getByRole('button', { name: 'Open Unity & Games, 2 projects' }).click();
  await expect(page.locator('.ftp-card')).toHaveCount(2);
  await page
    .getByRole('button', { name: 'Meteor Blast · Unity game, GITHUB. Open details' })
    .click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(page.locator('main')).toHaveAttribute('inert', '');
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('link', { name: 'Source code' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(dialog.getByRole('button', { name: 'Close details' })).toBeFocused();
  await expect(dialog.getByRole('link', { name: 'Source code' })).toHaveAttribute(
    'href',
    'https://github.com/Kashmitha/Meteor-Blast',
  );
  await page.keyboard.press('ArrowRight');
  await expect(dialog.getByRole('heading')).toHaveText('2D game · Unity experiments');
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Meteor Blast · Unity game, GITHUB. Open details' }),
  ).toBeFocused();
});

test('category tabs support keyboard filtering and theme persists', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Switch to light theme' }).click();
  await expect(page.locator('.ftp-root')).toHaveAttribute('data-theme', 'light');
  await page.reload();
  await expect(page.locator('.ftp-root')).toHaveAttribute('data-theme', 'light');
  const tabs = page.getByRole('tablist', { name: 'Filter work by category' });
  await tabs.getByRole('tab', { name: /^All/ }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(tabs.getByRole('tab', { name: /DevOps & Cloud/ })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await expect(page.locator('.ftp-card')).toHaveCount(2);
  await page.keyboard.press('End');
  await expect(tabs.getByRole('tab', { name: /Unity & Games/ })).toHaveAttribute(
    'aria-selected',
    'true',
  );
});

test('chapter accordions and workflow tabs navigate correctly', async ({ page }) => {
  await page.goto('/');
  const chapter = page.getByRole('button', { name: /The project archive/ });
  await chapter.click();
  await expect(chapter).toHaveAttribute('aria-expanded', 'true');
  await page
    .locator('.ftp-band[data-open="true"]')
    .getByRole('button', { name: 'Open chapter' })
    .click();
  await expect(page.locator('[data-sheet="work"]')).toBeInViewport();
  const workflow = page.getByRole('tablist', { name: 'Process steps' });
  await workflow.getByRole('tab', { name: /03 Automate/ }).click();
  await expect(page.locator('.ftp-step-t')).toContainText('Automate');
  await page.getByRole('button', { name: 'Next step' }).click();
  await expect(page.locator('.ftp-step-t')).toContainText('Observe');
});

test('contact draft is preserved locally without claiming delivery', async ({ page }) => {
  await page.goto('/');
  await page
    .getByRole('textbox', { name: 'Start the conversation.' })
    .fill('Hi Kashmitha, let’s collaborate.');
  await expect(page.getByRole('status')).toContainText('No message is sent');
  await page.reload();
  await expect(page.getByRole('textbox', { name: 'Start the conversation.' })).toHaveValue(
    'Hi Kashmitha, let’s collaborate.',
  );
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
});

test('layout fits mobile and desktop, both themes render', async ({ page, isMobile }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      document
        .getAnimations()
        .filter((animation) => animation.effect?.getTiming().iterations !== Infinity)
        .map((animation) => animation.finished),
    );
  });
  await expect
    .poll(() =>
      page
        .locator('.game-cover-photo img')
        .evaluate((image: HTMLImageElement) => image.naturalWidth),
    )
    .toBeGreaterThan(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({
    path: `test-results/${isMobile ? 'mobile' : 'desktop'}-dark.png`,
    animations: 'disabled',
    fullPage: !isMobile,
  });
  await page.getByRole('button', { name: 'Switch to light theme' }).click();
  await page.screenshot({
    path: `test-results/${isMobile ? 'mobile' : 'desktop'}-light.png`,
    animations: 'disabled',
    fullPage: !isMobile,
  });
  if (isMobile) {
    await page.setViewportSize({ width: 320, height: 740 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await page
      .getByRole('navigation')
      .getByRole('button', { name: 'Contact', exact: true })
      .click();
    await expect(page.locator('[data-sheet="contact"]')).toBeInViewport();
    await page.screenshot({ path: 'test-results/mobile-contact.png', animations: 'disabled' });
  }
  expect(errors).toEqual([]);
});

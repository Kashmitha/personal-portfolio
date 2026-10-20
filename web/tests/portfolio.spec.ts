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

test('contact draft persists and invalid forms do not submit', async ({ page }) => {
  let requests = 0;
  await page.route('https://formspree.io/f/mzedlggg', async (route) => {
    requests++;
    await route.abort();
  });
  await page.goto('/');
  await page
    .getByRole('textbox', { name: 'Message', exact: true })
    .fill('Hi Kashmitha, let’s collaborate.');
  await expect(page.getByRole('status')).toHaveText('Ready when you are.');
  await page.reload();
  await expect(page.getByRole('textbox', { name: 'Message', exact: true })).toHaveValue(
    'Hi Kashmitha, let’s collaborate.',
  );
  await page.getByRole('button', { name: 'Send message', exact: true }).click();
  await expect(page.getByRole('textbox', { name: 'Name', exact: true })).toBeFocused();
  await page.getByRole('textbox', { name: 'Name', exact: true }).fill('Test visitor');
  await page.getByRole('textbox', { name: 'Email', exact: true }).fill('invalid-email');
  await page.getByRole('button', { name: 'Send message', exact: true }).click();
  await expect(page.getByRole('textbox', { name: 'Email', exact: true })).toBeFocused();
  expect(requests).toBe(0);
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
});

test('contact submission sends reply details and clears the draft only after acceptance', async ({
  page,
}) => {
  let requests = 0;
  let payload: unknown;
  let release!: () => void;
  const responseReady = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route('https://formspree.io/f/mzedlggg', async (route) => {
    requests++;
    expect(route.request().method()).toBe('POST');
    expect(route.request().headers().accept).toBe('application/json');
    payload = route.request().postDataJSON();
    await responseReady;
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
  });
  await page.goto('/');
  await page.getByRole('textbox', { name: 'Name', exact: true }).fill('Test visitor');
  await page.getByRole('textbox', { name: 'Email', exact: true }).fill('visitor@example.com');
  await page.getByRole('textbox', { name: 'Message', exact: true }).fill('A project enquiry.');
  await page.getByRole('button', { name: 'Send message', exact: true }).click();
  try {
    await expect(page.getByRole('button', { name: 'Sending…', exact: true })).toBeDisabled();
    await expect.poll(() => requests).toBe(1);
    expect(payload).toEqual({
      name: 'Test visitor',
      email: 'visitor@example.com',
      message: 'A project enquiry.',
    });
    expect(await page.evaluate(() => localStorage.getItem('portfolio-draft'))).toBe(
      'A project enquiry.',
    );
  } finally {
    release();
  }
  await expect(page.getByRole('status')).toContainText('submitted successfully');
  await expect(page.getByRole('textbox', { name: 'Message', exact: true })).toHaveValue('');
  await expect(page.getByRole('textbox', { name: 'Email', exact: true })).toHaveValue('');
  expect(await page.evaluate(() => localStorage.getItem('portfolio-draft'))).toBeNull();
  expect(requests).toBe(1);
});

test('contact rejection and network failure retain the draft for retry', async ({ page }) => {
  let mode: 'rejected' | 'offline' | 'limited' = 'rejected';
  await page.route('https://formspree.io/f/mzedlggg', async (route) => {
    if (mode === 'offline') return route.abort('failed');
    await route.fulfill({
      status: mode === 'limited' ? 429 : 422,
      contentType: 'application/json',
      body: '{"errors":[{"message":"Rejected"}]}',
    });
  });
  await page.goto('/');
  await page.getByRole('textbox', { name: 'Name', exact: true }).fill('Test visitor');
  await page.getByRole('textbox', { name: 'Email', exact: true }).fill('visitor@example.com');
  const message = page.getByRole('textbox', { name: 'Message', exact: true });
  await message.fill('Keep this enquiry.');
  const submit = page.getByRole('button', { name: 'Send message', exact: true });
  await submit.click();
  await expect(page.getByRole('status')).toContainText('could not accept');
  await expect(message).toHaveValue('Keep this enquiry.');
  mode = 'offline';
  await submit.click();
  await expect(page.getByRole('status')).toContainText('Could not confirm submission');
  await expect(message).toHaveValue('Keep this enquiry.');
  mode = 'limited';
  await submit.click();
  await expect(page.getByRole('status')).toContainText('sending limit');
  await expect(submit).toBeEnabled();
  expect(await page.evaluate(() => localStorage.getItem('portfolio-draft'))).toBe(
    'Keep this enquiry.',
  );
  await page.reload();
  await expect(message).toHaveValue('Keep this enquiry.');
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

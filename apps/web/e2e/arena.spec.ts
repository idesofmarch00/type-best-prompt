import { test, expect } from '@playwright/test';

test.describe('Prompt Blitz - Multiplayer Keystroke Arena E2E', () => {
  test('should load the arena screen successfully', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');

    // Verify the page title/header contains CODE RACER
    const headerTitle = page.locator('header h1');
    await expect(headerTitle).toContainText('CODE');
    await expect(headerTitle).toContainText('RACER');

    // Verify the live indicator badge is present
    const liveIndicator = page.getByText('Live', { exact: true });
    await expect(liveIndicator).toBeVisible();

    // Verify F1 Racing progress track exists
    const progressVisualizerHeader = page.getByText('F1 Racing Progress');
    await expect(progressVisualizerHeader).toBeVisible();

    // Verify that the two racers (VoidRunner, OP-PONENT) from our mock init appear on the racing track
    const voidRunnerName = page.locator('text=VoidRunner');
    const opponentName = page.locator('text=OP-PONENT');
    await expect(voidRunnerName).toBeVisible();
    await expect(opponentName).toBeVisible();
  });
});

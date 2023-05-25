import { test, expect } from "@playwright/test";

test.describe("Verify the UI elements of the Technologies page ", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://playwright-app-frontend.vercel.app/");
    await page.locator(".mantine-Button-label").first().click();
    await page.getByText("Technologies").click();
  });

  test("Check the gritting container", async ({ page }) => {
    await expect(page).toHaveScreenshot();
  });
});

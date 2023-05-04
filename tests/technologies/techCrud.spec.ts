import { test, expect } from "@playwright/test";
const newTechName = "TaiaIsTheBest";
// At this momennt the test data for the edit and delete tests from this file should be added manually
// to the app before each execution of the tests
const techToBeDeleted = "tobedeleted";
const techToEdit = "tobeedited";

test.describe("Verify CRUD operations on Technologies page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://playwright-app-frontend.vercel.app/");
    await page.locator(".mantine-Button-label").first().click();
    await page.getByText("Technologies").click();
  });

  test("Check that user is able to add a technology to the table", async ({
    page,
  }) => {
    await page.getByText("Add new technology").click();
    await page.locator(".mantine-Input-input").fill(newTechName);
    await page.getByText("Create").last().click();
    await page.reload();
    const newTechNameCell = await page
      .getByRole("cell", { name: newTechName })
      .last();
    await expect(newTechNameCell).toHaveText(newTechName, { timeout: 30000 });
  });

  test.only("Check that user is able to edit a technology successfuly", async ({
    page,
  }) => {
    await page
      .getByRole("row", { name: techToEdit })
      .last()
      .getByRole("button", { name: "Edit" })
      .click();
    await page.getByLabel("Technology name").fill("editedValue");
    await page.getByRole("button", { name: "Update" }).click();
    await expect(
      await page.getByRole("row", { name: "editedValue" })
    ).toBeTruthy();
  });

  test("Check that user is able to delete a technology from the table", async ({
    page,
  }) => {
    await page
      .getByRole("row", { name: techToBeDeleted })
      .getByRole("button", { name: "Delete" })
      .click();
    const alertText = await page.getByRole("alert").innerText();
    console.log(alertText);
    await expect(await page.getByRole("cell").last().innerText).not.toEqual(
      techToBeDeleted
    );
  });
});

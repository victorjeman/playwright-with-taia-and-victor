import { test, expect} from '@playwright/test'
const newTechName = 'TaiaIsTheBest';
const techToBeDeleted = 'tobedeleted'

test.describe('Verify CRUD operations on Technologies page', () => {
    
  test.beforeEach(async ({page})=>{
    await page.goto('https://playwright-app-frontend.vercel.app/')
    await page.locator('.mantine-Button-label').first().click();
    await page.getByText('Technologies').click();
  })

  test('Check that user is able to add a technology to the table', async ({page}) => {
    
    await page.getByText('Add new technology').click();
    await page.locator('.mantine-Input-input').fill(newTechName);
    await page.getByText('Create').last().click();
    await page. reload()
    const newTechNameCell = await page.getByRole('cell', { name: newTechName }).last()
    await expect(newTechNameCell).toHaveText(newTechName,{ timeout: 30000 })

  })

  test('Check that user is able to delete a technology from the table', async ({page}) => {
    if(await page.getByRole('cell', { name: techToBeDeleted }).last().innerText() == techToBeDeleted) {
      await page.getByText('Delete').last().click()
      await expect(await page.getByRole('cell').last().innerText).not.toEqual(techToBeDeleted)
    } else {
      await expect(0).toEqual(1)
    }

  })
})


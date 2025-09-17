import { test as setup } from '../src/fixtures/authorized';
import { LoginForm } from '../src/pages/LoginForm';
import { DashBoardPage } from '../src/pages/DashBoardPage';
import { expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('Authorize', async ( { dashBoardPage, page }) => {
    await dashBoardPage.visit();
    await dashBoardPage.clickSignInBtn();
    await dashBoardPage.loginForm.isVisible();
    await dashBoardPage.loginForm.fillEmail('lobodaalina99@gmail.com')
    await dashBoardPage.loginForm.fillPassword('123456Test')
    const garagePage = await dashBoardPage.loginForm.clickLoginBtn();
    await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage')
    await page.context().storageState({ path: authFile });
})
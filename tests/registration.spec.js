import { test, expect } from '@playwright/test';
import { DashBoardPage } from '../src/pages/DashBoardPage';
import { RegistrationForm } from '../src/pages/RegistrationForm';
import { GaragePage } from '../src/pages/GaragePage';
import { LoginForm } from '../src/pages/LoginForm';

/** @type {DashBoardPage} */
let dashBoardPage;
/** @type {RegistrationForm} */
let registrationForm;
/** @type {GaragePage} */
let garagePage;
/** @type {LoginForm} */
let loginForm;

test.use({ storageState: { cookies: [], origins: [] } });
test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    await page.addInitScript(() => {
        try { localStorage.clear(); sessionStorage.clear(); } catch { }
    });
});


test.describe('Login tests', () => {

    test.beforeEach(async ({ page }) => {
        dashBoardPage = new DashBoardPage(page);
        await dashBoardPage.visit();
        loginForm = await dashBoardPage.clickSignInBtn();
    });

    test('Can login with valid info', async ({ page }) => {
        await loginForm.fillEmail('lobodaalina99@gmail.com')
        await loginForm.fillPassword('123456Test')
        garagePage = await loginForm.clickLoginBtn();
        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage')
    });
})

test.describe('Registration tests', () => {

    test.beforeEach(async ({ page }) => {
        dashBoardPage = new DashBoardPage(page);
        await dashBoardPage.visit();
        await dashBoardPage.clickSignInBtn();
        registrationForm = await dashBoardPage.clickRegistrationBtn();
        await registrationForm.isVisible();
    });

    test('Can register a user with valid info', async ({ page }) => {
        await registrationForm.fillName("Alina")
        await registrationForm.fillLastName('Loboda')
        await registrationForm.fillEmail('lobodaalina99+aa65@gmail.com')
        await registrationForm.fillPassword('123456Test')
        await registrationForm.fillRepeatPassword('123456Test')
        await registrationForm.verifyRegisterButtonActive()
        garagePage = await registrationForm.clickRegistBtn()
        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage')
    });

    test('Error when the name field is empty', async ({ page }) => {
        await registrationForm.clickNameInput();
        await registrationForm.clickLastNameInput();
        await registrationForm.verifyErrorMessageFor('name', 'Name required');
        await registrationForm.verifyRegisterButtonInactive()
    })


    test('Error when the name field is too long', async ({ page }) => {
        await registrationForm.fillName('fjfjfjfjfjfjfjfjfjfjf');
        await registrationForm.clickLastNameInput();
        await registrationForm.verifyErrorMessageFor('name', 'Name has to be from 2 to 20 characters long');
        await registrationForm.verifyRegisterButtonInactive()
    })

    test('Error when the name field is too short', async ({ page }) => {
        await registrationForm.fillName('f');
        await registrationForm.clickLastNameInput();
        await registrationForm.verifyErrorMessageFor('name', 'Name has to be from 2 to 20 characters long');
        await registrationForm.verifyRegisterButtonInactive()
    })

    test('Error when the last name field is empty', async ({ page }) => {
        await registrationForm.clickLastNameInput();
        await registrationForm.clickNameInput();
        await registrationForm.verifyErrorMessageFor('lastName', 'Last name required');
        await registrationForm.verifyRegisterButtonInactive()
    })

    test('Error when the email is invalid', async ({ page }) => {
        await registrationForm.fillEmail('lobodaalina99gmail.com')
        await registrationForm.clickNameInput();
        await registrationForm.verifyErrorMessageFor('email', 'Email is incorrect');
        await registrationForm.verifyRegisterButtonInactive()
    })

    test('Error when the passwords do not match', async ({ page }) => {
        await registrationForm.fillPassword('123456Test')
        await registrationForm.fillRepeatPassword('1234567Test')
        await registrationForm.clickLastNameInput();
        await registrationForm.verifyErrorMessageFor('repeatPassword', 'Passwords do not match');
        await registrationForm.verifyRegisterButtonInactive()
    })
});
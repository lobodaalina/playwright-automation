import { test, expect } from '@playwright/test';

test.describe('Registration tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        const signinButton = await page.getByRole('button', { name: 'Sign in' }).click();
        await expect(page.locator('#signinEmail')).toBeVisible();
        const registrationButton = await page.getByRole('button', { name: 'Registration' });
        const backdrop = page.locator('.modal-backdrop');
        await expect(backdrop).toHaveClass(/show/)
        await expect(page.getByRole('button', { name: 'Registration' })).toBeVisible()
        await registrationButton.click();
        await expect(page.getByRole('dialog').getByRole('document')).toBeVisible();
    });
    test('Can register a user with valid info', async ({ page }) => {
        const nameInput = await page.locator('input[name="name"]')
        await nameInput.fill('Alina')
        const lastNameInput = await page.locator('input[name="lastName"]')
        await lastNameInput.fill('Loboda')
        const emailInput = await page.locator('#signupEmail')
        await emailInput.fill('lobodaalina99@gmail.com')
        const passwordInput = await page.locator('#signupPassword')
        await passwordInput.fill('123456Test')
        const repeatPasswordInput = await page.locator('input[name="repeatPassword"]')
        await repeatPasswordInput.fill('123456Test')
        const registerButton = await page.getByRole('button', { name: 'Register' })
        await expect(registerButton).toBeEnabled()
    });

    test('Error when the name field is empty', async ({ page }) => {
        const nameInput = await page.locator('input[name="name"]')
        await nameInput.click();
        const lastNameInput = await page.locator('input[name="lastName"]')
        await lastNameInput.click();
        const registerButton = await page.getByRole('button', { name: 'Register' });
        const nameField = await page.locator('div.form-group', {
            has: page.locator('input[formcontrolname="name"]')
        });
        await expect(nameField.locator('.invalid-feedback')).toContainText('Name required');
        await expect(registerButton).toBeDisabled();
        await expect(nameField.locator('.is-invalid')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
    })


    test('Error when the name field is too long', async ({ page }) => {
        const nameInput = await page.locator('input[name="name"]')
        await nameInput.fill('fjfjfjfjfjfjfjfjfjfjf');
        const lastNameInput = await page.locator('input[name="lastName"]')
        await lastNameInput.click();
        const registerButton = await page.getByRole('button', { name: 'Register' });
        const nameField = await page.locator('div.form-group', {
            has: page.locator('input[formcontrolname="name"]')
        });
        await expect(nameField.locator('.invalid-feedback')).toContainText('Name has to be from 2 to 20 characters long');
        await expect(registerButton).toBeDisabled();
        await expect(nameField.locator('.is-invalid')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
    })

    test('Error when the name field is too short', async ({ page }) => {
        const nameInput = await page.locator('input[name="name"]')
        await nameInput.fill('f');
        const lastNameInput = await page.locator('input[name="lastName"]')
        await lastNameInput.click();
        const registerButton = await page.getByRole('button', { name: 'Register' });
        const nameField = await page.locator('div.form-group', {
            has: page.locator('input[formcontrolname="name"]')
        });
        await expect(nameField.locator('.invalid-feedback')).toContainText('Name has to be from 2 to 20 characters long');
        await expect(registerButton).toBeDisabled();
        await expect(nameField.locator('.is-invalid')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
    })

    test('Error when the last name field is empty', async ({ page }) => {
        const lastNameInput = await page.locator('input[name="lastName"]')
        await lastNameInput.click();
        const nameInput = await page.locator('input[name="name"]')
        await nameInput.click();
        const registerButton = await page.getByRole('button', { name: 'Register' });
        const lastNameField = await page.locator('div.form-group', {
            has: page.locator('input[formcontrolname="lastName"]')
        });
        await expect(lastNameField.locator('.invalid-feedback')).toContainText('Last name required');
        await expect(registerButton).toBeDisabled();
        await expect(lastNameField.locator('.is-invalid')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
    })

    test('Error when the email is invalid', async ({ page }) => {
        const emailInput = await page.locator('#signupEmail')
        await emailInput.fill('lobodaalina99gmail.com')
        const lastNameInput = await page.locator('input[name="lastName"]')
        await lastNameInput.click();
        const registerButton = await page.getByRole('button', { name: 'Register' });
        const emailField = await page.locator('div.form-group', {has: page.locator('input[formcontrolname="email"]')})
        ;
        await expect(emailField.locator('.invalid-feedback')).toContainText('Email is incorrect');
        await expect(registerButton).toBeDisabled();
        await expect(emailField.locator('.is-invalid')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
    })

    test('Error when the passwords do not match', async ({ page }) => {
        const passwordInput = await page.locator('#signupPassword')
        await passwordInput.fill('123456Test')
        const repeatPasswordInput = await page.locator('input[name="repeatPassword"]')
        await repeatPasswordInput.fill('123456Test1')
        await passwordInput.click();
        const registerButton = await page.getByRole('button', { name: 'Register' });
        const repeatPasswordField = await page.locator('div.form-group', {has: page.locator('input[formcontrolname="repeatPassword"]')})
        await expect(repeatPasswordField.locator('.invalid-feedback')).toContainText('Passwords do not match');
        await expect(registerButton).toBeDisabled();
        await expect(repeatPasswordField.locator('.is-invalid')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
    })
});
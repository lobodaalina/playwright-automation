import { BaseForm } from "./BaseForm";
import { test, expect } from '@playwright/test';
import { GaragePage } from "./GaragePage";


export class RegistrationForm extends BaseForm {
    constructor(page) {
        super(page, '.modal-title:has-text("Registration")')
        this.nameInput = page.locator('input[name="name"]');
        
        this.lastNameInput = page.locator('input[name="lastName"]')
        this.emailInput = page.locator('#signupEmail')
        this.passwordInput = page.locator('#signupPassword')
        this.repeatPasswordInput = page.locator('input[name="repeatPassword"]')
        this.registrationBtn = this._page.getByRole('button', { name: 'Register' });
    }

    getFieldFor(controlName) {
        return this._page.locator('div.form-group', {
            has: this._page.locator(`input[formcontrolname="${controlName}"]`)
        })
    }

    getBordersFor(controlName) {
        return this.getFieldFor(controlName).locator('.is-invalid')
    }

    getErrorMessageFor(controlName) {
        return this.getFieldFor(controlName).locator('.invalid-feedback')
    }

    async clickNameInput() {
        await this.nameInput.click()
    }

    async clickLastNameInput() {
        await this.lastNameInput.click()
    }

    async fillName(name) {
        await this.nameInput.fill(name)
    }

    async fillLastName(lastName) {
        await this.lastNameInput.fill(lastName)
    }

    async fillEmail(email) {
        await this.emailInput.fill(email)
    }

    async fillPassword(password) {
        await this.passwordInput.fill(password)
    }

    async fillRepeatPassword(repeatPassword) {
        await this.repeatPasswordInput.fill(repeatPassword)
    }

    async verifyRegisterButtonActive() {
        await expect(this.registrationBtn).toBeEnabled()
    }

    async verifyRegisterButtonInactive() {
        await expect(this.registrationBtn).toBeDisabled()
    }

    async verifyErrorMessageFor(controlName, errorText) {
        await expect(this.getErrorMessageFor(controlName)).toContainText(errorText);
        await expect(this.getBordersFor(controlName)).toHaveCSS('border-color', 'rgb(220, 53, 69)')

    }

    async clickRegistBtn() {
            await this.registrationBtn.click();
            return new GaragePage(this._page);
        }
}
import { BasePage } from "./BasePage";
import { test, expect } from '@playwright/test';
import { LoginForm } from "./LoginForm";
import { RegistrationForm } from "./RegistrationForm";

export class GaragePage extends BasePage {
    constructor(page) {
        super(page, 'role=heading[level=1][name=/garage/i]', '/panel/garage'),
        this.addCarBtn = this._page.getByRole('button', { name: 'Add car' });
        this.mileageInput = this._page.locator('#addCarMileage')
        this.addBtn = this._page.getByRole('button', { name: 'Add' });
        this.car = this._page.locator('.car_name').first()
    }

    async clickAddCarBtn() {
                await this.addCarBtn.click();
            }

    async fillCarMileage(miles) {
        await this.mileageInput.fill(miles)
    }

    async clickAddBtn() {
                await this.addBtn.click();
            }

    async checkCarExists() {
        await expect(this.car).toBeVisible();
    }

}
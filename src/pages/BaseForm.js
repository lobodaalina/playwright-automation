import { expect } from "@playwright/test";

export class BaseForm {
    constructor(page, pivotElement) {
        this._page = page;
        this._pivotElement = this._page.locator(pivotElement);
    } 

    async isVisible() {
       await expect(this._pivotElement).toBeVisible();
    }
}
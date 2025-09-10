import { BaseForm } from "./BaseForm";

export class BasePage extends BaseForm {
    constructor(page, pivotElement, url) {
        super(page, pivotElement);
        this._url = url;
    }

    async visit() {
        await this._page.goto(this._url);
        await this.isVisible();
        await this._page.waitForLoadState('networkidle')
    }
}

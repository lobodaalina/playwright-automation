import { BaseForm } from "./BaseForm";
import { GaragePage } from "./GaragePage";

export class LoginForm extends BaseForm {
    constructor(page) {
        super(page, '.modal-title:has-text("Log in")');
        this.emailInput = page.locator('input[name="email"]');
        this.passwordInput = page.locator('#signinPassword')
        this.loginBtn = this._page.getByRole('button', { name: 'Login' });
    }

    async fillEmail(email) {
        await this.emailInput.fill(email)
    }

    async fillPassword(password) {
        await this.passwordInput.fill(password)
    }

    async clickLoginBtn() {
                await this.loginBtn.click();
                return new GaragePage(this._page);
            }

}
import { BasePage } from "./BasePage";
import { LoginForm } from "./LoginForm";
import { RegistrationForm } from "./RegistrationForm";

export class DashBoardPage extends BasePage {
    constructor(page) {
        super(page, 'h1.hero-descriptor_title', '/')
        this.signInBtn = this._page.getByRole('button', { name: 'Sign in' });
        this.registrationBtn = this._page.getByRole('button', { name: 'Registration' });

    }

    async clickSignInBtn() {
        await this.signInBtn.click();
        return new LoginForm(this._page);
    }
    async clickRegistrationBtn() {
        await this.registrationBtn.click();
        return new RegistrationForm(this._page);
    }

}
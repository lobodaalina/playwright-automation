import { BasePage } from "./BasePage";
import { LoginForm } from "./LoginForm";
import { RegistrationForm } from "./RegistrationForm";

export class GaragePage extends BasePage {
    constructor(page) {
        super(page, 'text=Garage', '/panel/garage')
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
import { BaseForm } from "./BaseForm";

export class LoginForm extends BaseForm {
    constructor(page) {
        super(page, '.modal-title:has-text("Log in")')
    }
}
import { FormControl } from "@angular/forms";

export interface RegisterForm {
    full_name: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
}

export interface LoginForm {
    email: FormControl<string>;
    password: FormControl<string>;
}

export interface ForgotPasswordForm {
    email: FormControl<string>;
}
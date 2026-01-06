export interface Account {
    full_name:string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface ChangePassword {
    new_password: string,
    current_password: string
}

export interface Email {
    email: string
}

export interface ResetPassword {
    token: string,
    new_password: string,
    confirm_password: string,
}

export interface MigrateAccount {
    new_email: string,
    password: string
}

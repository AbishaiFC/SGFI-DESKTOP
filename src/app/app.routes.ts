import { Routes } from '@angular/router';
import { Current } from './features/sales/current/current';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { ForgotPassword } from './features/auth/forgot-password/forgot-password';
import { Dashboard } from './features/dashboard/dashboard';
import { Main } from './features/main/main';
import { Inventory } from './features/inventory/inventory/inventory';
import { Reports } from './features/reports/reports/reports';
import { Settings } from './features/settings/settings/settings';
import { Email } from './features/auth/change/email/email';
import { Password } from './features/auth/change/password/password';
import { User } from './features/auth/change/user/user';


export const routes: Routes = [
    { path: '', redirectTo: 'current', pathMatch: 'full'},
    { path: 'current', component: Current },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'forgot-password', component: ForgotPassword },
    { path: 'dashboard', component: Dashboard,
        children: [
            { path: '', component: Main, data: {
                title: 'Página Principal', subtitle: '¡Bienvenido de vuelta!'
            }},
            { path: 'inventory', component: Inventory, data: {
                title: 'Inventario', subtitle: '¡Vamos a mantener tus productos en orden!'
            }},
            { path: 'reports', component: Reports, data: {
                title: 'Ventas', subtitle: '¡Revisa, compara y analiza para seguir creciendo!'
            }},
            { path: 'settings', component: Settings, data: {
                title: 'Cuenta', subtitle: '¡Manten tus datos siempre actualizados!'
            }}
        ]
    },
    { path: 'email', component: Email },
    { path: 'password', component: Password },
    { path: 'user', component: User },
];

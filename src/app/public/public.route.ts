import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SetNewPasswordComponent } from './set-new-password/set-new-password.component';
import { InstallComponent } from './install/install.component';
import { AuthComponent } from './auth/auth.component';

export const PUBLIC_ROUTES: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent

    },
    {
        path: 'set-new-password',
        component: SetNewPasswordComponent

    },
    {
        path: 'install',
        component: InstallComponent
    },
    {
        path: 'auth',
        component: AuthComponent
    },
];


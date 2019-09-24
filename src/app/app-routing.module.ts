import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './services/auth-guard.service';
import { AntiAuthGuardService } from './services/anti-auth-guard.service';
import { PublicComponent } from './public/public.component';
import { SecureComponent } from './secure/secure.component';
import { PUBLIC_ROUTES } from './public/public.route';
import { SECURE_ROUTES } from './secure/secure.route';
import { InstallComponent } from './public/install/install.component';


@NgModule({
    imports: [
        RouterModule.forRoot([

            { path: '', redirectTo: '/install', pathMatch: 'full', },
            { path: 'install',component: InstallComponent },
            { path: '', component: PublicComponent, canActivate: [AntiAuthGuardService], data: { title: 'Public Views' }, children: PUBLIC_ROUTES },
            { path: '', component: SecureComponent, canActivate: [AuthGuard], data: { title: 'Secure Views' }, children: SECURE_ROUTES },
            {
                path: '**',
                redirectTo: 'install'
            },
        ], { scrollPositionRestoration: 'enabled' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
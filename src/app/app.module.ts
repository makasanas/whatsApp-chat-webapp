import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

//services
import { AuthService } from './public/auth/auth.service';
import { BothAuthGuard } from './services/both-auth-guard.service';
import { DashboradService } from './secure/dashboard/dashborad.service';
import { PricingService } from './secure/pricing/pricing.service';
import { AuthGuard } from './services/auth-guard.service';
import { AntiAuthGuardService } from './services/anti-auth-guard.service';
import { ActivePlanService } from './secure/active-plan/active-plan.service';
import { SettingsService } from './secure/settings/settings.service';
import { ProductService } from './secure/product/product.service';
import { SecureService } from './secure/secure.service';
import { FaqsService } from './secure/faqs/faqs.service';


import * as pluginDataLabels from 'chartjs-plugin-datalabels';

//component
import { AppComponent } from './app.component';
import { InstallComponent } from './public/install/install.component';
import { AuthComponent } from './public/auth/auth.component';
import { DashboardComponent } from './secure/dashboard/dashboard.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { PricingComponent } from './secure/pricing/pricing.component';
import { SettingsComponent } from './secure/settings/settings.component';
import { LoadingComponent } from './common/loading/loading.component';
import { ActivePlanComponent } from './secure/active-plan/active-plan.component';
import { ChartsModule } from 'ng2-charts';
import { PublicComponent } from './public/public.component';
import { SecureComponent } from './secure/secure.component';
import { ProductComponent } from './secure/product/product.component';
import { FaqsComponent } from './secure/faqs/faqs.component';
import { ThemeComponent } from './secure/theme/theme.component';
import { HeaderComponent } from './common/header/header.component';
import { NoDataComponent } from './common/no-data/no-data.component';
import { NiceDateFormatPipe } from './common/niceDateFormatPipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {CdkTreeModule} from '@angular/cdk/tree';
import {HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';


let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("825133742036-5aj1qk5sdfni90g5175pma62kssgb52e.apps.googleusercontent.com")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    InstallComponent,
    AuthComponent,
    DashboardComponent,
    SidebarComponent,
    PricingComponent,
    SettingsComponent,
    LoadingComponent,
    ActivePlanComponent,
    PublicComponent,
    SecureComponent,
    ProductComponent,
    FaqsComponent,
    ThemeComponent,
    HeaderComponent,
    NoDataComponent,
    NiceDateFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ChartsModule,
    NgxDatatableModule,
    NgbModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatCheckboxModule,
    MatInputModule,
    CdkTreeModule,
    HttpClientModule,
    MatIconModule
  ],
  providers: [
    AuthService,
    DashboradService,
    AuthGuard,
    AntiAuthGuardService,
    PricingService,
    ActivePlanService,
    SettingsService,
    ProductService,
    SecureService,
    FaqsService,
    BothAuthGuard,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }

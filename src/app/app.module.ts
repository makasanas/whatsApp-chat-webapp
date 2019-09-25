import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { NgxDatatableModule } from '@swimlane/ngx-datatable';

//services
import { AuthService } from './public/auth/auth.service';
import { BothAuthGuard } from './services/both-auth-guard.service';
import { DashboradService } from './dashboard/dashborad.service';
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
import { DashboardComponent } from './dashboard/dashboard.component';
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
    FaqsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ChartsModule,
    NgxDatatableModule,
    NgbModule
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
    BothAuthGuard
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }

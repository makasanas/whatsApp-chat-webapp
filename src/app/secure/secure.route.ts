import { Routes } from '@angular/router';
import { PricingComponent } from './pricing/pricing.component';
import { SettingsComponent } from './settings/settings.component';
import { ActivePlanComponent } from './active-plan/active-plan.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { FaqsComponent } from './faqs/faqs.component';
import { ProductNewComponent } from './product-new/product-new.component';

export const SECURE_ROUTES: Routes = [
    {
        path: 'product',
        component: ProductComponent
    },
    {
        path: 'product-new',
        component: ProductNewComponent
    },
    {
        path: 'pricing',
        component: PricingComponent
    },
    {
        path: 'settings',
        component: SettingsComponent

    },
    {
        path: 'activeplan',
        component: ActivePlanComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'faq',
        component: FaqsComponent
    }
];


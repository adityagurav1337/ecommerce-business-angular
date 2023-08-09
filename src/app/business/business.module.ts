import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessRoutingModule } from './business-routing.module';
import { LandingComponent } from './landing.component';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductcategoriesComponent } from './productcategories/productcategories.component';
import { ProductpicturesComponent } from './productpictures/productpictures.component';
import { ProductsComponent } from './products/products.component';
import { ProductvarietiesComponent } from './productvarieties/productvarieties.component';
import { SlidersComponent } from './sliders/sliders.component';
import { couponsComponent } from './coupons/coupons.component';
import { StatesComponent } from './states/states.component';
import { testimonialsComponent } from './testimonials/testimonials.component';
import { CouponProductsComponent } from './coupon-products/coupon-products.component';

@NgModule({
  declarations: [
    LandingComponent,
    CategoriesComponent,
    DashboardComponent,
    ProductcategoriesComponent,
    ProductpicturesComponent,
    ProductsComponent,
    ProductvarietiesComponent,
    couponsComponent,
    SlidersComponent,
    StatesComponent,
    testimonialsComponent,
    CouponProductsComponent
  ],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    SharedModule,
    NgxPaginationModule,

  ]
})
export class BusinessModule { }

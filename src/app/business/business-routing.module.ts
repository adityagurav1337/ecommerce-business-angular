import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { LandingComponent } from './landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductcategoriesComponent } from './productcategories/productcategories.component';
import { ProductsComponent } from './products/products.component';
import { ProductpicturesComponent } from './productpictures/productpictures.component';
import { ProductvarietiesComponent } from './productvarieties/productvarieties.component';
import { SlidersComponent } from './sliders/sliders.component';
import { couponsComponent } from './coupons/coupons.component';
import { StatesComponent } from './states/states.component';
import { testimonialsComponent } from './testimonials/testimonials.component';
import { CouponProductsComponent } from './coupon-products/coupon-products.component';

const routes: Routes = [
  {
    path: '', component: LandingComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'productcategories', component: ProductcategoriesComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'productpictures/:id', component: ProductpicturesComponent },
      { path: 'productvarieties/:id', component: ProductvarietiesComponent },
      { path: "sliders", component: SlidersComponent },
      { path: "coupons", component: couponsComponent },
      { path: "coupon-products/:couponid", component: CouponProductsComponent },
      { path: "states", component: StatesComponent},
      { path: "testimonials", component: testimonialsComponent},

      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }

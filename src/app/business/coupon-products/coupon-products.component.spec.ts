import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponProductsComponent } from './coupon-products.component';

describe('CouponProductsComponent', () => {
  let component: CouponProductsComponent;
  let fixture: ComponentFixture<CouponProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

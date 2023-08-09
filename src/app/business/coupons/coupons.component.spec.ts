import { ComponentFixture, TestBed } from '@angular/core/testing';

import {couponsComponent } from './coupons.component';

describe('CouponsComponent', () => {
  let component:couponsComponent;
  let fixture: ComponentFixture<couponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ couponsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(couponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

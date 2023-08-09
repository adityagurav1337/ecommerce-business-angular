import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductpicturesComponent } from './productpictures.component';

describe('ProductpicturesComponent', () => {
  let component: ProductpicturesComponent;
  let fixture: ComponentFixture<ProductpicturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductpicturesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductpicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

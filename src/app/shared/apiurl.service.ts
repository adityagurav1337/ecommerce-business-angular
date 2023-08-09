import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlService {

  //Master
  public categories = "business/categories";
  public productcategories = "business/productcategories";
  public products = "business/products";
  public productpictures = "business/productpictures";
  public productvarieties = "business/productvarieties";
  public sliders = "business/sliders";
  public coupons = "business/coupons";
  public states = "business/states"
  public testimonials = "business/testimonials";

  constructor() { }
}

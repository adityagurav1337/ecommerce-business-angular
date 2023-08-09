import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { ApiUrlService } from 'src/app/shared/apiurl.service';

@Component({
  selector: 'app-products',
  templateUrl: './coupon-products.component.html',
  styleUrls: ['./coupon-products.component.css']
})
export class CouponProductsComponent implements OnInit {
  businessid = 0;
  couponid:any;
  coupon:any;
  products:any;

  constructor(public api: ApiService, private apiurl: ApiUrlService,private router:Router, private route:ActivatedRoute) {
    this.couponid = this.route.snapshot.paramMap.get("couponid");
    this.businessid = JSON.parse(localStorage.getItem("user") || "{id:0}").id;

    this.api.get(this.apiurl.coupons + "/" + this.businessid + "/" + this.couponid).subscribe((result:any)=>{
      this.coupon = result.data;
    });
  }
  
  ngOnInit(): void {
    {
     
      this.load();
    }
  }

  load() {
    this.api.get(this.apiurl.coupons + "/products/"  + this.couponid).subscribe((result: any) => {
      this.products = result.data;
     
    })
  }

  addRemoveProduct(event:Event, product:any){
    let ctrl = <HTMLInputElement>event.target;
    if(ctrl.checked){
      this.api.get(this.apiurl.coupons + "/addproduct/"  + this.couponid + "/" + product.id).subscribe((result: any) => {
      })
    }
    else{
      this.api.get(this.apiurl.coupons + "/removeproduct/"  + this.couponid + "/" + product.id).subscribe((result: any) => {
      })
    }
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { ApiUrlService } from 'src/app/shared/apiurl.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productvarieties',
  templateUrl: './productvarieties.component.html',
  styleUrls: ['./productvarieties.component.css']
})
export class ProductvarietiesComponent {
  formdata: any;
  result: any;
  id = 0;
  productid:any = 0;
  productvarieties:any;

  constructor(public api: ApiService, private apiurl: ApiUrlService,private route:ActivatedRoute) {
    this.productid = this.route.snapshot.paramMap.get("id");
    console.log(this.productid);
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.id = 0;
    this.api.get(this.apiurl.productvarieties + "/" + this.productid ).subscribe((result: any) => {
      this.productvarieties = result.data;
      console.log(result);
      
    })

    // this.api.get(this.apiurl.products+ "/"+this.businessid).subscribe((result: any) => {
    //   this.result = result.data;
    // })
    this.formdata = new FormGroup({
      productid: new FormControl(this.productid),
      name: new FormControl("", Validators.compose([Validators.required])),
      mrp: new FormControl("", Validators.compose([Validators.required])),
      price: new FormControl("", Validators.compose([Validators.required])),
    })
  }
  
  submit(data: any) {
    if (this.id == 0) {
      this.api.post(this.apiurl.productvarieties  + "/" + this.productid , data).subscribe((result: any) => {
        console.log(result);
        this.ngOnInit();
        this.api.setMessage({ title: "Success", message: this.api.insert_success_msg, type: "success" });
      })
    }
    else {
      this.api.put(this.apiurl.productvarieties + "/" + this.productid  + "/" + this.id, data).subscribe((result: any) => {
        this.load();
        this.api.setMessage({ title: "Success", message: this.api.update_success_msg, type: "success" });
      })
    }
  }
  
  edit(id: any) {
    this.id = id;
    console.log(this.id);
    
    this.api.get(this.apiurl.productvarieties + "/" + this.productid + "/" + id).subscribe((result: any) => {
      this.formdata.patchValue({  
        name: result.data.name,
        mrp: result.data.mrp,
        price: result.data.price,
      })
    })
  }

  delete(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        this.api.delete(this.apiurl.productvarieties  + "/" + this.productid + "/" + id).subscribe((result: any) => {
          this.load()
          this.api.setMessage({ title: "Success", message: this.api.delete_success_msg, type: "success" });
        })
      }
    })
  }

  cancel() {
    this.load();
  }
}

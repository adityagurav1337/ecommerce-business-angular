import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { ApiUrlService } from 'src/app/shared/apiurl.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class couponsComponent {
  formdata: any;
  result: any;
  id = 0;
  businessid = 0;
  data: any

  constructor(public api: ApiService, private apiurl: ApiUrlService, private router: Router) {
    this.businessid = JSON.parse(localStorage.getItem("user") || "{id:0}").id;
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.id = 0;
    this.api.get(this.apiurl.coupons + "/id" + this.businessid).subscribe((result: any) => {
      this.result = result.data;
    });

    this.formdata = new FormGroup({
      businessid: new FormControl(this.businessid),
      code: new FormControl("", Validators.compose([Validators.required])),
      startdate: new FormControl("", Validators.compose([Validators.required])),
      enddate: new FormControl("", Validators.compose([Validators.required])),
      status: new FormControl("active", Validators.compose([Validators.required])),
      percentage: new FormControl(0, Validators.compose([Validators.required])),
    });
  }

  submit(data: any) {
    if (this.id == 0) {
      this.api.post(this.apiurl.coupons, data).subscribe((result: any) => {
        this.ngOnInit();
        this.api.setMessage({ title: "Success", message: this.api.insert_success_msg, type: "success" });
        this.load();
        
      });
    }
    else {
      this.api.put(this.apiurl.coupons + "/" + this.id, data).subscribe((result: any) => {
        this.api.setMessage({ title: "Success", message: this.api.update_success_msg, type: "success" });
        this.load();
      });
    }
  }

  edit(id: any) {
    this.id = id;
    this.api.get(this.apiurl.coupons + "/" + this.businessid + "/" + id).subscribe((result: any) => {
      this.formdata.patchValue({
        code: result.data.code,
        startdate: result.data.startdate,
        enddate: result.data.enddate,
        status: result.data.status,
        percentage: result.data.percentage
      });
    });
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
        this.api.delete(this.apiurl.coupons + "/" + id).subscribe((result: any) => {
          this.api.setMessage({ title: "Success", message: this.api.delete_success_msg, type: "success" });
          this.load()
        });
      }
    });
  }

  cancel() {
    this.load();
  }
}

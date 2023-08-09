import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { ApiUrlService } from 'src/app/shared/apiurl.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productpictures',
  templateUrl: './productpictures.component.html',
  styleUrls: ['./productpictures.component.css']
})
export class ProductpicturesComponent {
  formdata: any;
  result: any;
  id = 0;
  productid:any = 0;
  productpictures:any;

  constructor(public api: ApiService, private apiurl: ApiUrlService,private route:ActivatedRoute) {
    this.productid = this.route.snapshot.paramMap.get("id");
    console.log(this.productid);
  }
  
  ngOnInit(): void {
    this.load();
  }

  load() {
    this.id = 0;
    this.api.get(this.apiurl.productpictures + "/" + this.productid ).subscribe((result: any) => {
      this.productpictures = result.data;
      console.log(result);
      
    })

    // this.api.get(this.apiurl.products+ "/"+this.businessid).subscribe((result: any) => {
    //   this.result = result.data;
    // })
    this.formdata = new FormGroup({
      productid: new FormControl(this.productid),
      title: new FormControl("", Validators.compose([Validators.required])),
      imagename: new FormControl("")
    })
  }
  
  submit(data: any) {
    if (this.id == 0) {
      this.api.post(this.apiurl.productpictures  + "/" + this.productid , data).subscribe((result: any) => {
        console.log(result);
        this.ngOnInit();
        this.api.setMessage({ title: "Success", message: this.api.insert_success_msg, type: "success" });
      })
    }
    else {
      this.api.put(this.apiurl.productpictures + "/" + this.productid  + "/" + this.id, data).subscribe((result: any) => {
        this.load();
        this.api.setMessage({ title: "Success", message: this.api.update_success_msg, type: "success" });
      })
    }
  }


  edit(id: any) {
    this.id = id;
    console.log(this.id);
    
    this.api.get(this.apiurl.productpictures + "/" + this.productid + "/" + id).subscribe((result: any) => {
      this.formdata.patchValue({  
        title: result.data.title,
        imagename: result.data.imagename
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
        this.api.delete(this.apiurl.productpictures  + "/" + this.productid + "/" + id).subscribe((result: any) => {
          this.load()
          this.api.setMessage({ title: "Success", message: this.api.delete_success_msg, type: "success" });
        })
      }
    })
  }

  cancel() {
    this.load();
  }

  imageChanged(event: any) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result != null) {
        this.formdata.patchValue({
          imagename: reader.result.toString().substring(reader.result.toString().indexOf(",") + 1)
        });
      }
    }
  }
}

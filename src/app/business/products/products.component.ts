import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { ApiUrlService } from 'src/app/shared/apiurl.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  formdata: any;
  result: any; 
  id = 0;
  businessid = 0;
  categories: any;
  products:any;
  productpictures:any;

  constructor(public api: ApiService, private apiurl: ApiUrlService,private router:Router) {
    this.businessid = JSON.parse(localStorage.getItem("user") || "{id:0}").id;
  }

  ngOnInit(): void {
  
    this.api.get(this.apiurl.categories + "/" + this.businessid).subscribe((result: any) => {
      this.categories = result.data;
      
    });
      this.api.get(this.apiurl.products + "/" + this.businessid).subscribe((result: any) => {
        this.products = result.data;
        console.log(result);
      })
    this.load();
  }

  load() {
    this.id = 0;
    this.api.get(this.apiurl.products + "/" + this.businessid).subscribe((result: any) => {
      this.result = result.data; 
    });

    // this.api.get(this.apiurl.productspictures + "/" + this.products.id ).subscribe((result: any) => {
    //   this.productpictures = result.data;
    //   console.log(result);
    // })

    this.formdata = new FormGroup({
      categoryid: new FormControl(0, Validators.compose([Validators.min(1)])),
      businessid: new FormControl(this.businessid),
      name: new FormControl("", Validators.compose([Validators.required])),
      title: new FormControl("", Validators.compose([Validators.required])),
      imagename: new FormControl(""),
      mrp: new FormControl(0, Validators.compose([Validators.required])),
      price: new FormControl(0, Validators.compose([Validators.required])),
      bulletpoint: new FormControl("", Validators.compose([Validators.required])),
      description: new FormControl("", Validators.compose([Validators.required])),
      keywords: new FormControl(""),
      keyworddescription:  new FormControl(""),
      published: new FormControl(""),
    })
  }

  submit(data: any) {
    if (this.id == 0) {
      this.api.post(this.apiurl.products,data).subscribe((result: any) => {
        this.api.setMessage({ title: "Success", message: this.api.insert_success_msg, type: "success" });
        this.load();
      })
    }
    else {
      this.api.put(this.apiurl.products + "/" + this.id, data).subscribe((result: any) => {
        this.api.setMessage({ title: "Success", message: this.api.update_success_msg, type: "success" });
        this.load();
      })
    }
  }

  edit(id: any) {
    this.id = id;
    console.log(this.id);
    this.api.get(this.apiurl.products + "/" + this.businessid + "/" + id).subscribe((result: any) => {
      this.formdata.patchValue({  
        categoryid: result.data.categoryid,
        name: result.data.name,
        title: result.data.title,
        imagename: "",
        mrp: result.data.mrp,
        price: result.data.price,
        bulletpoint: result.data.bulletpoint,
        description: result.data.description,
        keywords: result.data.keywords,
        keyworddescription: result.data.keyworddescription,
        published: result.data.published
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
        this.api.delete(this.apiurl.products + "/" + id).subscribe((result: any) => {
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

  picture(id:any){
    console.log(id);
    this.router.navigate(["/business/productpictures/"+id])
  }
  varieties(id:any){
    console.log(id);
    this.router.navigate(["/business/productvarieties/"+id])
  }
}
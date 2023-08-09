import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { ApiUrlService } from 'src/app/shared/apiurl.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  formdata: any;
  result: any;
  id = 0;
  businessid = 0;

  constructor(public api: ApiService, private apiurl:ApiUrlService) {
    this.businessid = JSON.parse(localStorage.getItem("user") || "{id:0}").id;
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.id = 0;
    this.api.get(this.apiurl.categories + "/" + this.businessid).subscribe((result: any) => {
      this.result = result.data;
    })
    this.formdata = new FormGroup({
      businessid:new FormControl(this.businessid),
      name: new FormControl("", Validators.compose([Validators.required])),
      title: new FormControl("", Validators.compose([Validators.required])),
      image: new FormControl(""),
      srno: new FormControl(1, Validators.compose([Validators.required])),
    })
  }

  edit(id: any) {
    this.id = id;
    this.api.get(this.apiurl.categories + "/" + this.businessid + "/" + id).subscribe((result: any) => {
      this.formdata.patchValue({
        name: result.data.name,
        title: result.data.title,
        srno:result.data.srno
      })
    })
  }

  delete(id: any) {
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.delete(this.apiurl.categories + "/" + id).subscribe((result: any) => {
          this.load()
          this.api.setMessage({ title: "Success", message: this.api.delete_success_msg, type: "success" });
        })
      }
    })
  }

  cancel() {
    this.load();
  }

  submit(data: any) {
    if (this.id == 0) {
      this.api.post(this.apiurl.categories, data).subscribe((result: any) => {
        this.load();
        this.api.setMessage({ title: "Success", message: this.api.insert_success_msg, type: "success" });
      })
    }
    else {
      this.api.put(this.apiurl.categories + "/" + this.id, data).subscribe((result: any) => {
        this.load();
        this.api.setMessage({ title: "Success", message: this.api.update_success_msg, type: "success" });
      })
    }
  }

  imageChanged(event:any){
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=>{
      if(reader.result != null){
        this.formdata.patchValue({
          image: reader.result.toString().substring(reader.result.toString().indexOf(",") + 1)
        });
      }
    }
  }
}
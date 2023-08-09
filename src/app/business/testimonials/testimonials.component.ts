import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { ApiUrlService } from 'src/app/shared/apiurl.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class testimonialsComponent {
  formdata: any;
  result: any;
  id = 0;
  businessid = 0;

  constructor(public api: ApiService, private apiurl: ApiUrlService, private router: Router) {
    this.businessid = JSON.parse(localStorage.getItem("user") || "{id:0}").id;
  }

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.id = 0;
    this.api.get(this.apiurl.testimonials + "/" + this.businessid).subscribe((result: any) => {
      this.result = result.data;
    });

    this.formdata = new FormGroup({
      businessid: new FormControl(this.businessid),
      title: new FormControl("", Validators.compose([Validators.required])),
      imagename: new FormControl(""),
      btntext: new FormControl(""),
      paragraph: new FormControl(""),
      link: new FormControl(""),
      published: new FormControl(true)
    })
  }

  submit(data: any) {
    if (this.id == 0) {
      this.api.post(this.apiurl.testimonials, data).subscribe((result: any) => {
        this.api.setMessage({ title: "Success", message: this.api.insert_success_msg, type: "success" });
        this.load();
      })
    }
    else {
      this.api.put(this.apiurl.testimonials + "/" + this.id, data).subscribe((result: any) => {
        this.api.setMessage({ title: "Success", message: this.api.update_success_msg, type: "success" });
        this.load();
      })
    }
  }


  edit(id: any) {
    this.id = id;
    this.api.get(this.apiurl.testimonials + "/" + this.businessid + "/" + id).subscribe((result: any) => {
      this.formdata.patchValue({
        title: result.data.title,
        btntext: result.data.btntext,
        paragraph: result.data.paragraph,
        link: result.data.link,
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
        this.api.delete(this.apiurl.testimonials + "/" + id).subscribe((result: any) => {
          this.api.setMessage({ title: "Success", message: this.api.delete_success_msg, type: "success" });
          this.load()
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
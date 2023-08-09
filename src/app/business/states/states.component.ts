import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { ApiUrlService } from 'src/app/shared/apiurl.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css']
})
export class StatesComponent {
  formdata: any;
  result: any;
  id = 0;
  businessid = 0;
  categories:any;

  constructor(public api: ApiService, private apiurl:ApiUrlService) {
    this.businessid = JSON.parse(localStorage.getItem("user") || "{id:0}").id;
  }

  ngOnInit(): void {
    this.api.get(this.apiurl.categories+ "/" + this.id).subscribe((result:any)=>{
      this.categories = result.data;
    });
    this.load();
  }

  load() {
    this.id = 0;
    this.api.get(this.apiurl.states + "/" + this.id).subscribe((result: any) => {
      this.result = result.data;
      console.log(this.result);
    });

    this.formdata = new FormGroup({
      id: new FormControl(this.id),
      name: new FormControl(""),
    })
  }

  submit(data: any) {
    if (this.id == 0) {
      this.api.post(this.apiurl.states, data).subscribe((result: any) => {
        this.api.setMessage({ title: "Success", message: this.api.insert_success_msg, type: "success" });
        this.load();
      })
    }
    else {
      this.api.put(this.apiurl.states + "/" + this.id, data).subscribe((result: any) => {
        this.api.setMessage({ title: "Success", message: this.api.update_success_msg, type: "success" });
        this.load();
      })
    }
  }

  edit(id: any) {
    this.id = id;
    this.api.get(this.apiurl.states + "/" + this.id + "/" + id).subscribe((result: any) => {
      this.formdata.patchValue({
        id: result.data.id,
        name: result.data.name,
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
        this.api.delete(this.apiurl.states + "/" + id).subscribe((result: any) => {
          this.api.setMessage({ title: "Success", message: this.api.delete_success_msg, type: "success" });
          this.load()
        })
      }
    })
  }

  cancel() {
    this.load();
  }


}

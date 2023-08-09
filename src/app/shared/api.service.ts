import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Message } from './Message';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  insert_success_msg = "Data Inserted Successfully.";
  delete_success_msg = "Data Deleted Successfully.";
  update_success_msg = "Data Updated Successfully.";
  genders = ["Male", "Female", "Other"];
  bloodgroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  baseurl = "http://localhost:8081/";
  //baseurl = "https://medactonode.abhijitgatade.com/";
  showspinner: BehaviorSubject<boolean>;
  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.showspinner = new BehaviorSubject(false);
  }

  show() {
    this.showspinner.next(true);
  }
  hide() {
    this.showspinner.next(false);
  }

  setMessage(message: Message) {
    if (message.type == "success") {
      this.toastr.success(message.message, message.title);
    }
    else if (message.type == "error") {
      this.toastr.error(message.message, message.title);
    }
  }

  getHeader() {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    });
    return reqHeader;
  }

  get(api: string) {
    console.log(this.baseurl + api);    
    return this.http.get(this.baseurl + api, { headers: this.getHeader() })
  };

  post(api: string, data: any){
    console.log(this.baseurl + api);
    console.log(data);
    return this.http.post(this.baseurl + api, data, { headers: this.getHeader() })
  };

  put(api: string, data: any) {
    return this.http.put(this.baseurl + api, data, { headers: this.getHeader() })
  };

  delete(api: string) {
    return this.http.delete(this.baseurl + api)
  };

  public loadJsFile(url: string) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  public getTodayDate(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm: any = today.getMonth() + 1; // Months start at 0!
    let dd: any = today.getDate();
    if (dd < 10)
      dd = '0' + dd;
    if (mm < 10)
      mm = '0' + mm;
    let formattedToday = dd + '/' + mm + '/' + yyyy;
    return formattedToday;
  }

  public getCurrentTime(): string {
    const today = new Date();
    let hh: any = today.getHours();
    let mm: any = today.getMinutes();
    if (hh < 10)
      hh = '0' + hh;
    if (mm < 10)
      mm = '0' + mm;
    let formattedTime = hh + ':' + mm;
    return formattedTime;
  }

  public getStringDate(date: any): string {
    try {
      let yyyy = date._i.year;
      let mm: any = date._i.month + 1; // Months start at 0!
      let dd: any = date._i.date;
      if (dd < 10)
        dd = '0' + dd;
      if (mm < 10)
        mm = '0' + mm;
      let formattedToday = dd + '/' + mm + '/' + yyyy;
      return formattedToday;
    }
    catch {
      let yyyy = date.getFullYear();
      let mm: any = date.getMonth() + 1; // Months start at 0!
      let dd: any = date.getDate();
      if (dd < 10)
        dd = '0' + dd;
      if (mm < 10)
        mm = '0' + mm;
      let formattedToday = dd + '/' + mm + '/' + yyyy;
      return formattedToday;
    }
  }

  printDiv(divname: string, title:string = "") {
    var prtContent = document.getElementById(divname);
    if (prtContent != null) {
      var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    
      let style = "<style>table, td, th {border: 1px solid black;border-collapse: collapse;}</style>";
      let header = "";
      if(title != "")
          header = "<h2 style='text-align:center;'>" + title + "</h2>";
      WinPrint?.document.write(style +  header + prtContent.innerHTML);
      WinPrint?.document.close();
      WinPrint?.focus();
      WinPrint?.print();
      //WinPrint?.close();
    }
  }
   
  exportToExcel(divname:string, filename:string): void {
    let element = document.getElementById(divname); 
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, filename + ".xlsx");
  }

  getStartAndEndDateFromMonth(monthname:string){
    let monthno = 0;
    for(let i = 0; i < this.months.length; i++){
      if(this.months[i] == monthname){
        monthno = i;
        break;
      }
    }
    let financialyear = localStorage.getItem("financialyear")?.toString();
    let year = 0;
    if(monthno > 2){
      year = 2000 + Number(financialyear?.split("-")[0]);
    }
    else{
      year = 2000 + Number(financialyear?.split("-")[1]);
    }
    var firstDay = new Date(year, monthno, 1);
    var lastDay = new Date(year, monthno + 1, 0);
    return {firstday:firstDay, lastday:lastDay};
  }
}

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};
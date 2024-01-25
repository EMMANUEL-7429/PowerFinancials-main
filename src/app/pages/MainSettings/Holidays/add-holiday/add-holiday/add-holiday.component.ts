import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-holiday',
  templateUrl: './add-holiday.component.html',
  styleUrls: ['./add-holiday.component.scss']
})
export class AddHolidayComponent implements OnInit {

  HolidayId: any;
  HolidayName: any = "";
  HolidayDate: any=new Date;
  SpansTheYears: any=false;
  CreatedOn: any;
  CreatedBy: any="Admin";
  ModifiedOn: any;
  ModifiedBy: any="Admin";  
  Delete: any = false;
  Remarks: any="";
  holidayList: any;
  isValid: boolean = true;
  loanResp: any;
  loanAppResp: any;
  isSuccess: any;
  errDescription: any;

  public loading: boolean = false;
  isDisconnected: boolean = false;
  
  constructor(private service: PowerFinancialService,
    private currentRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router) {
    this.isSuccess = false;
    this.errDescription = "";
   }

  ngOnInit(): void {
    let HolidayId = this.currentRoute.snapshot.paramMap.get("id");
    if (HolidayId == null) this.resetForm();
    else {
      this.service.getHoliday(parseInt(HolidayId)).subscribe((Response) => {
        console.log(Response);
        this.HolidayId = Response.holiday.HolidayId;
        this.HolidayName = Response.holiday.HolidayName;
        this.HolidayDate= Response.holiday.HolidayDate;
        this.SpansTheYears = Response.holiday.SpansTheYears;
        this.CreatedBy=Response.holiday.CreatedBy;
        this.CreatedOn=Response.holiday.CreatedOn;
        this.ModifiedBy=Response.holiday.ModifiedBy;
        this.ModifiedOn=Response.holiday.ModifiedOn;
  
      });
    }
      this.HolidayDate = new Date().toISOString().split('T')[0]; 
  }


  successmsg() {
    Swal.fire("Process Succeeded");
  }
  Reload() {
    window.location.reload();
  }
  onSubmit(
    HolidayName,
    HolidayDate,
    SpansTheYears,
    CreatedBy,
    ModifiedBy
   
  ) {
    //debugger;
    if (this.formValidation()) {
      this.loading = true;
      let HolidayId = this.currentRoute.snapshot.paramMap.get("id");
      if (HolidayId == null)
        this.service
          .AddHoliday(0,
            HolidayName,
            HolidayDate,
            SpansTheYears,
            CreatedBy,
            this.CreatedOn              
          )
          .subscribe(
            (Response) => {
              console.log(Response);
              //debugger;
                this.successmsg();
                this.resetForm();
                this.loading = false;
            },
          );
      else {
        this.service
          .UpdateHoliday(
            HolidayId,
            HolidayName,
            HolidayDate,
            SpansTheYears,
            this.ModifiedOn,
            ModifiedBy
               
          )
          .subscribe(
            (Response) => {
                this.successmsg();
                this.resetForm();
                this.loading = false;
                //this.router.navigate(["/ViewHolidays"]);
            },
          );
      }
    }
  }
  resetForm(form?: NgForm) {   
    if (form != null) form.resetForm();
    this.HolidayName = "";
    this.HolidayId = 0;    
    this.HolidayDate ="";
    this.SpansTheYears= false; 
  }
  formValidation() {
    this.isValid = true;

    if (this.HolidayName == "") this.isValid = false;
    return this.isValid;
  }
  OnDelete(id: number) {
    let HolidayId = this.currentRoute.snapshot.paramMap.get("id");
    if (confirm("Are you sure you want to delete this record?"))
      this.service
        .deleteHoliday(id)
        .subscribe((Response) => {
          this.service
            .getAllHolidays()
            .subscribe((Response) => {
              this.holidayList = Response;
            });
          this.successmsg();
        });
  }
}


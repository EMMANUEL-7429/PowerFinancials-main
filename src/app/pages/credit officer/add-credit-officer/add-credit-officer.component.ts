import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from "sweetalert2";
@Component({
  selector: 'app-add-credit-officer',
  templateUrl: './add-credit-officer.component.html',
  styleUrls: ['./add-credit-officer.component.scss']
})
export class AddCreditOfficerComponent implements OnInit {
  errCode = "";
  CreditOfficerId: any=0;
  Code: any="";
  FullName: any="";
  DateJoined:any= new Date;
  IdNo: any="";
  PhoneNumber: any="";
  Email: any="";
  Address: any="";
  Remarks: any="";
  Delete: any = false;
  isValid: boolean = true;
  loanResp: any;
  loanAppResp: any;
  isSuccess: any;
  errDescription: any;
  public loading: boolean = false;
  isDisconnected: boolean = false;


  constructor(
    private service: PowerFinancialService,
    private currentRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { this.isSuccess = false;
    this.errDescription = ""; }

 
    ngOnInit() {
      let CreditOfficerId = this.currentRoute.snapshot.paramMap.get("id");
      if (CreditOfficerId == null) this.resetForm();
      else {
        this.service.GetCreditOfficer(parseInt(CreditOfficerId)).subscribe((Response) => {
          this.CreditOfficerId=Response.CreditOfficer.CreditOfficerId;
          this.Code=Response.CreditOfficer.Code;
          this.FullName=Response.CreditOfficer.FullName;
          this.DateJoined=Response.CreditOfficer.DateJoined;
          this.IdNo=Response.CreditOfficer.IdNo;
          this.PhoneNumber=Response.CreditOfficer.PhoneNumber;
          this.Email=Response.CreditOfficer.Email;
          this.Address=Response.CreditOfficer.Address;
          this.Remarks=Response.CreditOfficer.Remarks;
        });
      }
      this.DateJoined=new Date().toISOString().split('T')[0]; 
    }
    successmsg() {
      Swal.fire("Process Succeeded");
    }
    Reload() {
      window.location.reload();
    }
    onSubmit(Code, FullName, DateJoined, IdNo, PhoneNumber, Email, Address, Remarks) {
      if (this.formValidation()) {
        if (this.isDisconnected == false) {
        }
        this.loading = true;
        let CreditOfficerId = this.currentRoute.snapshot.paramMap.get("id");
        if (CreditOfficerId == null)
          this.service.AddCreditOfficer(Code, FullName, DateJoined, IdNo, PhoneNumber, Email, Address, Remarks, (this.Delete = false)).subscribe(
            (Response) => {
              this.loanAppResp = Response;
              this.isSuccess = this.loanAppResp["isSuccess"];
              this.errDescription = this.loanAppResp["errorDescription"];
              if (this.isSuccess == false && this.errDescription != "") {
                confirm(this.errDescription);
                this.loading = false;
                return;
              }
              if (this.isSuccess == true) {
                this.successmsg();
                this.resetForm();
                this.loading = false;
                //this.router.navigate(["/view-loan-donor"]);
              }
            },
            (error) => {
              this.isDisconnected = true;
              this.loading = false;
            }
          );
        else {
          this.service
            .UpdateCreditOfficer(CreditOfficerId,Code, FullName, DateJoined, IdNo, PhoneNumber, Email, Address, Remarks, (this.Delete = false))
            .subscribe(
              (Response) => {
                this.loanAppResp = Response;
                this.isSuccess = this.loanAppResp["isSuccess"];
                this.errDescription = this.loanAppResp["errorDescription"];
                if (this.isSuccess == false && this.errDescription != "") {
                  confirm(this.errDescription);
                  this.loading = false;
                  return;
                }
                if (this.isSuccess == true) {
                  this.successmsg();
                  this.resetForm();
                  this.loading = false;
                  this.router.navigate(["/view-credit-officer"]);
                }
              },
              (error) => {
                this.isDisconnected = true;
                this.loading = false;
              }
            );
        }
      }
    }
    resetForm(form?: NgForm) {
      if (form != null) form.resetForm();
      this.CreditOfficerId =0;
  this.Code ="";
  this.FullName ="";
  this.DateJoined = new Date;
  this.IdNo ="";
  this.PhoneNumber ="";
  this.Email ="";
  this.Address ="";
  this.Remarks ="";
      
    }
    formValidation() {
      this.isValid = true;
  if(this.FullName=="") {this.isValid=false}
  if(this.PhoneNumber==""){this.isValid=false}
  if(this.IdNo==""){this.isValid=false}
    
      return this.isValid;
    }
  }
  

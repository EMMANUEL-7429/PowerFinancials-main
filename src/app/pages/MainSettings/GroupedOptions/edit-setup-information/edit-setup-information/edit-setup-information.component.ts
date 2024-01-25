import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-setup-information',
  templateUrl: './edit-setup-information.component.html',
  styleUrls: ['./edit-setup-information.component.scss']
})
export class EditSetupInformationComponent implements OnInit {

  GroupOption:any = "";
  SubOption:any = "";
  OptionId: any;
  OptionName: any = "";
  BooleanValue: any=false;
  NumberValue: any = 0;
  IsBoolean: any = false;
  IsNumber: any = false;
  TextValue: any="";
  OptionCode:any;
  MachineName:any;
  ModifiedBy:any;
  Delete: any = false;


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
    let OptionId = this.currentRoute.snapshot.paramMap.get("id");
    if (OptionId == null) this.resetForm();
    else {
      this.service.getGroupOption(parseInt(OptionId)).subscribe((Response) => {
        console.log(Response);
        this.OptionId = Response.groupOption.OptionId;
        this.GroupOption = Response.groupOption.GroupOption;
        this.OptionCode=Response.groupOption.OptionCode;
        this.SubOption = Response.groupOption.SubOption;
        this.OptionName = Response.groupOption.OptionName;
        this.IsBoolean = Response.groupOption.IsBoolean;           
        this.IsNumber= Response.groupOption.IsNumber;
        this.BooleanValue = Response.groupOption.BooleanValue;
        this.NumberValue=Response.groupOption.NumberValue;
        this.TextValue=Response.groupOption.TextValue;
        this.ModifiedBy=Response.groupOption.ModifiedBy;
        this.MachineName=Response.groupOption.MachineName;
  
      });
    }
  }

  successmsg() {
    debugger;
    Swal.fire("Process Succeeded");
  }
  Reload() {
    window.location.reload();
  }
  onSubmit( 
    GroupOption,SubOption,OptionName,OptionCode, IsBoolean,IsNumber,
    BooleanValue,
    NumberValue,
    TextValue,
    ModifiedBy,
    MachineName,
   
  ) {
    if (this.formValidation()) {
      if (this.isDisconnected == false) {
      }

      this.loading = true;
      let OptionId = this.currentRoute.snapshot.paramMap.get("id");
      if (OptionId == null)
      this.service
      .UpdateGroupOption(0, GroupOption,SubOption,OptionName,OptionCode, IsBoolean,IsNumber, BooleanValue,  NumberValue,TextValue,ModifiedBy, MachineName,
        (this.Delete=false)              
      )
      .subscribe(
        (Response) => {
          console.log(Response);
          debugger;
          this.loanAppResp = Response;
          this.isSuccess = this.loanAppResp["IsSuccess"];
          this.errDescription = this.loanAppResp["ErrorDescription"];
          if (this.isSuccess == false && this.errDescription != "") {
            // this.openSnackBar(this.errDescription);
            confirm(this.errDescription);
            this.loading = false;
            return;
          }
          if (this.isSuccess == true) {
            this.successmsg();
            this.resetForm();
            this.loading = false;
            //this.router.navigate(["/view-setup-information"]);
          }
        },
        (error) => {
          this.isDisconnected = true;
          this.loading = false;
        }
      );
  else {
        this.service
          .UpdateGroupOption(
            OptionId, GroupOption,SubOption,OptionName,OptionCode, IsBoolean,IsNumber, BooleanValue, NumberValue, TextValue, ModifiedBy, MachineName,
            (this.Delete = false)  
          )
          .subscribe(
            (Response) => {
              this.loanAppResp = Response;
              this.isSuccess = this.loanAppResp["IsSuccess"];
              this.errDescription = this.loanAppResp["ErrorDescription"];
              if (this.isSuccess == false && this.errDescription != "") {
                confirm(this.errDescription);
                //this.openSnackBar(this.errDescription);
                this.loading = false;
                return;
              }
              if (this.isSuccess == true) {
                this.successmsg();
                this.resetForm();
                this.loading = false;
                this.router.navigate(["/ViewSetupInformation"]);
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
    this.OptionName = "";
    this.OptionId = 0;    
    this.GroupOption ="";
    this.SubOption ="";
    this.IsBoolean = false;          
    this.BooleanValue ="";
    this.NumberValue="";
    this.IsNumber=false;
    this.TextValue="";
  }
  formValidation() {
    this.isValid = true;

    if (this.OptionName == "") this.isValid = false;
    return this.isValid;
  }
}


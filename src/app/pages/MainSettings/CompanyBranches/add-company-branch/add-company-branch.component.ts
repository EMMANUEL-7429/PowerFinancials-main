import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PowerFinancialService } from 'src/app/shared/service/power-financial.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-company-branch',
  templateUrl: './add-company-branch.component.html',
  styleUrls: ['./add-company-branch.component.scss']
})
export class AddCompanyBranchComponent implements OnInit {

  errPrefixName = "";
  OutletId: any;
  OutletName: any = "";
  PhysicalAddress: any;
  Prefix: any = "";
  IsHQ: any = false;
  IsActive: any = true;

  Country: string = ""; 
  Delete: any = false;
  CompanyId: any =1;
  Remarks: any="";

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
    let OutletId = this.currentRoute.snapshot.paramMap.get("id");
    if (OutletId == null) this.resetForm();
    else {
      this.service.getOutlet(parseInt(OutletId)).subscribe((Response) => {
        console.log(Response);
        this.OutletId = Response.outlet.OutletId;
        this.OutletName = Response.outlet.OutletName;
        this.PhysicalAddress = Response.outlet.PhysicalAddress;
        this.Prefix = Response.outlet.Prefix;
        this.IsHQ = Response.outlet.IsHQ;           
        this.IsActive= Response.outlet.IsActive;
        this.Country = Response.outlet.Country;
        this.Remarks=Response.outlet.Remarks;
  
      });
    }
  }

  successmsg() {
    Swal.fire("Process Succeeded");
  }
  Reload() {
    window.location.reload();
  }
  onSubmit(
    OutletName,
    PhysicalAddress,
    Prefix,       
    Country,
    IsActive,
    IsHQ, 
    Remarks
   
  ) {
    debugger;
    if (this.formValidation()) {
      if (this.isDisconnected == false) {
      }

      this.loading = true;
      let OutletId = this.currentRoute.snapshot.paramMap.get("id");
      if (OutletId == null)
        this.service
          .AddCompanyOutlet(0,
            this.CompanyId,
            OutletName,
            PhysicalAddress,
            Prefix,
            Country,
            IsActive,
            IsHQ,
            Remarks,
            "Admin"               
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
                //this.router.navigate(["/view-prefix-settings"]);
              }
            },
            (error) => {
              this.isDisconnected = true;
              this.loading = false;
            }
          );
      else {
        this.service
          .AddCompanyOutlet(
            OutletId,
            this.CompanyId,
            OutletName,
            PhysicalAddress,
            Prefix,
            Country,
            this.IsActive,
            IsHQ,
            Remarks,
            "Admin"    
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
                this.router.navigate(["/ViewCompanyBranches"]);
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
    this.OutletName = "";
    this.OutletId = 0;    
    this.PhysicalAddress ="";
    this.Prefix ="";
    this.IsHQ = false;          
    this.Country ="";
    this.Remarks="";
    this.IsActive=true;
    this.CompanyId=1;
  }
  formValidation() {
    this.isValid = true;

    if (this.OutletName == "") this.isValid = false;
    return this.isValid;
  }
}

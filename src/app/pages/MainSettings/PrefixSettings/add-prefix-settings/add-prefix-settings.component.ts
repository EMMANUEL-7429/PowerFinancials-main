import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PowerFinancialService } from "src/app/shared/service/power-financial.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-add-prefix-settings",
  templateUrl: "./add-prefix-settings.component.html",
  styleUrls: ["./add-prefix-settings.component.scss"],
})
export class AddPrefixSettingsComponent implements OnInit {
  errPrefixName = "";
  AutoPrefixId: any;
  PrefixName: any = "";
  PrefixText: any;
  IsSystemAssisted: any = false;
  IsDateRelated: any = false;
  Today: any = false;
  Month: any = false;
  Year: any = false; 
  UseBranchPrefix: string = ""; 
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
  ) {
    this.isSuccess = false;
    this.errDescription = "";
  }

  ngOnInit() {
    debugger;
    let AutoPrefixId = this.currentRoute.snapshot.paramMap.get("id");
    if (AutoPrefixId == null) this.resetForm();
    else {
      this.service.getPrefixe(parseInt(AutoPrefixId)).subscribe((Response) => {
        (this.AutoPrefixId = Response.prefixe.id),
          (this.PrefixName = Response.prefixe.PrefixName);
        this.PrefixText = Response.prefixe.PrefixText;
        this.IsSystemAssisted = Response.prefixe.IsSystemAssisted;
        this.IsDateRelated = Response.prefixe.IsDateRelated;
        this.Today = Response.prefixe.Today;
        this.Month = Response.prefixe.Month;
        this.Year = Response.prefixe.Year;      
        this.UseBranchPrefix = Response.prefixe.UseBranchPrefix;
  
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
    PrefixName,
    PrefixText,
    IsSystemAssisted,
    IsDateRelated,
    Today,
    Month,
    Year,   
    UseBranchPrefix
   
  ) {
    if (this.formValidation()) {
      if (this.isDisconnected == false) {
      }
      this.loading = true;
      let AutoPrefixId = this.currentRoute.snapshot.paramMap.get("id");
      if (AutoPrefixId == null)
        this.service
          .AddPrefixes(
            PrefixName,
            PrefixText,
            IsSystemAssisted,
            IsDateRelated,
            Today,
            Month,
            Year,
         
            UseBranchPrefix,
           
            (this.Delete = false)
          )
          .subscribe(
            (Response) => {
              this.loanAppResp = Response;
              this.isSuccess = this.loanAppResp["isSuccess"];
              this.errDescription = this.loanAppResp["errorDescription"];
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
              debugger;
              this.isDisconnected = true;
              this.loading = false;
            }
          );
      else {
        this.service
          .UpdatePrefixes(
            AutoPrefixId,
            PrefixName,
            PrefixText,
            IsSystemAssisted,
            IsDateRelated,
            Today,
            Month,
            Year,
        
            UseBranchPrefix
          
            (this.Delete = false)
          )
          .subscribe(
            (Response) => {
              this.loanAppResp = Response;
              this.isSuccess = this.loanAppResp["isSuccess"];
              this.errDescription = this.loanAppResp["errorDescription"];
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
                this.router.navigate(["/view-prefix-settings"]);
              }
            },
            (error) => {
              debugger;
              this.isDisconnected = true;
              this.loading = false;
            }
          );
      }
    }
  }
  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.PrefixName = "";
  }
  formValidation() {
    this.isValid = true;

    if (this.PrefixName == "") this.isValid = false;
    return this.isValid;
  }
}

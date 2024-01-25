import { MaritalstatusComponent } from "./../../../maritalstatus/maritalstatus.component";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PowerFinancialService } from "src/app/shared/service/power-financial.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-add-marital-status",
  templateUrl: "./add-marital-status.component.html",
  styleUrls: ["./add-marital-status.component.scss"],
})
export class AddMaritalStatusComponent implements OnInit {
  errMaritalStatusName = "";
  MaritalStatusId: any;
  MaritalStatusName: any = "";
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
    let MaritalStatusId = this.currentRoute.snapshot.paramMap.get("id");
    if (MaritalStatusId == null) this.resetForm();
    else {
      this.service
        .getMaritalStatus(parseInt(MaritalStatusId))
        .subscribe((Response) => {
          this.MaritalStatusId = Response.marital.id;
          this.MaritalStatusName = Response.marital.MaritalStatusName;
        });
    }
  }
  successmsg() {
    Swal.fire("Process Succeeded");
  }
  Reload() {
    window.location.reload();
  }
  onSubmit(MaritalStatusName) {
    if (this.formValidation()) {
      if (this.isDisconnected == false) {
      }
      this.loading = true;
      let MaritalStatusId = this.currentRoute.snapshot.paramMap.get("id");
      if (MaritalStatusId == null)
        this.service
          .AddMaritalStatus(MaritalStatusName, (this.Delete = false))
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
                // this.router.navigate(["/view-marital-status"]);
              }
            },
            (error) => {
              this.isDisconnected = true;
              this.loading = false;
            }
          );
      else {
        this.service
          .UpdateMaritalStatus(
            MaritalStatusId,
            MaritalStatusName,
            (this.Delete = false)
          )
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
                this.router.navigate(["/view-marital-status"]);
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
    this.MaritalStatusName = "";
  }
  formValidation() {
    this.isValid = true;

    if (this.MaritalStatusName == "") this.isValid = false;
    return this.isValid;
  }
}

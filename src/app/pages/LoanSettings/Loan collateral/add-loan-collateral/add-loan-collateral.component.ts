import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LoanApplicationService } from "src/app/shared/service/loan-application.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-add-loan-collateral",
  templateUrl: "./add-loan-collateral.component.html",
  styleUrls: ["./add-loan-collateral.component.scss"],
})
export class AddLoanCollateralComponent implements OnInit {
  errCollateralName = "";
  CollateralId: any;
  CollateralName: any = "";
  HasTimeLimit: any = false;
  Delete: any = false;
  isValid: boolean = true;
  loanResp: any;
  loanAppResp: any;
  isSuccess: any;
  errDescription: any;
  public loading: boolean = false;
  isDisconnected: boolean = false;
  constructor(
    private service: LoanApplicationService,
    private currentRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.isSuccess = false;
    this.errDescription = "";
  }

  ngOnInit() {
    let CollateralId = this.currentRoute.snapshot.paramMap.get("id");
    if (CollateralId == null) this.resetForm();
    else {
      this.service
        .getCollateral(parseInt(CollateralId))
        .subscribe((Response) => {
          this.CollateralId = Response.Collateral.id;
          this.CollateralName = Response.Collateral.CollateralName;
          this.HasTimeLimit = Response.Collateral.HasTimeLimit;
        });
    }
  }
  successmsg() {
    Swal.fire("Process Succeeded");
  }
  Reload() {
    window.location.reload();
  }
  onSubmit(CollateralName, HasTimeLimit) {
    if (this.formValidation()) {
      if (this.isDisconnected == false) {
      }
      this.loading = true;
      let CollateralId = this.currentRoute.snapshot.paramMap.get("id");
      if (CollateralId == null)
        this.service
          .AddCollateral(CollateralName, HasTimeLimit, (this.Delete = false))
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
                //this.router.navigate(["/view-loan-collateral"]);
              }
            },
            (error) => {
              this.isDisconnected = true;
              this.loading = false;
            }
          );
      else {
        this.service
          .UpdateCollateral(
            CollateralId,
            CollateralName,
            HasTimeLimit,
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
                this.router.navigate(["/view-loan-collateral"]);
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
    this.CollateralName = "";
    this.HasTimeLimit = false;
  }
  formValidation() {
    this.isValid = true;

    if (this.CollateralName == "") this.isValid = false;
    return this.isValid;
  }
}

import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LoanApplicationService } from "src/app/shared/service/loan-application.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-add-loan-status",
  templateUrl: "./add-loan-status.component.html",
  styleUrls: ["./add-loan-status.component.scss"],
})
export class AddLoanStatusComponent implements OnInit {
  errLoanStatusName = "";
  LoanStatusId: any;
  LoanStatusName: any = "";
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
    let LoanStatusId = this.currentRoute.snapshot.paramMap.get("id");
    if (LoanStatusId == null) this.resetForm();
    else {
      this.service
        .getLoanStatus(parseInt(LoanStatusId))
        .subscribe((Response) => {
          this.LoanStatusId = Response.loanStatus.id;
          this.LoanStatusName = Response.loanStatus.LoanStatusName;
        });
    }
  }
  successmsg() {
    Swal.fire("Process Succeeded");
  }
  Reload() {
    window.location.reload();
  }

  onSubmit(LoanStatusName) {
    if (this.formValidation()) {
      if (this.isDisconnected == false) {
      }
      this.loading = true;
      let LoanStatusId = this.currentRoute.snapshot.paramMap.get("id");
      if (LoanStatusId == null)
        this.service
          .AddLoanStatus(LoanStatusName, (this.Delete = false))
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
                //this.router.navigate(["/view-loan-status"]);
              }
            },
            (error) => {
              this.isDisconnected = true;
              this.loading = false;
            }
          );
      else {
        this.service
          .UpdateLoanStatus(LoanStatusId, LoanStatusName, (this.Delete = false))
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
                this.router.navigate(["/view-loan-status"]);
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
    this.LoanStatusName = "";
  }
  formValidation() {
    this.isValid = true;

    if (this.LoanStatusName == "") this.isValid = false;
    return this.isValid;
  }
}

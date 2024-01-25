import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LoanApplicationService } from "src/app/shared/service/loan-application.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-add-loan-purpose",
  templateUrl: "./add-loan-purpose.component.html",
  styleUrls: ["./add-loan-purpose.component.scss"],
})
export class AddLoanPurposeComponent implements OnInit {
  errName = "";
  LoanPurposeId: any;
  Name: any = "";
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
    let LoanPurposeId = this.currentRoute.snapshot.paramMap.get("id");
    if (LoanPurposeId == null) this.resetForm();
    else {
      this.service
        .getLoanPurpose(parseInt(LoanPurposeId))
        .subscribe((Response) => {
          this.LoanPurposeId = Response.loanpurpose.id;
          this.Name = Response.loanpurpose.Name;
        });
    }
  }
  successmsg() {
    Swal.fire("Process Succeeded");
  }
  Reload() {
    window.location.reload();
  }
  onSubmit(Name) {
    if (this.formValidation()) {
      if (this.isDisconnected == false) {
      }
      this.loading = true;
      let LoanPurposeId = this.currentRoute.snapshot.paramMap.get("id");
      if (LoanPurposeId == null)
        this.service.AddLoanPurpose(Name, (this.Delete = false)).subscribe(
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
              //this.router.navigate(["/view-loan-purpose"]);
            }
          },
          (error) => {
            this.isDisconnected = true;
            this.loading = false;
          }
        );
      else {
        this.service
          .UpdateLoanPurpose(LoanPurposeId, Name, (this.Delete = false))
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
                this.router.navigate(["/view-loan-purpose"]);
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
    this.Name = "";
  }
  formValidation() {
    this.isValid = true;

    if (this.Name == "") this.isValid = false;
    return this.isValid;
  }
}

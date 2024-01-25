import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LoanApplicationService } from "src/app/shared/service/loan-application.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-add-loan-donor",
  templateUrl: "./add-loan-donor.component.html",
  styleUrls: ["./add-loan-donor.component.scss"],
})
export class AddLoanDonorComponent implements OnInit {
  errDonorName = "";
  DonorId: any;
  DonorName: any = "";
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
    let DonorId = this.currentRoute.snapshot.paramMap.get("id");
    if (DonorId == null) this.resetForm();
    else {
      this.service.getLoanDonor(parseInt(DonorId)).subscribe((Response) => {
        this.DonorId = Response.loanDonor.id;
        this.DonorName = Response.loanDonor.DonorName;
      });
    }
  }
  successmsg() {
    Swal.fire("Process Succeeded");
  }
  Reload() {
    window.location.reload();
  }
  onSubmit(DonorName) {
    if (this.formValidation()) {
      if (this.isDisconnected == false) {
      }
      this.loading = true;
      let DonorId = this.currentRoute.snapshot.paramMap.get("id");
      if (DonorId == null)
        this.service.AddLoanDonor(DonorName, (this.Delete = false)).subscribe(
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
          .UpdateLoanDonor(DonorId, DonorName, (this.Delete = false))
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
                this.router.navigate(["/view-loan-donor"]);
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
    this.DonorName = "";
  }
  formValidation() {
    this.isValid = true;

    if (this.DonorName == "") this.isValid = false;
    return this.isValid;
  }
}

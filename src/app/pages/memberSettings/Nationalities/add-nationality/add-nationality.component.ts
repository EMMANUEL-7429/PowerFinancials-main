import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PowerFinancialService } from "src/app/shared/service/power-financial.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-add-nationality",
  templateUrl: "./add-nationality.component.html",
  styleUrls: ["./add-nationality.component.scss"],
})
export class AddNationalityComponent implements OnInit {
  errNationalityName = "";
  NationalityId: any;
  NationalityName: any = "";
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
    let NationalityId = this.currentRoute.snapshot.paramMap.get("id");
    if (NationalityId == null) this.resetForm();
    else {
      this.service
        .getNationality(parseInt(NationalityId))
        .subscribe((Response) => {
          this.NationalityId = Response.Nationality.id;
          this.NationalityName = Response.Nationality.NationalityName;
        });
    }
  }
  successmsg() {
    Swal.fire("Process Succeeded");
  }
  Reload() {
    window.location.reload();
  }
  onSubmit(NationalityName) {
    if (this.formValidation()) {
      if (this.isDisconnected == false) {
      }
      this.loading = true;
      let NationalityId = this.currentRoute.snapshot.paramMap.get("id");
      if (NationalityId == null)
        this.service
          .AddNationality(NationalityName, (this.Delete = false))
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
                //this.router.navigate(["/view-nationality"]);
              }
            },
            (error) => {
              this.isDisconnected = true;
              this.loading = false;
            }
          );
      else {
        this.service
          .UpdateNationality(
            NationalityId,
            NationalityName,
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
                this.router.navigate(["/view-nationality"]);
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
    this.NationalityName = "";
  }
  formValidation() {
    this.isValid = true;

    if (this.NationalityName == "") this.isValid = false;
    return this.isValid;
  }
}

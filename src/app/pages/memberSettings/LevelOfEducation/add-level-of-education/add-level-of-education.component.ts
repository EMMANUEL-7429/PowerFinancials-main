import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PowerFinancialService } from "src/app/shared/service/power-financial.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-add-level-of-education",
  templateUrl: "./add-level-of-education.component.html",
  styleUrls: ["./add-level-of-education.component.scss"],
})
export class AddLevelOfEducationComponent implements OnInit {
  errLevelofEducationName = "";
  LevelofEducationId: any;
  LevelofEducationName: any = "";
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
    let LevelofEducationId = this.currentRoute.snapshot.paramMap.get("id");
    if (LevelofEducationId == null) this.resetForm();
    else {
      this.service
        .getLevelofEducation(parseInt(LevelofEducationId))
        .subscribe((Response) => {
          this.LevelofEducationId = Response.education.id;
          this.LevelofEducationName = Response.education.LevelofEducationName;
        });
    }
  }
  successmsg() {
    Swal.fire("Process Succeeded");
  }
  Reload() {
    window.location.reload();
  }
  onSubmit(LevelofEducationName) {
    if (this.formValidation()) {
      if (this.isDisconnected == false) {
      }
      this.loading = true;
      let LevelofEducationId = this.currentRoute.snapshot.paramMap.get("id");
      if (LevelofEducationId == null)
        this.service
          .AddLevelofEducation(LevelofEducationName, (this.Delete = false))
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
                // this.router.navigate(["/view-level-of-education"]);
              }
            },
            (error) => {
              this.isDisconnected = true;
              this.loading = false;
            }
          );
      else {
        this.service
          .UpdateLevelofEducation(
            LevelofEducationId,
            LevelofEducationName,
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
                this.router.navigate(["/view-level-of-education"]);
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
    this.LevelofEducationName = "";
  }
  formValidation() {
    this.isValid = true;

    if (this.LevelofEducationName == "") this.isValid = false;
    return this.isValid;
  }
}

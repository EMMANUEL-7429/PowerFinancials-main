import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PowerFinancialService } from "src/app/shared/service/power-financial.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-add-member-title",
  templateUrl: "./add-member-title.component.html",
  styleUrls: ["./add-member-title.component.scss"],
})
export class AddMemberTitleComponent implements OnInit {
  errTitleName = "";
  TitleId: any;
  TitleName: any = "";
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
    let TitleId = this.currentRoute.snapshot.paramMap.get("id");
    if (TitleId == null) this.resetForm();
    else {
      this.service.getTitle(parseInt(TitleId)).subscribe((Response) => {
        this.TitleId = Response.title.id;
        this.TitleName = Response.title.TitleName;
      });
    }
  }
  successmsg() {
    Swal.fire("Process Succeeded");
  }

  Reload() {
    window.location.reload();
  }

  onSubmit(TitleName) {
    if (this.formValidation()) {
      if (this.isDisconnected == false) {
      }
      this.loading = true;
      let TitleId = this.currentRoute.snapshot.paramMap.get("id");
      if (TitleId == null)
        this.service.AddTitle(TitleName, (this.Delete = false)).subscribe(
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
              //this.router.navigate(["/view-member-titles"]);
            }
          },
          (error) => {
            this.isDisconnected = true;
            this.loading = false;
          }
        );
      else {
        this.service
          .UpdateTitle(TitleId, TitleName, (this.Delete = false))
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
                this.router.navigate(["/view-member-titles"]);
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
    this.TitleName = "";
  }
  formValidation() {
    this.isValid = true;

    if (this.TitleName == "") this.isValid = false;
    return this.isValid;
  }
}

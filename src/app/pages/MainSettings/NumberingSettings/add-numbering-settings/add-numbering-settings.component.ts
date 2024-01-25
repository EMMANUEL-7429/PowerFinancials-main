import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PowerFinancialService } from "src/app/shared/service/power-financial.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-add-numbering-settings",
  templateUrl: "./add-numbering-settings.component.html",
  styleUrls: ["./add-numbering-settings.component.scss"],
})
export class AddNumberingSettingsComponent implements OnInit {
  errAutoGenNumberText = "";
  AutoGenNumberId: any;
  AutoGenNumberText: any = "";
  AutoPrefixId: any = 0;
  UsePrefix: any = false;
  Start: any = 0;
  Stop: any = 0;
  StartFrom: any = 0;
  AllowManual: any;
  prefixesList: any;
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
    let AutoGenNumberId = this.currentRoute.snapshot.paramMap.get("id");
    if (AutoGenNumberId == null) this.resetForm();
    else {
      this.service
        .getNumbering(parseInt(AutoGenNumberId))
        .subscribe((Response) => {
          this.AutoGenNumberId = Response.numbering.id;
          this.AutoGenNumberText = Response.numbering.AutoGenNumberText;
          this.AutoPrefixId = Response.numbering.AutoPrefixId;
          this.UsePrefix = Response.numbering.UsePrefix;
          this.Start = Response.numbering.Start;
          this.Stop = Response.numbering.Stop;
          this.StartFrom = Response.numbering.StartFrom;
          this.AllowManual = Response.numbering.AllowManual;
        });
    }
    this.refreshList();
    this.NumberingForm();
  }
  refreshList() {
    this.service.getAllPrefixes().subscribe((Response) => {
      this.prefixesList = Response;
    });
  }
  // openSnackBar(message) {
  //  this._snackBar.open(message, 'Ok', {
  //    duration: 4000,
  //     verticalPosition: 'bottom'
  //  });

  // }
  successmsg() {
    Swal.fire("Process Succeeded");
  }
  Reload() {
    window.location.reload();
  }
  onSubmit(
    AutoGenNumberText,
    AutoPrefixId,
    UsePrefix,
    Start,
    Stop,
    StartFrom,
    AllowManual
  ) {
    if (this.formValidation()) {
      if (this.isDisconnected == false) {
      }
      this.loading = true;
      let AutoGenNumberId = this.currentRoute.snapshot.paramMap.get("id");
      if (AutoGenNumberId == null)
        this.service
          .AddNumbering(
            AutoGenNumberText,
            AutoPrefixId,
            UsePrefix,
            Start,
            Stop,
            StartFrom,
            AllowManual,
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
                // this.router.navigate(["/view-numbering-settings"]);
              }
            },
            (error) => {
              this.isDisconnected = true;
              this.loading = false;
            }
          );
      else {
        this.service
          .UpdateNumbering(
            AutoGenNumberId,
            AutoGenNumberText,
            AutoPrefixId,
            UsePrefix,
            Start,
            Stop,
            StartFrom,
            AllowManual,
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
                this.router.navigate(["/view-numbering-settings"]);
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
    this.AutoGenNumberText = "";
  }
  formValidation() {
    this.isValid = true;

    if (this.AutoGenNumberText == "") this.isValid = false;
    return this.isValid;
  }
  NumberingForm(form?: NgForm) {
    if (form != null) form.resetForm();
    (this.AutoPrefixId = 0),
      (this.AutoGenNumberText = ""),
      (this.Start = 0),
      (this.Stop = 0),
      (this.StartFrom = 0);
    this.UsePrefix = false;
    this.AllowManual = false;
  }
}

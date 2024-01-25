import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PowerFinancialService } from "src/app/shared/service/power-financial.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-add-setup-settings",
  templateUrl: "./add-setup-settings.component.html",
  styleUrls: ["./add-setup-settings.component.scss"],
})
export class AddSetupSettingsComponent implements OnInit {
  errSetName = "";
  SetupId: any;
  SetName: any = "";
  AutoGenNumberId: any = 0;
  IsManual: any = false;
  NumberingList: any;
  Delete: any = false;
  isValid: boolean = true;
  loanResp: any;
  loanAppResp: any;
  isSuccess: any;
  errDescription: any;
  public loading: boolean = false;
  isDisconnected: boolean = false;
  show: any = true;
  hide: any = false;
  constructor(
    private service: PowerFinancialService,
    private currentRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
   
  ) {
    this.isSuccess = false;
    this.errDescription = "";
  }

  ngOnInit() {
    let SetupId = this.currentRoute.snapshot.paramMap.get("id");
    if (SetupId == null) this.resetForm();
    else {
      this.service.getSetup(parseInt(SetupId)).subscribe((Response) => {
        this.SetupId = Response.setup.id;
        this.SetName = Response.setup.SetName;
        this.AutoGenNumberId = Response.setup.AutoGenNumberId;
        this.IsManual = Response.setup.IsManual;
      });
    }
    this.refreshList();
  }

  // openSnackBar(message) {
  //  this._snackBar.open(message, 'Ok', {
  //    duration: 4000,
  //     verticalPosition: 'bottom'
  //  });

  // }

  refreshList() {
    this.service.getAllNumbering().subscribe((Response) => {
      this.NumberingList = Response;
    });
  }

  successmsg() {
    Swal.fire("Process Succeeded");
  }
  Reload() {
    window.location.reload();
  }
  onSubmit(SetName, AutoGenNumberId, IsManual) {
    if (this.formValidation()) {
      if (this.isDisconnected == false) {
      }
      this.show = false;
      this.hide = true;
      this.loading = true;
      let SetupId = this.currentRoute.snapshot.paramMap.get("id");
      if (SetupId == null)
        this.service
          .AddSetup(SetName, AutoGenNumberId, IsManual, (this.Delete = false))
          .subscribe(
            (Response) => {
              this.loanAppResp = Response;
              this.isSuccess = this.loanAppResp["isSuccess"];
              this.errDescription = this.loanAppResp["errorDescription"];
              if (this.isSuccess == false && this.errDescription != "") {
                // this.openSnackBar(this.errDescription);
                confirm(this.errDescription);
                this.loading = false;
                // this.show = true;
                // this.hide = false;
                return;
              }
              if (this.isSuccess == true) {
                this.successmsg();
                this.resetForm();
                this.loading = false;
                // this.show = true;
                // this.hide = false;
                //this.router.navigate(['/view-security-question']);
              }
            },
            (error) => {
              
              this.isDisconnected = true;
              this.loading = false;
            }
          );
      else {
        this.service
          .UpdateSetup(
            SetupId,
            SetName,
            AutoGenNumberId,
            IsManual,
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
                // this.show = true;
                // this.hide = false;
                this.router.navigate(["/view-setup-settings"]);
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
    this.SetName = "";
  }
  formValidation() {
    this.isValid = true;

    if (this.SetName == "") this.isValid = false;
    return this.isValid;
  }
}

import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PowerFinancialService } from "src/app/shared/service/power-financial.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-add-charges",
  templateUrl: "./add-charges.component.html",
  styleUrls: ["./add-charges.component.scss"],
})
export class AddChargesComponent implements OnInit {
  errCode = "";
  ChargesId: any = 0;
  Code: any = "";
  Description: any = "";
  IsPercent: any = false;
  Value: any = 0;
  Tariff: any = false;
  IgnoreLowLimit: any = true;
  LowerLimit: any = 0;
  UpperLimit: any = 0;
  Delete: boolean = false;
  TariffList: any;
  IsPercent1: any = false;
  TariffId: any;
  TariffAmount: any = 0;
  Start: any = 0;
  Stop: any = 0;
  ChargeAmount: any = 0;
  isValid: boolean = true;
  isTValid: boolean = true;
  loanResp: any;
  loanAppResp: any;
  isSuccess: any;
  errDescription: any;
  showTariff: any = false;
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

  ngOnInit(): void {
    let ChargesId = this.currentRoute.snapshot.paramMap.get("id");
    if (ChargesId == null) this.resetForm();
    else {
      this.showTariff = true;
      this.Tariff = true;
      this.IsPercent = true;
      this.service.GetCharge(parseInt(ChargesId)).subscribe((Response) => {
        this.ChargesId = Response.Charge.id;
        this.Code = Response.Charge.Code;
        this.Description = Response.Charge.Description;
        this.IsPercent = Response.Charge.IsPercent;
        this.Value = Response.Charge.Value;
        this.Tariff = Response.Charge.Tariff;
        this.LowerLimit = Response.Charge.LowerLimit;
        this.TariffAmount = Response.Charge.TariffAmount;
        this.IgnoreLowLimit = Response.Charge.IgnoreLowLimit;
        this.UpperLimit = Response.Charge.UpperLimit;
        this.service
          .GetTariffByChargeId(parseInt(ChargesId))
          .subscribe((Response) => {
            this.TariffList = Response;
          });
      });
    }
  }
  successmsg() {
    Swal.fire("Process Succeeded");
  }
  Reload() {
    window.location.reload();
  }
  onSubmit(
    Code,
    Description,
    IsPercent,
    Value,
    Tariff,
    TariffAmount,
    IgnoreLowLimit,
    LowerLimit,
    UpperLimit
  ) {
    if (this.formValidation()) {
      if (this.isDisconnected == false) {
      }
      this.loading = true;
      let ChargesId = this.currentRoute.snapshot.paramMap.get("id");
      if (ChargesId == null)
        this.service
          .AddCharge(
            Code,
            Description,
            IsPercent,
            Value,
            Tariff,
            TariffAmount,
            IgnoreLowLimit,
            LowerLimit,
            UpperLimit,
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
                //this.router.navigate(["/view-charges"]);
              }
            },
            (error) => {
              this.isDisconnected = true;
              this.loading = false;
            }
          );
      else {
        this.service
          .UpdateCharge(
            ChargesId,
            Code,
            Description,
            IsPercent,
            Value,
            Tariff,
            TariffAmount,
            IgnoreLowLimit,
            LowerLimit,
            UpperLimit,
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
                this.router.navigate(["/view-charges"]);
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
    this.Code = "";
    this.Description = "";
    this.LowerLimit = "";
    this.UpperLimit = "";
    this.IsPercent = false;
    this.IgnoreLowLimit = false;
    this.Tariff = false;
  }

  listCharges() {
    this.router.navigate(["/view-charges"]);
  }
  AddTariff() {
    this.router.navigate(["/tarifflist"]);
  }
  OnUpdate(TariffId: number) {
    this.router.navigate(["/tariff/edit/" + TariffId]);
  }
  onDelete(id: number) {
    let ChargesId = this.currentRoute.snapshot.paramMap.get("id");
    if (confirm("Are you sure you want to delete this record?"))
      this.service.DeleteTariff(id).subscribe((Response) => {
        this.service
          .GetTariffByChargeId(parseInt(ChargesId))
          .subscribe((Response) => {
            this.TariffList = Response;
          });

        this.toastr.error("Process Succeeded");
      });
  }
  onAdd() {
    this.router.navigate(["/tariff"]);
  }
  Percent(ctrl) {
    if (ctrl.selectedIndex == 0) {
      this.TariffAmount = 0;
    } else {
      this.TariffAmount = this.TariffList[ctrl.selectedIndex - 1].ChargeAmount;
    }
  }

  OnSubmitTariff(Start, Stop, ChargeAmount) {
    if (this.formValidationTariff()) {
      this.loading = true;
      let ChargesId = this.currentRoute.snapshot.paramMap.get("id");

      this.service
        .AddTariff(ChargesId, Start, Stop, ChargeAmount, this.Delete)
        .subscribe((Response) => {
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
            this.loading = false;
            this.service
              .GetTariffByChargeId(parseInt(ChargesId))
              .subscribe((Response) => {
                this.TariffList = Response;
              });
          }
        });
    }
  }

  formValidation() {
    this.isValid = true;

    if (this.Code == "") this.isValid = false;
    return this.isValid;
  }
  formValidationTariff() {
    this.isTValid = true;
    if (this.Start == 0) this.isTValid = false;
    if (this.Start == true) this.isTValid = false;
    if (this.ChargeAmount == 0) this.isTValid = false;
    return this.isTValid;
  }
}

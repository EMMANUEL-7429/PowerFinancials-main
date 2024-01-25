import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LoanApplicationService } from "src/app/shared/service/loan-application.service";

import Swal from "sweetalert2";
import { AddLoanChargesListTariffComponent } from "../../LoanChargesListTariff/add-loan-charges-list-tariff/add-loan-charges-list-tariff.component";
@Component({
  selector: "app-add-loan-charges",
  templateUrl: "./add-loan-charges.component.html",
  styleUrls: ["./add-loan-charges.component.scss"],
})
export class AddLoanChargesComponent implements OnInit {
  spinnerContent: any;
  isDisconnected: boolean = false;

  LoanChargesListId: any = 0;
  Name: any = "";
  Recur: any = false;
  IncludeInterest: any = false;
  IsTariffBased: any = false;

  MaxFromInterval: any = 0;

  IsDispTariff: any = false;
  IsBtnSee: any = false;
  IsUpdateBtnSee: any = true;
  LoanChargesListIdStored: any = 0;
  isValid: any = true;
  public loading: boolean = false;

  Delete: any = false;
  loanResp: any;
  loanAppResp: any;
  isSuccess: any;
  errDescription: any;

  //Tariff Table
  public LoanChargeTariffList: Object; //change to Object if using data tables
  public temp: Object = false;

  public LoanChargesList: [];
  public LoanChargeTariffToInterval: any;

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router,
    private loanTypeService: LoanApplicationService,
    private currentRoute: ActivatedRoute
  ) {
    this.IsDispTariff = false;
    this.loanTypeService.getAllLoanChargesList().subscribe((res) => {
      this.LoanChargesList = res as [];
    });
  }

  ngOnInit(): void {
    let LoanChargesListId = this.currentRoute.snapshot.paramMap.get("id");

    if (LoanChargesListId == null) {
      this.ClearData();
    } else {
      this.loanTypeService
        .getLoanChargesListById(parseInt(LoanChargesListId))
        .subscribe((Response) => {
          this.IsBtnSee = false;
          this.IsUpdateBtnSee = false;
          this.LoanChargesListId = Response.loanchargeslist.LoanChargesListId;
          this.IsDispTariff = true;
          localStorage.setItem(
            "LoanChargesListId-A",
            Response.loanchargeslist.LoanChargesListId
          );

          this.LoanChargesListIdStored =
            Response.loanchargeslist.LoanChargesListId;
          this.Name = Response.loanchargeslist.Name;
          this.Recur = Response.loanchargeslist.Recur;
          this.IncludeInterest = Response.loanchargeslist.IncludeInterest;
          this.IsTariffBased = Response.loanchargeslist.IsTariffBased;
          this.getData();
        });
    }
  }

  Reload() {
    window.location.reload();
  }

  CreateTariff() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = { FromInterval: this.MaxFromInterval };
    this.dialog
      .open(AddLoanChargesListTariffComponent, dialogConfig)
      .afterClosed()
      .subscribe((Response) => {
        this.temp = false;
        this.getData();
      });
  }

  ///////////////Add Loan Charges list to db
  onSubmit(Name, Recur, IncludeInterest, IsTariffBased) {
    if (this.formValidation()) {
      if (this.isDisconnected == false) {
        this.loading = true;
      }
      this.LoanChargesListId = this.currentRoute.snapshot.paramMap.get("id");
      if (this.LoanChargesListId == null) {
        this.loanTypeService
          .AddLoanChargesList(
            Name,
            Recur,
            IncludeInterest,
            IsTariffBased,
            this.Delete
          )
          .subscribe(
            (Response) => {
              this.loanAppResp = Response;
              //console.log('Id: '+this.loanAppResp['Name'])
              this.isSuccess = this.loanAppResp["IsSuccess"];
              this.errDescription = this.loanAppResp["ErrorDescription"];

              if (this.isSuccess == false && this.errDescription != "") {
                confirm(this.errDescription);

                return;
              }
              if (this.isSuccess == true) {
                this.successmsg();
                this.IsDispTariff = true;
                this.loading = false;
                this.getData();
                this.LoanChargesListIdStored =
                  this.loanAppResp["LoanChargesListId"];
                localStorage.setItem(
                  "LoanChargesListId-A",
                  this.LoanChargesListIdStored
                );

                if (this.IsTariffBased == false) {
                  this.LoanChargesListIdStored = 0;
                  localStorage.setItem("LoanChargesListId-A", "0");
                  this.ClearData();
                  //this.router.navigate(['/View-Loan-Charges']);
                }
              }
            },
            (error) => {
              this.isDisconnected = true;
            }
          );
      } else {
        this.loanTypeService
          .UpdateLoanChargesList(
            this.LoanChargesListId,
            Name,
            Recur,
            IncludeInterest,
            IsTariffBased,
            this.Delete
          )
          .subscribe(
            (Response) => {
              this.loanAppResp = Response;
              this.isSuccess = this.loanAppResp["IsSuccess"];
              this.errDescription = this.loanAppResp["ErrorDescription"];
              if (this.isSuccess == false && this.errDescription != "") {
                confirm(this.errDescription);

                return;
              }
              if (this.isSuccess == true) {
                this.successmsg();
                this.getData();
                this.LoanChargesListIdStored =
                  this.loanAppResp["LoanChargesListId"];
                localStorage.setItem(
                  "LoanChargesListId-A",
                  this.LoanChargesListIdStored
                );
                this.router.navigate(["/View-Loan-Charges"]);

                //console.log("Save LoanchargeIdTest"+localStorage.getItem('LoanChargesListId-A'))
                // this.ClearData();
                this.IsDispTariff = true;
                //window.location.reload();
              }
            },
            (error) => {
              this.isDisconnected = true;
            }
          );
      }
    }
  }

  ClearData() {
    this.LoanChargesListId = 0;
    this.Name = "";
    this.Recur = false;
    this.IncludeInterest = false;
    this.IsTariffBased = false;
    this.temp = false;
  }

  ////////////////////////////////////////////////////////

  /////////////Tariff Display Table Data
  onIsTariffBased(e) {
    // here e is a native event
    if (e.target.checked) {
    }
  }

  getData() {
    console.log("varLogGetData" + this.LoanChargesListIdStored);

    this.loanTypeService
      .getAllLoanChargeListTariffByLoanChargesListId(
        this.LoanChargesListIdStored
      )
      .subscribe(
        (Response) => {
          this.LoanChargeTariffList = Response;
          this.LoanChargeTariffToInterval = Response;
          this.temp = true;
          this.getToInterval();
        },
        (error) => {
          this.isDisconnected = true;
        }
      );
  }

  onUpdate(LoanChargesListTariffId: any) {
    localStorage.setItem("LoanChargesListTariffId-A", LoanChargesListTariffId);
    const dialogRef = this.dialog.open(AddLoanChargesListTariffComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      this.getData();
      localStorage.setItem("LoanChargesListTariffId-A", "0");
    });
  }

  onDelete(LoanChargesListTariffId: any) {
    if (confirm("Are you sure you want to delete this record?")) {
      this.loanTypeService
        .DeleteLoanChargeListTariff(LoanChargesListTariffId)
        .subscribe((res) => {
          this.getData();
          this.successmsg();
        });
    }
  }
  onView() {}

  clearComponent() {
    this.ClearData();
    this.LoanChargesListIdStored = 0;
    localStorage.setItem("LoanChargesListId-A", "0");
    this.IsDispTariff = false;
    this.IsUpdateBtnSee = true;
    this.IsBtnSee = false;
    this.router.navigate(["/A-LoanCharges"]);
  }

  viewList() {
    this.LoanChargesListIdStored = 0;
    localStorage.setItem("LoanChargesListId-A", "0");
    this.router.navigate(["/V-LoanCharges"]);
  }
  //////////////////////////////////////////////
  getLoanChargeName(id: any): string {
    var name: string;
    if (this.LoanChargesList) {
      if (id > 0) {
        this.LoanChargesList.some((obj) => {
          //var dim=obj as Element;
          if (obj["LoanChargesListId"] == id) {
            name = obj["Name"];
            //console.log('Name'+obj["Name"]);
            return true;
          }
        });
      }
    }
    return name;
  }

  getToInterval() {
    var swap: any = 0;
    var max: any = 0;
    if (this.LoanChargeTariffToInterval) {
      this.LoanChargeTariffToInterval.some((obj) => {
        if (obj["ToInterval"] > swap) {
          max = obj["ToInterval"];
          return false;
        }
        swap = max;
      });
    }
    console.log("MaxValue" + max);
    this.MaxFromInterval = max;
    //return max;
  }
  successmsg() {
    Swal.fire("Process Succeeded");
  }
  formValidation() {
    this.isValid = true;
    if (this.Name == "") this.isValid = false;
    return this.isValid;
  }
}

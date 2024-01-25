import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LoanApplicationService } from "src/app/shared/service/loan-application.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-add-loantype-charges",
  templateUrl: "./add-loantype-charges.component.html",
  styleUrls: ["./add-loantype-charges.component.scss"],
})
export class AddLoantypeChargesComponent implements OnInit {
  spinnerContent: any;
  isDisconnected: boolean = false;

  LoanTypeChargesId: any = 0;
  LoanTypeId: any = 0;
  Name: any = "";
  IsTariffBased: any = false;
  IsPercentage: any = false;
  Value: any = 0;
  Amount: any = 0;
  PeriodToCharge: any = 1;
  HasLimit: any = false;
  LowerLimit: any = 0;
  UpperLimit: any = 0;
  UseFormula: any = false;
  TheFormula: any = "";
  isValid: any = true;
  LoanChargesListId: any = 0;
  LoanChargesList: any;
  //LoanTypeIdStored:any=0;
  public loading: boolean = false;
  Delete: any = false;
  loanResp: any;
  loanAppResp: any;
  isSuccess: any;
  errDescription: any;

  constructor(
    public dialogRef: MatDialogRef<AddLoantypeChargesComponent>,
    private toastr: ToastrService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private loanTypeService: LoanApplicationService,
    private currentRoute: ActivatedRoute
  ) {
    this.LoanTypeChargesId = localStorage.getItem("LoanTypeChargesId-A");
    this.LoanTypeId = localStorage.getItem("LoanTypeId-A");
  }

  ngOnInit(): void {
    this.loanTypeService.getAllLoanChargesList().subscribe(
      (Response) => {
        //this.spinner.hide();
        this.LoanChargesList = Response;
       // console.log(Response);
      },
      (error) => {
        // this.spinner.hide();
        this.isDisconnected = true;
      }
    );
    //let LoanTypeChargesId=this.currentRoute.snapshot.paramMap.get('id');
    if (this.LoanTypeChargesId == 0) {
      //this.ClearData();
    } else {
      this.spinnerContent = "Loading Data....";
      //this.spinner.show();

      this.loanTypeService
        .getLoanTypeChargesById(parseInt(this.LoanTypeChargesId))
        .subscribe((Response) => {
          this.LoanTypeChargesId = Response.loantypecharges.LoanTypeChargesId;
          this.LoanChargesListId = Response.loantypecharges.LoanChargesListId;
          //console.log("ChargeId" + this.LoanChargesListId);
          this.LoanTypeId = Response.loantypecharges.LoanTypeId;
          this.Name = Response.loantypecharges.Name;
          this.IsTariffBased = Response.loantypecharges.IsTariffBased;
          this.IsPercentage = Response.loantypecharges.IsPercentage;
          this.Value = Response.loantypecharges.Value;
          this.Amount = Response.loantypecharges.Amount;
          this.PeriodToCharge = Response.loantypecharges.PeriodToCharge;
          this.HasLimit = Response.loantypecharges.HasLimit;
          this.LowerLimit = Response.loantypecharges.LowerLimit;
          this.UpperLimit = Response.loantypecharges.UpperLimit;
          this.UseFormula = Response.loantypecharges.UseFormula;
          this.TheFormula = Response.loantypecharges.TheFormula;
          // this.spinner.hide();
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
    Name,
    IsTariffBased,
    IsPercentage,
    Value,
    Amount,
    PeriodToCharge,
    HasLimit,
    LowerLimit,
    UpperLimit,
    UseFormula,
    TheFormula
  ) {
    debugger;
    if (this.formValidation()) {
      if (this.isDisconnected == false) {
        this.loading = true;
      }
      //this.LoanTypeChargesId=this.currentRoute.snapshot.paramMap.get('id');
      if (this.LoanTypeChargesId == 0) {
        this.loanTypeService
          .AddLoanTypeCharges(
            this.LoanChargesListId,
            this.LoanTypeId,
            Name,
            IsTariffBased,
            IsPercentage,
            Value,
            Amount,
            PeriodToCharge,
            HasLimit,
            LowerLimit,
            UpperLimit,
            UseFormula,
            TheFormula,
            this.Delete
          )
          .subscribe(
            (Response) => {
              this.loanAppResp = Response;
              this.isSuccess = this.loanAppResp["IsSuccess"];
              this.errDescription = this.loanAppResp["ErrorDescription"];
              if (this.isSuccess == false && this.errDescription != "") {
                confirm(this.errDescription);
                // this.spinner.hide();
                return;
              }
              if (this.isSuccess == true) {
                this.successmsg();
                //this.spinner.hide();
                this.ClearData();
                this.loading = false;
                this.dialogRef.close();
                //this.router.navigate(['/loan-typecharges-list']);
              }
            },
            (error) => {
              //this.spinner.hide();
              this.isDisconnected = true;
            }
          );
      } else {
        this.spinnerContent = "Updating Loan Type Charges....";
        // this.spinner.show();
        this.clearLocalStorage();
        let  strSource= localStorage.getItem("ChargesCallingForm");
        if(strSource=="EditingFromLoanApplication")
        {
            localStorage.setItem("temporaryChargeAmount",Amount)
            localStorage.setItem("temporaryPeriodToCharge",PeriodToCharge)
            localStorage.setItem("temporaryName",Name)
            localStorage.setItem("temporaryIsPercentage",IsPercentage)
            localStorage.setItem("temporaryValue",Value)
            localStorage.setItem("temporaryLowerLimit",LowerLimit)
            localStorage.setItem("temporaryUpperLimit",UpperLimit)
            localStorage.setItem("temporaryUseFormula",UseFormula)
            localStorage.setItem("temporaryTheFormula",TheFormula)

            this.isSuccess=true;
                this.successmsg();
                this.ClearData();                
                this.dialogRef.close();
                localStorage.setItem("LoanTypeChargesId-A", "0");
          return;
        }

        this.loanTypeService
          .UpdateLoanTypeCharges(
            this.LoanTypeChargesId,
            this.LoanChargesListId,
            this.LoanTypeId,
            Name,
            IsTariffBased,
            IsPercentage,
            Value,
            Amount,
            PeriodToCharge,
            HasLimit,
            LowerLimit,
            UpperLimit,
            UseFormula,
            TheFormula,
            this.Delete
          )
          .subscribe(
            (Response) => {
              this.loanAppResp = Response;
              this.isSuccess = this.loanAppResp["IsSuccess"];
              this.errDescription = this.loanAppResp["ErrorDescription"];
              if (this.isSuccess == false && this.errDescription != "") {
                confirm(this.errDescription);
                // this.spinner.hide();
                return;
              }
              if (this.isSuccess == true) {
                this.successmsg();
                this.ClearData();
                // this.loanTypeService.GetAllLoanTypeChargesByLoanTypeId(
                //   this.LoanTypeId
                // );
                this.dialogRef.close();

                localStorage.setItem("LoanTypeChargesId-A", "0");

                // );
                //this.router.navigate(['/V-LoanTypeCharges']);
                //window.location.reload();
                //this.spinner.hide();
              }
            },
            (error) => {
              //this.spinner.hide();
              this.isDisconnected = true;
            }
          );
      }
    }
  }
  clearLocalStorage(){
    localStorage.setItem("temporaryChargeAmount","");// Amount)
    localStorage.setItem("temporaryPeriodToCharge","");//PeriodToCharge)
    localStorage.setItem("temporaryName","");//Name)
    localStorage.setItem("temporaryIsPercentage","");//IsPercentage)
    localStorage.setItem("temporaryValue","");//Value)
    localStorage.setItem("temporaryLowerLimit","");//LowerLimit)
    localStorage.setItem("temporaryUpperLimit","");//UpperLimit)
    localStorage.setItem("temporaryUseFormula","");//UseFormula)
    localStorage.setItem("temporaryTheFormula","");//TheFormula)
  }
  onExit() {
    localStorage.setItem("LoanTypeChargesId-A", "0");
    this.dialogRef.close();
  }

  formValidation() {
    this.isValid = true;
    if (this.Name == "") this.isValid = false;
    //if(this.LoanChargesListId==0)this.isValid=false;
    return this.isValid;
  }
  ClearData() {
    this.LoanTypeChargesId = 0;
    this.Name = "";
    this.IsTariffBased = false;
    this.IsPercentage = false;
    this.Value = 0;
    this.Amount = 0;
    this.PeriodToCharge = 1;
    this.HasLimit = false;
    this.LowerLimit = 0;
    this.UpperLimit = 0;
    this.UseFormula = false;
    this.TheFormula = "";

    this.LoanChargesListId = 0;
  }

  getLoanChargesListName(id: any): string {
    var name: string;
    if (this.LoanChargesList) {
      if (id > 0) {
        this.LoanChargesList.some((obj) => {
          //var dim=obj as Element;
          if (obj["LoanChargesListId"] == id) {
            name = obj["Name"];
            this.Name = obj["Name"];
            console.log(name);
            return true;
          }
        });
      }
    }
    return name;
  }
}

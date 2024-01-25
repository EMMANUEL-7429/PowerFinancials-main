import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { AddLoanGuarantorComponent } from "src/app/pages/LoanSettings/Loan-Guarantor/add-loan-guarantor/add-loan-guarantor.component";
import { AddLoanChargesComponent } from "src/app/pages/LoanSettings/LoanCharges/add-loan-charges/add-loan-charges.component";
import { AddLoantypeChargesComponent } from "src/app/pages/LoanSettings/add-loantype-charges/add-loantype-charges.component";
import { LoanApplicationService } from "src/app/shared/service/loan-application.service";
import { PowerFinancialService } from "src/app/shared/service/power-financial.service";
import Swal from "sweetalert2";
import { Pipe, PipeTransform } from "@angular/core";

import { CollateralComponent } from "src/app/pages/LoanSettings/collateral/collateral.component";
import { SearchMemberComponent } from "src/app/pages/memberAccounts/search-member/search-member.component";

@Component({
  selector: "app-add-loan-application",
  templateUrl: "./add-loan-application.component.html",
  styleUrls: ["./add-loan-application.component.scss"],
})
export class AddLoanApplicationComponent implements OnInit {
  selectedIndex = 0;
  GuarantorId: any;
  CollateralId: any;
  MemberId: any = 0;
  MemberIdD: any;
  MemberList: any;
  CreditOfficerList: any;
  CurrencyList: any;
  defaultCurrecy: string = "Kenyan Shillings";
  LoanPurposeList: any;
  Delete: any = false;
  loanResp: any;
  loanAppResp: any;
  isSuccess: any;
  errDescription: any;
  public loading: boolean = false;
  isValid: boolean = true;
  ShowSide: boolean = false;
  LoanCollateralList: any;
  CollateralList: [];
  LoanGuarantorList: any;
  LoanTypeList: any;
  LoanDonorList: any;
  LoanStatusList: any;
  BranchList: any;
  chargeList: any;
  AmountCharge: any = 0;
  LoanChargeId: any;
  CreditOfficerIdD: any;
  CreditOfficerId: any;
  LoanTypeId: any;
  LoanChargesList: any;
  LoanTypeCharges: any;
  ForceSaleValue: any = 60;
  show: any = false;
  MemberIdMemberDetails: any;
  LoanSeriesList: any;
  TotalSharesList: any;
  LoanStatusDefaultList: any;
  DefaultId: any;
  TotalCharge: any = 0;
  TotalChargeList: any;
  IsAddmember: any;
  memberIdd: any;
  UsedSharesList: any;
  isDisconnected: boolean = false;
  searchable: any;
  public LoanTypeChargesList: Object; //change to Object if using data tables
  public temp: Object = false;
  spinnerContent: any;

  touchedCharges: boolean = false;
  touchedList: any;

  constructor(
    public dialog: MatDialog,
    private pfservice: PowerFinancialService,
    public loanservice: LoanApplicationService,
    private currentRoute: ActivatedRoute,
    private router: Router
  ) {
    this.isSuccess = false;
    this.errDescription = "";
    this.loanservice.getAllCollateral().subscribe((res) => {
      this.CollateralList = res as [];
    });
    this.loanservice.GetAllLoanTypeCharges().subscribe((res) => {
      this.LoanTypeCharges = res as [];
    });
  }

  ngOnInit(): void {
    this.resetForm();
    let LoanId = this.currentRoute.snapshot.paramMap.get("id");
    if (LoanId == null) this.resetForm();
    else {
      this.loanservice.getLoan(parseInt(LoanId)).subscribe((Response) => {
        this.loanservice.LoanApplicationForm = Response.loan;
        this.loanservice.LoanCharges = Response.LoanCharge;
        this.MemberId = Response.loan.MemberId;
        this.CreditOfficerId = Response.loan.CreditOfficerId;
        this.LoanTypeId = Response.loan.LoanTypeId;

        this.pfservice
          .getMember(parseInt(this.MemberId))
          .subscribe((Response) => {
            this.MemberIdD = Response.member.id;
            this.loanservice.LoanApplicationForm.FullName =
              Response.member.FullName;
            this.loanservice.LoanApplicationForm.IdNo = Response.member.IdNo;
          });
        this.pfservice
          .GetCreditOfficer(parseInt(this.CreditOfficerId))
          .subscribe((Response) => {
            this.CreditOfficerIdD = Response.CreditOfficer.id;
            this.loanservice.LoanApplicationForm.CreditOfficerName =
              Response.CreditOfficer.FullName;
          });
        this.loanservice
          .GetAllLoanTypeChargesByLoanTypeId(this.LoanTypeId)
          .subscribe((Response) => {
            this.chargeList = Response;
          });
      });
    }

    this.loanservice.getAllLoanCollateral(LoanId).subscribe((Response) => {
      this.LoanCollateralList = Response;
    });
    this.loanservice.getAllLoanGuarator(LoanId).subscribe((Response) => {
      this.LoanGuarantorList = Response;
    });
    this.loanservice
      .getAllLoanApplicationCharges(LoanId)
      .subscribe((Response) => {
        this.LoanChargesList = Response;
      });
    this.loanservice.GetSumLoanCharges(LoanId).subscribe((Response) => {
      this.TotalChargeList = Response;
      this.TotalCharge = this.TotalChargeList["TotalAmount"];
    });

    this.loanservice.LoanApplicationForm.ApplicationDate = new Date()
      .toISOString()
      .split("T")[0];
    this.loanservice.LoanApplicationForm.StatusDate = new Date()
      .toISOString()
      .split("T")[0];
    this.loanservice.LoanApplicationForm.loaneffectdate = new Date()
      .toISOString()
      .split("T")[0];

    this.refreshmemberList();
    this.refreshcreditOfficerList();
    this.refreshCurrency();
    this.refreshLoanPurposeList();
    this.refreshLoanType();
    this.refreshDonorList();
    this.refreshLoanStatusList();
    this.refreshBranchesList();
    this.loanservice.GetAllLoanDefaultStatus().subscribe((Response) => {
      this.LoanStatusDefaultList = Response;
    });
    this.loanservice.LoanCharges = [];
  }
  Reload() {
    window.location.reload();
  }
  successmsg() {
    Swal.fire("Process Succeeded");
  }
  selectTab(index: number): void {
    this.selectedIndex = index;
  }
  openForEditCollateral(CollateralIndex, CollateralId) {
    let LoanId = this.currentRoute.snapshot.paramMap.get("id");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {
      CollateralIndex,
      CollateralId,
      LoanId: this.currentRoute.snapshot.paramMap.get("id"),
      ForceValue: this.ForceSaleValue,
    };
    this.dialog
      .open(CollateralComponent, dialogConfig)
      .afterClosed()
      .subscribe((Response) => {
        this.loanservice.getAllLoanCollateral(LoanId).subscribe((Response) => {
          this.LoanCollateralList = Response;
        });
      });
  }
  openForEditGuarantors(GuarantorIndex, LoanGuarantorId) {
    let LoanId = this.currentRoute.snapshot.paramMap.get("id");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {
      GuarantorIndex,
      LoanGuarantorId,
      LoanId: this.currentRoute.snapshot.paramMap.get("id"),
    };
    this.dialog
      .open(AddLoanGuarantorComponent, dialogConfig)
      .afterClosed()
      .subscribe((Response) => {
        this.loanservice.getAllLoanGuarator(LoanId).subscribe((Response) => {
          this.LoanGuarantorList = Response;
        });
      });
  }

  getData() {
    this.temp = false;
    this.spinnerContent = "Loading Loan Type Charges List....";
    //this.spinner.show();

    this.loanservice
      .GetAllLoanTypeChargesByLoanTypeId(parseInt(this.LoanTypeId))
      .subscribe(
        (Response) => {
          //this.spinner.hide();
          this.LoanTypeChargesList = Response;
          console.log("Reading list:" + this.LoanTypeChargesList);

          this.temp = true;
        },
        (error) => {
          // this.spinner.hide();
          this.isDisconnected = true;
        }
      );
  }

  openForEditLoanCharges(LoanTypeChargesId: any) {
    //this is our last code

    localStorage.setItem("LoanTypeChargesId-A", LoanTypeChargesId);
    localStorage.setItem("ChargesCallingForm", "EditingFromLoanApplication");
    const dialogRef = this.dialog.open(AddLoantypeChargesComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      console.log("Checking the result!");
      console.log(result);
      debugger;
      this.getData();

      console.log(
        "Current LoanTypeId:" + this.loanservice.LoanApplicationForm.LoanTypeId
      );

      /* this.loanservice
      .GetAllLoanTypeChargesByLoanTypeId(parseInt(this.loanservice.LoanApplicationForm.LoanTypeId))
      .subscribe(
        (Response) => {*/
      //this.spinner.hide();
      this.LoanTypeChargesList = this.loanservice.LoanCharges;
      console.log("Reading list:" + this.LoanTypeChargesList);

      //this.LoanTypeChargesList=[];
      console.log("Starting ...");
      console.log("Begin:" + this.LoanTypeChargesList);

      var newList: any = [];

      const resultArray = Object.keys(this.LoanTypeChargesList).map((index) => {
        debugger;
        let charge = this.LoanTypeChargesList[index];
        if (charge["LoanTypeChargesId"] == LoanTypeChargesId) {
          var amount = localStorage.getItem("temporaryChargeAmount");
          charge.Amount = amount;

          this.LoanTypeChargesList[index].Amount = amount;
          this.LoanTypeChargesList[index].Value = localStorage.getItem("temporaryValue");
          this.LoanTypeChargesList[index].LowerLimit = localStorage.getItem("temporaryLowerLimit");
          this.LoanTypeChargesList[index].UpperLimit = localStorage.getItem("temporaryUpperLimit");
          this.LoanTypeChargesList[index].UseFormula = localStorage.getItem("temporaryUseFormula");
          this.LoanTypeChargesList[index].TheFormula = localStorage.getItem("temporaryTheFormula");

          this.LoanTypeChargesList[index].PeriodToCharge = localStorage.getItem(
            "temporaryPeriodToCharge"
          );
          this.LoanTypeChargesList[index].Name =
            localStorage.getItem("temporaryName");
          this.LoanTypeChargesList[index].IsPercentage = localStorage.getItem(
            "temporaryIsPercentage"
          );
        }
        //newList.push(charge);
      });
      console.log(newList);
      //this.LoanTypeChargesList=newList;
      console.log("Again:" + this.LoanTypeChargesList);
      this.loanservice.LoanCharges = this.LoanTypeChargesList as [];
    });
    /* },
        (error) => {
          // this.spinner.hide();
          this.isDisconnected = true;
        }
      );*/

    //debugger;

    localStorage.setItem("LoanTypeChargesId-A", "0");
  }

  // openForEditLoanCharges(loanChargeIndex, LoanId) {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.disableClose = true;
  //   // dialogConfig.data = {
  //   //   loanChargeIndex,
  //   //   LoanId,
  //   //   LoanType: this.loanservice.LoanApplicationForm.LoanTypeId,
  //   //   Amount: this.loanservice.LoanApplicationForm.LoanAmount,
  //   // };
  //   this.dialog.open(AddLoanChargesComponent, dialogConfig);
  // }
  openForSeachMember(ViewMembereIndex) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.data = { ViewMembereIndex };
    this.dialog
      .open(SearchMemberComponent, dialogConfig)
      .afterClosed()
      .subscribe((Response) => {
        this.IsAddmember = localStorage.getItem("AddMember");
        if (
          this.IsAddmember == "true" &&
          localStorage.getItem("MemberId") != ""
        ) {
          this.memberIdd = parseInt(localStorage.getItem("MemberId"));
          this.pfservice.getMember(parseInt(this.memberIdd)).subscribe(
            (Response) => {
              this.loanservice.LoanApplicationForm.MemberId = this.memberIdd;
              this.loanservice.LoanApplicationForm.FullName =
                Response.member.FullName;
              this.loanservice.LoanApplicationForm.IdNo = Response.member.IdNo;
              this.loanservice.LoanApplicationForm.GrossPay =
                Response.member.Gross;
              this.loanservice.LoanApplicationForm.NetPay =
                Response.member.Nett;

              this.loanservice
                .CountLoanRows(this.memberIdd)
                .subscribe((Response) => {
                  console.log(this.MemberIdMemberDetails);
                  this.LoanSeriesList = Response;
                  //this.loanAppResp = Response;
                  this.loanservice.LoanApplicationForm.LoanSeries =
                    this.LoanSeriesList["CountRows"];
                });
              this.loanservice
                .GetTotalShares(this.memberIdd)
                .subscribe((Response) => {
                  console.log(Response);
                  this.TotalSharesList = Response;
                  this.loanservice.LoanApplicationForm.TotalShares =
                    this.TotalSharesList["BalanceAmount"];
                });
              this.loanservice
                .GetUsedShares(this.memberIdd)
                .subscribe((Response) => {
                  this.UsedSharesList = Response;
                  this.loanservice.LoanApplicationForm.UsedShares =
                    this.UsedSharesList["TotalAmount"];
                });

              localStorage.setItem("MemberId", "");
            },
            (error) => {
              //Clear
              //Hebu test sasa I hope iko sawa
              localStorage.setItem("MemberId", "");
            }
          );
        }
      });
  }
  // Chargeobject = JSON.stringify({
  //   Name: "Application Fee",
  //   Ispercentage: false,
  // });
  // AddChargeobj() {
  //   localStorage.setItem("Charges", this.Chargeobject);
  // }

  onDeleteCharge(LoanApplicationChargesId: number, i: number, LoanId: number) {
    if (confirm("are you sure you want to delete this charge?"))
      this.loanservice.LoanCharges.splice(i, 1);
  }
  refreshmemberList() {
    this.pfservice.getAllMembers().subscribe((Response) => {
      this.MemberList = Response;
    });
  }
  refreshcreditOfficerList() {
    this.pfservice.GetAllCreditOfficers().subscribe((Response) => {
      this.CreditOfficerList = Response;
    });
  }
  refreshLoanPurposeList() {
    this.loanservice.getAllLoanPurposes().subscribe((Response) => {
      this.LoanPurposeList = Response;
    });
  }
  refreshDonorList() {
    this.loanservice.getAllLoanDonor().subscribe((Response) => {
      this.LoanDonorList = Response;
    });
  }
  refreshLoanType() {
    this.loanservice.getAllLoanTypes().subscribe((Response) => {
      this.LoanTypeList = Response;
    });
  }
  refreshLoanStatusList() {
    this.loanservice.getAllLoanStatus().subscribe((Response) => {
      this.LoanStatusList = Response;
    });
  }
  refreshBranchesList() {
    this.loanservice.GetAllCompanyBranches().subscribe((Response) => {
      this.BranchList = Response;
    });
  }

  updateMemberdatails(ctrl) {
    if (ctrl.selectedIndex == 0) {
      this.loanservice.LoanApplicationForm.FullName = "";
      this.loanservice.LoanApplicationForm.IdNo = "";
      this.loanservice.LoanApplicationForm.GrossPay = 0;
      this.loanservice.LoanApplicationForm.NetPay = 0;
    } else {
      this.MemberIdMemberDetails =
        this.MemberList[ctrl.selectedIndex - 1].MemberId;
      this.loanservice.LoanApplicationForm.FullName =
        this.MemberList[ctrl.selectedIndex - 1].FullName;
      this.loanservice.LoanApplicationForm.IdNo =
        this.MemberList[ctrl.selectedIndex - 1].IdNo;
      this.loanservice.LoanApplicationForm.GrossPay =
        this.MemberList[ctrl.selectedIndex - 1].GrossPay;
      this.loanservice.LoanApplicationForm.NetPay =
        this.MemberList[ctrl.selectedIndex - 1].NetPay;
      this.loanservice
        .CountLoanRows(this.MemberIdMemberDetails)
        .subscribe((Response) => {
          console.log(this.MemberIdMemberDetails);
          this.LoanSeriesList = Response;
          //this.loanAppResp = Response;
          this.loanservice.LoanApplicationForm.LoanSeries =
            this.LoanSeriesList["CountRows"];
        });
      this.loanservice
        .GetTotalShares(this.MemberIdMemberDetails)
        .subscribe((Response) => {
          console.log(Response);
          this.TotalSharesList = Response;
          this.loanservice.LoanApplicationForm.TotalShares =
            this.TotalSharesList["BalanceAmount"];
        });
      this.loanservice
        .GetUsedShares(this.MemberIdMemberDetails)
        .subscribe((Response) => {
          this.UsedSharesList = Response;
          this.loanservice.LoanApplicationForm.UsedShares =
            this.UsedSharesList["TotalAmount"];
        });
    }
  }
  updateLoanTypesdatails(ctrl) {
    if (ctrl.selectedIndex == 0) {
      this.loanservice.LoanApplicationForm.InterestRate = 0;
      this.loanservice.LoanApplicationForm.RepayPeriod = 0;
      this.loanservice.LoanApplicationForm.IsMarkUpBased = false;
      this.loanservice.LoanApplicationForm.PeriodFrequency = 0;
      this.loanservice.LoanApplicationForm.MarkupAmount = 0;
      this.loanservice.LoanApplicationForm.InterestType = 0;
    } else {
      this.loanservice.LoanApplicationForm.InterestRate =
        this.LoanTypeList[ctrl.selectedIndex - 1].InterestRate;
      this.loanservice.LoanApplicationForm.RepayPeriod =
        this.LoanTypeList[ctrl.selectedIndex - 1].MaxPeriod;
      this.loanservice.LoanApplicationForm.IsMarkUpBased =
        this.LoanTypeList[ctrl.selectedIndex - 1].IsMarkupBased;
      this.loanservice.LoanApplicationForm.MarkupAmount =
        this.LoanTypeList[ctrl.selectedIndex - 1].MarginBaseAmount;
      this.loanservice.LoanApplicationForm.PeriodFrequency =
        this.LoanTypeList[ctrl.selectedIndex - 1].RepaymentFrequency;
      this.loanservice.LoanApplicationForm.InterestType =
        this.LoanTypeList[ctrl.selectedIndex - 1].InterestPayMethod;

      if(this.loanservice.LoanApplicationForm.InterestType=="5")
      this.loanservice.LoanApplicationForm.IsMarkUpBased =true;

      this.loanservice.RefreshLoanChargesList(
        this.loanservice.LoanApplicationForm.LoanTypeId
      );
      this.loanservice
        .GetAllLoanTypeChargesByLoanTypeId(
          this.loanservice.LoanApplicationForm.LoanTypeId
        )
        .subscribe((Response) => {
          this.chargeList = Response;
        });
    }
  }

  updateCreditOffice(ctrl) {
    if (ctrl.selectedIndex == 0) {
      this.loanservice.LoanApplicationForm.CreditOfficerName = "";
    } else {
      this.loanservice.LoanApplicationForm.CreditOfficerName =
        this.CreditOfficerList[ctrl.selectedIndex - 1].FullName;
    }
  }
  refreshCurrency() {
    this.pfservice.getAllCurrency().subscribe((Response) => {
      this.CurrencyList = Response;
    });
  }
  formValidation() {
    this.isValid = true;
    if (this.loanservice.LoanApplicationForm.MemberId == 0)
      this.isValid = false;
    if (this.loanservice.LoanApplicationForm.LoanTypeId == 0)
      this.isValid = false;
    if (this.loanservice.LoanApplicationForm.LoanAmount == 0)
      this.isValid = false;
    if (this.loanservice.LoanApplicationForm.RepayPeriod == 0)
      this.isValid = false;
    if (this.loanservice.LoanApplicationForm.PeriodFrequency == 0)
      this.isValid = false;
    return this.isValid;
  }
  onSubmit(form: NgForm) {
    // localStorage.setItem('AddMember', 'false');
    if (this.formValidation()) {
      this.loading = true;
      this.loanservice.PosttblLoan().subscribe((Response) => {
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
        }
      });
    }
  }

  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.loanservice.LoanApplicationForm = {
      LoanId: null,
      MemberId: 0,
      Code: "",
      ManualRef: "",
      LoanTypeId: 0,
      LoanAmount: 0,
      ApplicationDate: new Date(),
      InterestRate: 0,
      PeriodFrequency: 0,
      RepayPeriod: 0,
      MarkupAmount: 0,
      InterestType: 0,
      Status: 0,
      StatusDate: new Date(),
      PurposeId: 0,
      GrossPay: 0,
      NetPay: 0,
      LoanSeries: 0,
      TotalShares: 0,
      FreeShares: 0,
      IsMigrated: false,
      CreditOfficerId: 0,
      DonorId: 0,
      CurrencyId: 0,
      BranchId: 0,
      IsMarkUpBased: false,
      CreatedOn: new Date(),
      CreatedBy: "Admin",
      ModifiedOn: new Date(),
      ModifiedBy: "Admin",
      FullName: "",
      CreditOfficerName: "",
      IdNo: "",
      ApproveAmount: 0,
      LoanTypeName: "",
      MemberNo: "",
      UsedShares: 0,
      loaneffectdate: new Date(),
    };
    this.loanservice.LoanCharges = [];
  }

  DeleteCollateral(id: number) {
    let LoanId = this.currentRoute.snapshot.paramMap.get("id");
    if (confirm("Are you sure you want to delete this record?"))
      this.loanservice.DeleteLoanCollateral(id).subscribe((Response) => {
        this.loanservice.getAllLoanCollateral(LoanId).subscribe((Response) => {
          this.LoanCollateralList = Response;
        });
        this.successmsg();
      });
  }
  DeleteGuarators(id: number) {
    let LoanId = this.currentRoute.snapshot.paramMap.get("id");
    if (confirm("Are you sure you want to delete this record?"))
      this.loanservice.DeleteLoanGuarator(id).subscribe((Response) => {
        this.loanservice.getAllLoanGuarator(LoanId).subscribe((Response) => {
          this.LoanGuarantorList = Response;
        });
        this.successmsg();
      });
  }
  DeleteCharge(id: number) {
    let LoanId = this.currentRoute.snapshot.paramMap.get("id");
    if (confirm("Are you sure you want to delete this record?"))
      this.loanservice
        .DeleteLoanApplicationCharges(id)
        .subscribe((Response) => {
          this.loanservice
            .getAllLoanApplicationCharges(LoanId)
            .subscribe((Response) => {
              this.LoanChargesList = Response;
            });
          this.successmsg();
        });
  }

  getCollateralName(id: any): string {
    var name: string;
    if (this.CollateralList) {
      if (id > 0) {
        this.CollateralList.some((obj) => {
          //var dim=obj as Element;
          if (obj["CollateralId"] == id) {
            name = obj["CollateralName"];
            return true;
          }
        });
      }
    }
    return name;
  }
  getMemberNo(id: any): string {
    var name: string;
    if (this.MemberList) {
      if (id > 0) {
        this.MemberList.some((obj) => {
          //var dim=obj as Element;
          if (obj["MemberId"] == id) {
            name = obj["MemberNo"];
            return true;
          }
        });
      }
    }
    return name;
  }
  getGuarantorType(id: number) {
    var name: string;
    var nameone: string;
    var nametwo: string;
    if (id == 1) {
      name = "New Loan";
      return name;
    } else if (id == 2) {
      nameone = "Topup";
      return nameone;
    } else {
      nametwo = "Partial";
      return nametwo;
    }
  }
  getLoanTypeName(id: any): string {
    var name: string;
    if (this.LoanTypeCharges) {
      if (id > 0) {
        this.LoanTypeCharges.some((obj) => {
          //var dim=obj as Element;
          if (obj["LoanChargesListId"] == id) {
            name = obj["Name"];
            return true;
          }
        });
      }
    }
    return name;
  }

  onlyNumbersAllowed(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      console.log(charCode);
      return false;
    }
    return true;
  }
}

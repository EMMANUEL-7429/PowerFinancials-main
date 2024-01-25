import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { AccountTransactionService } from "src/app/shared/service/account-transaction.service";
import { PowerFinancialService } from "src/app/shared/service/power-financial.service";
import { LoanApplicationService } from "src/app/shared/service/loan-application.service";
import { SearchMemberComponent } from "src/app/pages/memberAccounts/search-member/search-member.component";
import Swal from "sweetalert2";

import { Pipe, PipeTransform } from "@angular/core";

@Component({
  selector: "app-add-transaction",
  templateUrl: "./add-transaction.component.html",
  styleUrls: ["./add-transaction.component.scss"],
})
export class AddTransactionComponent implements OnInit {
  isValid: boolean = true;
  Bank: any = 0;
  FullName: any = "";
  IdNo: any = "";
  BuyRate: any = 0;
  BaseCurrency: any;
  myCurrency: any;
  DefaultCurrencyList: any;
  CurrencyRateList: any;
  MemberShareList: any;
  MemberList: any;
  CurrencyList: any;
  Productlist: any;
  BankList: any;
  PayModeList: any;
  BaseCurrencyId: any;
  public loading: boolean = false;
  loanResp: any;
  loanAppResp: any;
  isSuccess: any;
  errDescription: any;
  Delete: any = false;
  InsertDelete = true;
  ChargeList: any;
  DefaultPaymentList: any;
  DefaultCurrencyLists: any;
  MemberId: any;
  IsAddmember: any;
  memberIdd: any;
  isDisconnected: boolean = false;
  constructor(
    public service: AccountTransactionService,
    private pfService: PowerFinancialService,
    public loanservice: LoanApplicationService,
    public dialog: MatDialog,
    private router: Router,
    private currentRoute: ActivatedRoute
  ) {
    this.isSuccess = false;
    this.errDescription = "";
  }
  ngOnInit(): void {
    let AccountTransactionId = this.currentRoute.snapshot.paramMap.get("id");
    console.log(AccountTransactionId);
    if (AccountTransactionId == null) this.resetForm();
    else {
      this.service
        .GettblAccountTransaction(parseInt(AccountTransactionId))
        .subscribe((Response) => {
          this.service.TransactionForm = Response.AccountTransaction;
          this.service.TransactionCharges = Response.accountCharge;
          this.MemberId = Response.AccountTransaction.MemberId;
          this.pfService
            .getMember(parseInt(this.MemberId))
            .subscribe((Response) => {
              this.MemberId = Response.member.id;
              this.FullName = Response.member.FullName;
              this.IdNo = Response.member.IdNo;
            });
        });
    }
    this.RefreshMemberList();
    this.refreshCurrList();
    this.refreshProductList();
    this.refreshBankList();
    this.refreshPaymentModesList();
    this.refreshCurrRateList();
    this.refreshChargeList();
    this.GetDefaultPaymentModes();
    this.getMainCurrency();
    this.refreshMemberShareList();
    this.service.TransactionForm.ValueDate = new Date()
      .toISOString()
      .split("T")[0];
    this.service.TransactionForm.TransDate = new Date()
      .toISOString()
      .split("T")[0];
    this.service.TransactionForm.CreatedOn = new Date()
      .toISOString()
      .split("T")[0];
    this.service.TransactionForm.ModifiedOn = new Date()
      .toISOString()
      .split("T")[0];
  }
  successmsg() {
    Swal.fire("Process Succeeded");
  }
  Reload() {
    window.location.reload();
  }
  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.service.TransactionForm = {
      AccountTransactionId: null,
      MemberNo: 0,
      IdNo: "",
      DocumentNo: 0,
      ProductId: 0,
      ModeOfPaymentID: 0,
      TransType: 0,
      CurrencyId: 0,
      ExchangeRate: 1,
      Commission: false,
      PaidBy: "",
      LocalCurrencyAmount: 0,
      Amount: 0,
      Remarks: "",
      Description:"",
      AmountCharge: 0,
      ValueDate: new Date(),
      TransDate: new Date(),
      BaseCurrencyId: 0,
      CurrencySymbol: "KSH",
      BalanceAmount: 0,
      BuyRate: 1,
      CreatedOn: new Date(),
      CreatedBy: "Admin",
      ModifiedOn: new Date(),
      ModifiedBy: "Admin",
      DeleteTransactionsIds: "",
      MemberId: 0,
      ChargeWithdrawal: 0,
      CanBeOverdrawn: false,
      ConvertedAmount: 0,
      IsBlocked: false,
      TotalBalanceAmount: 0,
      AccountNumber: "",
      MemberShareId: 0,
    };
    this.service.TransactionCharges = [];
  }
  RefreshMemberList() {
    this.pfService.getAllMembers().subscribe((Response) => {
      this.MemberList = Response;
    });
  }
  AddorEditCharge(AccountTransactionIndex, AccountTransactionId) {
    /*
    const dialogConfig= new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="50%";
    dialogConfig.data={AccountTransactionIndex,AccountTransactionId,Amount:this.service.TransactionForm.LocalCurrencyAmount};
    this.dialog.open(TransactionChargesComponent,dialogConfig).afterClosed().subscribe(Response =>{
      this.updateTotalCharges();
      this.updateBalanceAmount();
    })  */
  }
  onDeleteCharge(
    TransactionChargesId: number,
    i: number,
    AccountTransactionId: number
  ) {
    this.service.TransactionForm.DeleteTransactionsIds +=
      TransactionChargesId + ",";
    this.service.TransactionCharges.splice(i, 1);
    this.updateTotalCharges();
    this.updateBalanceAmount();
  }

  updateMemberDetails(ctrl) {
    if (ctrl.selectedIndex == 0) {
      this.IdNo = "";
      this.FullName = "";
    } else {
      this.IdNo = this.MemberList[ctrl.selectedIndex - 1].IdNo;
      this.FullName = this.MemberList[ctrl.selectedIndex - 1].FullName;
      this.service.TransactionForm.PaidBy =
        this.MemberList[ctrl.selectedIndex - 1].FullName;
    }
  }
  updateTotalCharges() {
    this.service.TransactionForm.AmountCharge =
      this.service.TransactionCharges.reduce((prev, curr) => {
        return prev + curr.Total;
      }, 0);
    this.service.TransactionForm.AmountCharge = parseFloat(
      this.service.TransactionForm.AmountCharge.toFixed(2)
    );
    this.updateBalanceAmount();
  }
  updateBalanceAmount() {
    this.service.TransactionForm.BalanceAmount = parseFloat(
      (
        this.service.TransactionForm.Amount *
          this.service.TransactionForm.ExchangeRate -
        this.service.TransactionForm.AmountCharge
      ).toFixed(2)
    );
    this.service.TransactionForm.LocalCurrencyAmount = parseFloat(
      (
        this.service.TransactionForm.Amount *
        this.service.TransactionForm.ExchangeRate
      ).toFixed(2)
    );
  }
  refreshCurrList() {
    this.pfService.getAllCurrency().subscribe((Response) => {
      this.CurrencyList = Response;

      this.service.TransactionForm.CurrencyId=0;
      
      var myList=this.CurrencyList as [];
      for(var i=0;i<myList.length;i++){
         var obj=myList[i];
         console.log('Checking main currency')
         if(obj['IsMainCurrency']==true)
          {
            this.service.TransactionForm.CurrencyId=obj['CurrencyId'];            
            break;
          }         
      }

    });
  }
  refreshCurrRateList() {
    this.pfService.getAllCurrencyRate().subscribe((Response) => {
      this.CurrencyRateList = Response;
    });
  }

  updateCurrencyDetails(ctrl) {
    if (ctrl.selectedIndex == 0) {
      this.service.TransactionForm.CurrencySymbol = "";
    } else {
      this.service.TransactionForm.CurrencySymbol =
        this.CurrencyList[ctrl.selectedIndex - 1].CurrencySymbol;
    }
    for (var items of this.DefaultCurrencyList) {
      this.service.TransactionForm.ExchangeRate = items.ExchangeRate;
      this.service.TransactionForm.BaseCurrencyId = items.BaseCurrencyId;
    }
  }
  refreshMemberShareList() {
    this.pfService.GetAllMemberShare().subscribe((Response) => {
      this.MemberShareList = Response;
    });
  }
  refreshProductList() {
    this.pfService.GetAllProduct().subscribe((Response) => {
      this.Productlist = Response;
    });
  }
  refreshBankList() {
    this.pfService.getAllBank().subscribe((Response) => {
      this.BankList = Response;
    });
  }
  refreshChargeList() {
    this.service.getAllTransactionCharges().subscribe((Response) => {
      this.ChargeList = Response;
    });
  }
  refreshPaymentModesList() {
    this.service.GetAllPaymentModes().subscribe((Response) => {
      this.PayModeList = Response;
    });
  }

  onSubmit(form: NgForm) {
    if (this.service.TransactionForm.Commission == true) {
      if (this.service.TransactionCharges.length == 0) {
        if (confirm("Please add Charges this transaction!!!!")) return;
      } else {
        if (this.formValidation()) {
          this.loading = true;
          this.service.PosttblAccountTransaction().subscribe((Response) => {
            console.log(Response);
            this.resetForm();
            this.successmsg();
            this.loading = false;
            this.FullName = "";
            this.IdNo = "";
            this.router.navigate(["/transaction"]);
          });
        }
      }
    } else {
      if (this.formValidation()) {
        this.loading = true;
        this.service.PosttblAccountTransaction().subscribe((Response) => {
          this.resetForm();
          this.successmsg();
          this.loading = false;
          this.FullName = "";
          this.IdNo = "";
          this.router.navigate(["/transaction"]);
        });
      }
    }
  }
  convertCurrency(CurrencyId) {
    console.log("CurrencyId=" + CurrencyId);
    this.service
      .GetExchangeRateByCurrencyId(CurrencyId)
      .subscribe((response) => {
        this.CurrencyRateList = response;
        this.service.TransactionForm.ExchangeRate =
          this.CurrencyRateList["BuyRate"];
        this.service.TransactionForm.BaseCurrencyId =
          this.CurrencyRateList["BaseCurrencyId"];
        this.service.TransactionForm.BalanceAmount = parseFloat(
          (
            this.service.TransactionForm.Amount *
              this.service.TransactionForm.ExchangeRate -
            this.service.TransactionForm.AmountCharge
          ).toFixed(2)
        );
        this.service.TransactionForm.LocalCurrencyAmount = parseFloat(
          (
            this.service.TransactionForm.Amount *
            this.service.TransactionForm.ExchangeRate
          ).toFixed(2)
        );
      });
  }
  formValidation() {
    this.isValid = true;
    if (this.service.TransactionForm.MemberNo == 0) this.isValid = false;
    if (this.service.TransactionForm.ProductId == 0) this.isValid = false;
    if (this.service.TransactionForm.CurrencyId == 0) this.isValid = false;
    if (this.service.TransactionForm.Amount <= 0) this.isValid = false;
    return this.isValid;
  }

  GetDefaultPaymentModes() {
    this.service.GetDefaultPaymentModes().subscribe((Response) => {
      this.DefaultPaymentList = Response;
    });
  }
  getMainCurrency() {
    this.service.getMainCurrency().subscribe((Response) => {
      this.DefaultCurrencyLists = Response;
    });
  }

  ProductDetails(ProductId) {
    this.service
      .GetAccountNumberByProductId(
        ProductId,
        this.service.TransactionForm.MemberNo
      )
      .subscribe((Response) => {
        this.MemberShareList = Response;
        for (var items of this.MemberShareList) {
          this.service.TransactionForm.AccountNumber = items.AccountNumber;
        }
      });
  }
  //
  openForSeachMember(ViewMembereIndex) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
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
          this.pfService.getMember(parseInt(this.memberIdd)).subscribe(
            (Response) => {
              //console.log(Response);
              this.MemberId = this.memberIdd;
              this.FullName = Response.member.FullName;              
              this.service.TransactionForm.IdNo = Response.member.IdNo;
              //console.log(this.IdNo);
              // this.IdNo = Response.IdNo;
              this.service.TransactionForm.MemberNo = this.memberIdd;

              // this.FullName = Response.member.FullName;

              // this.IdNo = Response.member.IdNo;

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
}

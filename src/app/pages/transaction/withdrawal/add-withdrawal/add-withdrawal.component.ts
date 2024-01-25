import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { SearchMemberComponent } from "src/app/pages/memberAccounts/search-member/search-member.component";
import { AccountTransactionService } from "src/app/shared/service/account-transaction.service";
import { LoanApplicationService } from "src/app/shared/service/loan-application.service";
import { PowerFinancialService } from "src/app/shared/service/power-financial.service";
import Swal from "sweetalert2";
import { AddTransactionChargesComponent } from "../../transaction-charges/add-transaction-charges/add-transaction-charges.component";

@Component({
  selector: "app-add-withdrawal",
  templateUrl: "./add-withdrawal.component.html",
  styleUrls: ["./add-withdrawal.component.scss"],
})
export class AddWithdrawalComponent implements OnInit {
  isValid: boolean = true;
  Bank: any = 0;
  BranchNam:any=0;
  FullName: any = "";
  IdNo: any = "";
  BuyRate: any = 0;
  BaseCurrency: any;
  myCurrency: any;
  DefaultCurrencyList: any;
  CurrencyRateList: any;
  MemberList: any;
  CurrencyList: any;
  Productlist: any;
  BankList: any;
  BankBranchesList:any;
  PayModeList: any;
  MemberShareList: any;
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
  TransactionList: any;
  ChargeWithdrawal: any;
  Total: any = 0;
  charge: any = 0;
  IsAddmember: any;
  CanBeOverdrawn: any;
  memberIdd: any;
  isDisconnected: boolean = false;
  constructor(
    public service: AccountTransactionService,
    public loanservice: LoanApplicationService,
    private pfService: PowerFinancialService,
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
          this.MemberId = Response.AccountTransaction.MemberNo;
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
    this.refreshBankBranchesList();
    this.refreshPaymentModesList();
    this.refreshCurrRateList();
    this.refreshChargeList();
    this.GetDefaultPaymentModes();
    this.getMainCurrency();
    this.refreshTransactionList();
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
      IsBlocked: false,
      ConvertedAmount: 0,
      TotalBalanceAmount: 0,
      AccountNumber: "",
      MemberShareId: 0,
    };
    this.service.TransactionCharges = [];
    this.service.TransactionForm.IsBlocked;
  }
  refreshTransactionList() {
    this.pfService.GetAllAccountTransaction().subscribe((Response) => {
      this.TransactionList = Response;
    });
  }
  refreshMemberShareList() {
    this.pfService.GetAllMemberShare().subscribe((Response) => {
      this.MemberShareList = Response;
    });
  }
  RefreshMemberList() {
    this.pfService.getAllMembers().subscribe((Response) => {
      this.MemberList = Response;
    });
  }
  AddorEditCharge(AccountTransactionIndex, AccountTransactionId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = {
      AccountTransactionIndex,
      AccountTransactionId,
      Amount: this.service.TransactionForm.LocalCurrencyAmount,
    };
    this.dialog
      .open(AddTransactionChargesComponent, dialogConfig)
      .afterClosed()
      .subscribe((Response) => {
        this.updateTotalCharges();
        this.AmountBalance();
      });
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
    this.AmountBalance();
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
    this.AmountBalance();
  }

  refreshCurrList() {
    this.pfService.getAllCurrency().subscribe((Response) => {
      this.CurrencyList = Response;

      this.service.TransactionForm.CurrencyId=0;
      
      var myList=this.CurrencyList as [];
      for(var i=0;i<myList.length;i++){
         var obj=myList[i];

         if(obj['IsMainCurrency']==true)
          {
            this.service.TransactionForm.CurrencyId=obj['CurrencyId'];    
            this.service.TransactionForm.ExchangeRate = 1;
            this.service.TransactionForm.BaseCurrencyId = this.service.TransactionForm.CurrencyId;              
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
    for (var items of this.DefaultCurrencyLists) {
      this.service.TransactionForm.ExchangeRate = items.ExchangeRate;
      this.service.TransactionForm.BaseCurrencyId = items.BaseCurrencyId;
    }
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
  refreshBankBranchesList() {
    this.pfService.getAllBankBranches().subscribe((Response) => {
      this.BankBranchesList = Response;
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
  successmsg() {
    Swal.fire("Process Succeeded");
  }
  Reload() {
    window.location.reload();
  }

  onSubmit(form: NgForm) {
    if (this.service.TransactionForm.CanBeOverdrawn == true) {
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
          });
        }
      }
    } else {
      if (
        this.service.TransactionForm.BalanceAmount >
        this.service.TransactionForm.TotalBalanceAmount
      ) {
        if (
          confirm(
            "You cannot withdraw more than what you have in your account!!"
          )
        )
          return;
      } else {
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
            });
          }
        }
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
          this.CurrencyRateList["SellRate"];
        this.service.TransactionForm.BaseCurrencyId =
          this.CurrencyRateList["BaseCurrencyId"];
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
  GetProduct(ProductId) {
    this.pfService
      .GetAccountNumberByProductId(
        ProductId,
        this.service.TransactionForm.MemberNo
      )
      .subscribe((Response) => {
        this.MemberShareList = Response;
        for (var items of this.MemberShareList) {
          this.service.TransactionForm.AccountNumber = items.AccountNumber;
          console.log(this.service.TransactionForm.AccountNumber);
          this.service.TransactionForm.MemberShareId = items.MemberShareId;
          console.log(this.service.TransactionForm.MemberShareId);
        }
      });
  }
  updateProductDetails(ctrl) {
    if (ctrl.selectedIndex == 0) {
      this.service.TransactionForm.CanBeOverdrawn = false;
      //this.service.TransactionForm.AccountNumber='';
    } else {
      this.service.TransactionForm.CanBeOverdrawn =
        this.Productlist[ctrl.selectedIndex - 1].CanBeOverdrawn;
      //this.service.TransactionForm.AccountNumber=this.MemberShareList[ctrl.selectedIndex-1].AccountNumber;
    }
  }
  AccountDetails() {
    this.pfService
      .GetBalancesAmount(
        this.service.TransactionForm.AccountNumber,
        this.service.TransactionForm.MemberShareId
        
      )
      .subscribe((Response) => {
        this.loanAppResp = Response;
        console.log(Response);
        this.service.TransactionForm.TotalBalanceAmount =
          this.loanAppResp["Amount"];
        console.log(this.service.TransactionForm.TotalBalanceAmount);
      });
  }
  AmountBalance() {
    this.service.TransactionForm.BalanceAmount = parseFloat(
      (
        this.service.TransactionForm.Amount *
          this.service.TransactionForm.ExchangeRate +
        this.service.TransactionForm.AmountCharge
      ).toFixed(2)
    );

    this.service.TransactionForm.LocalCurrencyAmount = parseFloat(
      (
        this.service.TransactionForm.Amount *
        this.service.TransactionForm.ExchangeRate +
        this.service.TransactionForm.AmountCharge
      ).toFixed(2)
    );
    if (this.service.TransactionForm.CanBeOverdrawn == true) {
      this.service.TransactionForm.BalanceAmount = parseFloat(
        (
          this.service.TransactionForm.Amount *
            this.service.TransactionForm.ExchangeRate +
          this.service.TransactionForm.AmountCharge
        ).toFixed(2)
      );
      this.service.TransactionForm.BalanceAmount *= -1;
    } else {
      if (
        this.service.TransactionForm.BalanceAmount>
        this.service.TransactionForm.TotalBalanceAmount
      ) {
        if (
          confirm(
            "You cannot withdraw more than what you have in your account!!"
          )
        )
          return;
      } else {
        this.service.TransactionForm.BalanceAmount = parseFloat(
          (
            this.service.TransactionForm.Amount *
              this.service.TransactionForm.ExchangeRate +
            this.service.TransactionForm.AmountCharge
          ).toFixed(2)
        );
        this.service.TransactionForm.BalanceAmount *= -1;
      }
    }
  }
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
              this.service.TransactionForm.MemberNo = this.memberIdd;
              this.FullName = Response.member.FullName;
              this.service.TransactionForm.IdNo = Response.member.IdNo;
              this.service.TransactionForm.PaidBy=this.FullName;              
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
